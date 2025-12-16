import { A } from "@expo/html-elements";
import { useFontFamily } from "_global-hooks";
import { useThemeProviderContext } from "components/index";
import type { IconProps } from "foundations/Icon";
import { Icon } from "foundations/Icon";
import type { PropsWithChildren } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";
import { useStyles } from "react-native-unistyles";
import { useHover, useActive } from "react-native-web-hooks";

import { TextLinkStyles } from "./TextLink.styles";
import type { TextLinkProps } from "./TextLink.types";

const Container = ({
  children,
  style,
  isTextOnly,
}: PropsWithChildren<{ isTextOnly: boolean; style: StyleProp<ViewStyle> }>) => {
  if (isTextOnly) {
    return children;
  }

  return <View style={style}>{children}</View>;
};

const TextLink = ({
  href,
  children,
  target = "self",
  inverted = false,
  size = "default",
  state = "default",
  palette,
  onPress,
  textStyle,
  disabled = false,
  style,
}: TextLinkProps) => {
  const [isVisited, setIsVisited] = useState(false);
  const [hasIconChild, setHasIconChild] = useState(false);
  const [hasIconOnlyChild, setHasIconOnlyChild] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    setHasIconChild(
      React.Children.toArray(children).some((child) =>
        React.isValidElement(child),
      ),
    );
    setHasIconOnlyChild(
      React.Children.toArray(children).every((child) =>
        React.isValidElement(child),
      ),
    );
  }, [children]);

  useEffect(() => {
    if (state === "default") return;
    setIsVisited(state === "visited");
  }, [state]);

  const isHovered = useHover(ref);
  const isActive = useActive(ref);
  const isLink = href && !onPress;
  const isButton = !href && onPress;
  const isTextOnly =
    React.Children.toArray(children).length === 1 &&
    typeof children === "string";
  const fontFamily = useFontFamily("Paragraph_Link");
  const { styles } = useStyles(TextLinkStyles, {
    isVisited,
    isHovered,
    isActive,
    size: size === "default" ? undefined : size,
  });

  const getIconSize = (
    size: "xs" | "sm" | "default" | "lg",
  ): "sm" | "default" | "md" => {
    switch (size) {
      case "xs":
        return "sm";
      case "lg":
        return "md";
      case "sm":
      case "default":
      default:
        return "default";
    }
  };

  return (
    <A
      ref={ref}
      testID="link"
      style={[
        { fontFamily },
        styles.textSize,
        styles.textLink,
        isButton && styles.textLinkAsButton,
        style,
      ]}
      role={isButton ? "button" : "link"}
      onPress={!disabled && isButton ? onPress : undefined}
      href={!disabled && isLink ? href : undefined}
      target={!disabled ? target : undefined}
    >
      <Container isTextOnly={isTextOnly} style={[styles.textAndIconContainer]}>
        {React.Children.toArray(children).map(
          (child, index) =>
            (typeof child === "string" && (
              <Text
                key={`link-text-${index}`}
                testID="link-text"
                style={[
                  styles.textUnderline(disabled),
                  styles.textColor(palette),
                  !hasIconOnlyChild && styles.textSize,
                  !!hasIconChild && styles.invertedTextStyle(disabled),
                  !!inverted &&
                    styles.invertedTextStyles(state, isHovered, isActive),
                  textStyle,
                ]}
              >
                {child}
              </Text>
            )) ||
            (React.isValidElement(child) && (
              <View
                key={child.key || `link-icon-${index}`}
                style={styles.iconWrapper}
              >
                {child.type === Icon || child.type === TextLink.Icon ? (
                  <Icon
                    testID="link-icon"
                    {...child.props}
                    size={getIconSize(size)}
                    style={[
                      styles.iconColor(palette),
                      style,
                      !!inverted &&
                        styles.invertedIconStyles(state, isHovered, isActive),
                    ]}
                  />
                ) : (
                  child
                )}
              </View>
            )),
        )}
      </Container>
    </A>
  );
};

const TextLinkIcon = (props: IconProps) => {
  const { brand } = useThemeProviderContext();
  return <Icon brand={brand !== "simpel" ? brand : undefined} {...props} />;
};

TextLinkIcon.displayName = "TextLink.Icon";

TextLink.Icon = TextLinkIcon;

export { TextLink };
