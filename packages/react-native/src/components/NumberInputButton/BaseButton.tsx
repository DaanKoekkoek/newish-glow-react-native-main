import { useFontFamily } from "_global-hooks";
import { mergeTestIds } from "_utility";
import { Icon } from "foundations/Icon";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform, Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { buttonStyles } from "./Button.styles";
import type {
  BaseButtonProps,
  ButtonContextProps,
  ButtonIconProps,
  ButtonTheme,
} from "./Button.types";
import { useButtonAnimation } from "./hooks";
import { Spinner } from "../Spinner";

const ButtonContext = createContext<ButtonContextProps>({
  size: "default",
  state: "disabled",
});

export const useButtonContext = () => useContext(ButtonContext);

const BaseButton = ({
  onPress,
  prominence = "default",
  size = "default",
  state,
  fill = false,
  inverted = false,
  children,
  asText = false,
  pointerEvents,
  allowFontScaling = true,
  testID,
  ...props
}: BaseButtonProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    setIsHovered(props.isHovered!);
    setIsPressed(props.isPressed!);
  }, [props.isHovered, props.isPressed]);

  const isIconOnly = () => {
    if (!React.isValidElement(children)) {
      return false;
    }

    const singleChild = children as React.ReactElement;
    return singleChild.type === BaseButtonIcon || singleChild.type === Icon;
  };

  const { styles, theme } = useStyles(buttonStyles, {
    prominence: prominence === "default" ? undefined : prominence,
    size: size === "default" ? undefined : size,
    state,
    fill,
    inverted,
    pointerEvents,
  });

  const fontFamily = useFontFamily("Paragraph_Regular");
  const baseButtonTestID = mergeTestIds(testID, "button-visual");
  const buttonTestID = mergeTestIds(testID, "button");

  const buttonTheme: ButtonTheme = theme.themes.components.button;
  const { backgroundAnimation, iconAnimation } = useButtonAnimation(
    buttonTheme,
    isHovered!,
    isPressed!,
    state,
  );

  const renderChild = (child: React.ReactNode) => {
    if (!child) return null;

    if (React.isValidElement(child) && child.type === BaseButtonIcon) {
      return (
        <Text allowFontScaling={allowFontScaling}>
          <Animated.Text
            style={[
              (!isIconOnly() || Platform.OS === "web") && [
                { fontFamily },
                styles.text,
              ],
              iconAnimation,
            ]}
          >
            {child}
          </Animated.Text>
        </Text>
      );
    } else {
      return (
        <Animated.Text
          allowFontScaling={allowFontScaling}
          style={[
            (!isIconOnly() || Platform.OS === "web") && styles.text,
            iconAnimation,
          ]}
        >
          {child}
        </Animated.Text>
      );
    }
  };

  const animatedButton = (
    <Animated.View
      testID={baseButtonTestID}
      style={[
        styles.container,
        styles.buttonColor(prominence, inverted, isPressed!, state),
        styles.buttonPadding(prominence, size, isIconOnly()),
        backgroundAnimation,
        props.baseStyle,
      ]}
    >
      {React.Children.map(children, renderChild)}
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
    <ButtonContext.Provider value={{ size, state }}>
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

const BaseButtonIcon: React.FC<ButtonIconProps> = ({ name }) => {
  const { size, state } = useButtonContext();
  return state && state === "loading" ? (
    <Spinner size={size === "lg" ? "default" : size} />
  ) : (
    <Icon name={name} size={size === "lg" ? "default" : size} />
  );
};

BaseButtonIcon.displayName = "Button.Icon";
BaseButton.Icon = BaseButtonIcon;

export { BaseButton, BaseButtonIcon };
