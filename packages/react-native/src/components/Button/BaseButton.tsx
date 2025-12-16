import { useFontFamily } from "_global-hooks";
import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import React, { createContext, useContext, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Platform, Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { buttonStyles } from "./Button.styles";
import type {
  BaseButtonProps,
  ButtonContextProps,
  ButtonIconProps,
} from "./Button.types";
import { useButtonAnimation } from "./hooks";
import { Spinner } from "../Spinner";

const ButtonContext = createContext<ButtonContextProps>({
  size: "default",
  state: undefined,
  inverted: false,
});

export const useButtonContext = () => useContext(ButtonContext);

const BaseButton = ({
  asText = false,
  children,
  fill = false,
  inverted = false,
  isHovered = false,
  isPressed = false,
  onPress,
  pointerEvents,
  prominence = "default",
  size = "default",
  state,
  testID,
  palette = "default",
  ...props
}: BaseButtonProps) => {
  const [childrenWidth, setChildrenWidth] = useState(0);
  const isIconOnly = () => {
    if (!React.isValidElement(children)) {
      return false;
    }

    const singleChild = children as React.ReactElement;
    return singleChild.type === BaseButtonIcon || singleChild.type === Icon;
  };

  const { styles } = useStyles(buttonStyles, {
    prominence: prominence === "default" ? undefined : prominence,
    size: size === "default" ? undefined : size,
    state,
    fill,
    pointerEvents,
  });

  const buttonTestID = mergeTestIds(testID, "button");
  const buttonVisualTestID = mergeTestIds(testID, "button-visual");
  const fontFamily = useFontFamily("Paragraph_Strong");

  const { backgroundAnimation, borderAnimation, textAnimation } =
    useButtonAnimation(
      isHovered,
      isPressed,
      prominence,
      inverted,
      state,
      palette,
    );

  const onLayout = (event: LayoutChangeEvent) =>
    setChildrenWidth(event.nativeEvent.layout.width);

  const renderChild = (child: React.ReactNode) => {
    if (!child) return null;

    if (React.isValidElement(child) && child.type === BaseButtonIcon) {
      return (
        <Text>
          <Animated.Text
            style={[
              !isIconOnly() &&
                Platform.OS === "web" && [{ fontFamily }, styles.text],
              textAnimation,
            ]}
          >
            {child}
          </Animated.Text>
        </Text>
      );
    } else {
      return (
        <Animated.Text
          style={[
            (!isIconOnly() || Platform.OS === "web") && [
              { fontFamily },
              styles.text,
            ],
            textAnimation,
          ]}
        >
          {child}
        </Animated.Text>
      );
    }
  };

  const animatedButton = (
    <Animated.View
      testID={buttonVisualTestID}
      style={[
        styles.container,
        styles.buttonColor(prominence, inverted, isPressed!, state),
        styles.buttonPadding(prominence, size, isIconOnly()),
        borderAnimation,
        backgroundAnimation,
        props.baseStyle,
      ]}
    >
      <View style={styles.childrenContainer} onLayout={onLayout}>
        {React.Children.map(children, renderChild)}
      </View>
      {state === "loading" && (
        <Spinner
          size={size === "lg" || size === "default" ? "default" : size}
          containerStyle={styles.buttonLoading(
            childrenWidth,
            size,
            isIconOnly(),
            fill,
            asText,
          )}
          color="default"
          style={styles.buttonLoadingIconColor(prominence, inverted)}
        />
      )}
    </Animated.View>
  );

  const pressableConfiguration = {
    style: [styles.button, props.pressableStyle],
    testID: buttonTestID,
    disabled: state !== undefined,
    delayLongPress: !asText ? 5000 : undefined,
    pressRetentionOffset: !asText ? 100 : undefined,
    onPress,
    ...props,
  };

  const Tag = asText ? Text : Pressable;
  return (
    <ButtonContext.Provider value={{ size, state, inverted }}>
      {props.stretched ? (
        <>
          {animatedButton}
          <Tag {...pressableConfiguration} style={styles.stretchedButton} />
        </>
      ) : (
        <Tag role={asText ? undefined : "button"} {...pressableConfiguration}>
          {animatedButton}
        </Tag>
      )}
    </ButtonContext.Provider>
  );
};

const BaseButtonIcon: React.FC<ButtonIconProps> = ({ name, solid = false }) => {
  const { size, inverted, state } = useButtonContext();
  const { styles } = useStyles(buttonStyles, {
    inverted,
  });
  const { brand } = useThemeProviderContext();

  return (
    <Icon
      brand={brand !== "simpel" ? brand : undefined}
      name={name}
      size={size === "lg" ? "default" : size}
      solid={solid}
      style={[
        styles.buttonIcon,
        state === "loading" && { opacity: 0, color: "#00000000" },
      ]}
      testID="base-button-icon"
    />
  );
};

BaseButtonIcon.displayName = "Button.Icon";
BaseButton.Icon = BaseButtonIcon;

export { BaseButton, BaseButtonIcon };
