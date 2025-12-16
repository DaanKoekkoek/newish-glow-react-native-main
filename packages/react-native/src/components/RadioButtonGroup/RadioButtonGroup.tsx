import { ErrorMessage } from "_internals/ErrorMessage";
import { HelperText } from "_internals/HelperText";
import { useThemeProviderContext } from "components/ThemeProvider";
import { GlowGradient } from "foundations/GlowGradient";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import {
  radioButtonStylesheet,
  radioButtonGroupStylesheet,
  SwitchThemeRadioButton,
} from "./RadioButtonGroup.style";
import type {
  RadioButtonGroupProps,
  RadioButtonProps,
} from "./RadioButtonGroup.types";
import { InputLabel } from "../InputField/InputLabel";

export const RadioButton = ({
  checked,
  id,
  value,
  label,
  onPress,
  state = "default",
  style,
  testID = "radio-button",
}: RadioButtonProps) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const { brand } = useThemeProviderContext();

  const { styles, theme } = useStyles(radioButtonStylesheet, {
    checked,
    inactive: state === "inactive",
    error: state === "error",
    pressed: pressed && state === "default",
    hovered: hovered && state === "default",
    checkedPressed: checked && pressed && state === "default",
  });

  const handleOnPress = useCallback(() => {
    if (state !== "inactive") {
      onPress({ id, value });
    }
  }, [id, onPress, state, value]);

  const handleOnPressInAndOut = useCallback(() => {
    setPressed((prev) => !prev);
  }, [setPressed]);

  const handleOnHover = useCallback(() => {
    setHovered((prev) => !prev);
  }, [setHovered]);

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <Pressable
        style={styles.pressable}
        onPressIn={handleOnPressInAndOut}
        onPressOut={handleOnPressInAndOut}
        onPress={handleOnPress}
        onHoverIn={handleOnHover}
        onHoverOut={handleOnHover}
        disabled={state === "inactive"}
        accessible
        role="radio"
        aria-checked={checked}
        aria-label="input"
        aria-labelledby={id}
        accessibilityLabelledBy={id}
        pointerEvents="box-only"
      >
        <View style={styles.radio}>
          {state === "default" &&
            checked &&
            (brand === "switch" ? (
              <SwitchThemeRadioButton
                size={theme.themes.components.input.atoms.radio.size.default}
              />
            ) : (
              <GlowGradient
                brightness={pressed || hovered ? "dark" : "light"}
                type="Glow4"
                zIndex={0}
              />
            ))}
          {state !== "error" && (checked || hovered) && (
            <View style={styles.iconContainer}>
              <Icon
                style={styles.icon}
                name="radio"
                solid
                size="sm"
                testID="radio-icon"
                allowFontScaling={false}
              />
            </View>
          )}
        </View>
        {label && (
          <Paragraph
            style={styles.label}
            size="sm"
            id={id}
            dataAttributes={{
              nativeID: id,
            }}
          >
            {label}
          </Paragraph>
        )}
      </Pressable>
    </View>
  );
};

export const RadioButtonGroup = ({
  accessibilityLabel,
  direction = "vertical",
  errorMessage,
  helperText,
  legend,
  onPress,
  options = [],
  state = "default",
  testID = "radio-button-group",
}: RadioButtonGroupProps) => {
  const initialCheckedIndex = useMemo(
    () => options.findIndex((x) => x.checked),
    [options],
  );

  const [checkedId, setCheckedId] = useState<string | undefined>(
    initialCheckedIndex >= 0 ? options[initialCheckedIndex].id : undefined,
  );

  const handleCheckedUpdate = useCallback(
    ({ id, value }: Pick<RadioButtonProps, "id" | "value">) => {
      setCheckedId(id);
      onPress({ id, value });
    },
    [onPress],
  );

  const { styles } = useStyles(radioButtonGroupStylesheet, {
    direction,
  });

  return !options.length ? null : (
    <View
      style={styles.container}
      role="radiogroup"
      accessibilityLabel={accessibilityLabel}
      accessibilityLabelledBy={accessibilityLabel}
      testID={testID}
    >
      {legend?.text && <InputLabel {...legend} testID="legend" />}
      <View style={styles.wrapper} testID="radio-button-group-wrapper">
        {options.map(({ id, label, testID, value }, index) => (
          <RadioButton
            key={id}
            checked={options[index].id === checkedId}
            id={id}
            label={label}
            onPress={handleCheckedUpdate}
            state={state}
            style={styles.radioButton(
              direction === "horizontal" ? options.length : 1,
            )}
            testID={testID}
            value={value}
          />
        ))}
      </View>
      {state !== "error" && <HelperText text={helperText} />}
      {state === "error" && <ErrorMessage text={errorMessage} />}
    </View>
  );
};
