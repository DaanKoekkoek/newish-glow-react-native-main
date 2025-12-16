import { useFontFamily } from "_global-hooks";
import { isNumericString, mergeTestIds } from "_utility";
import React, { useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
} from "react-native";
import { Platform, StyleSheet, TextInput } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { NumberFieldProps } from "./NumberField.types";

const EMPTY_VALUE = "";
const BACKSPACE_KEY = "Backspace";

export const NumberField = React.forwardRef<TextInput, NumberFieldProps>(
  (
    {
      size = "default",
      state = "default",
      value: valueProp,
      masked = false,
      min = 1,
      max = 999,
      onBlur,
      onFocus,
      onChange,
      onKeyPress,
      defaultValue,
      testID,
      allowFontScaling = true,
      ...props
    }: NumberFieldProps,
    ref,
  ) => {
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const [value, setValue] = useState(String(defaultValue ?? min));

    const { styles } = useStyles(stylesheet, {
      state: state === "default" ? null! : state,
      size: size === "default" ? null! : size,
    });

    if (defaultValue && valueProp) {
      throw new Error("You can't use defaultValue and value at the same time");
    }

    if (min < 0) {
      throw new Error("The min value must be greater than or equal to 0");
    }

    if (min >= max) {
      throw new Error("The min value must be less than the max value");
    }

    if (
      Number(defaultValue ?? value) < min ||
      Number(defaultValue ?? value) > max
    ) {
      throw new Error("The value must be between the min and max values");
    }

    const MIN_VALUE = String(min);
    const MAX_VALUE = String(max);

    const numberFieldTestID = mergeTestIds(testID, "number-field");
    const isDisabled = state === "disabled";
    const isControlled = valueProp !== undefined;
    const effectiveValue = isControlled ? String(valueProp) : value;
    const fontFamily = useFontFamily("Paragraph_Regular");

    const validateInput = (value: string) => {
      if (value === BACKSPACE_KEY || value === EMPTY_VALUE) return true;
      return isNumericString(value);
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsActive(!isDisabled);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsActive(false);
      onBlur?.(e);
    };

    const handleKeyPress = (
      e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    ) => {
      const key = e.nativeEvent.key;

      const isValid = validateInput(key);

      if (!isValid) return;

      onKeyPress?.(e);
    };

    const handleChange = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const textValue = e.nativeEvent.text.trim();

      const isValid = validateInput(textValue);

      if (!isValid) return;

      const newValue = Number(textValue);

      if (newValue < min) {
        if (isControlled) {
          onChange?.(e, min);
          return;
        } else {
          onChange?.(e, min);
          setValue(MIN_VALUE);
          return;
        }
      }

      if (newValue > max) {
        if (isControlled) {
          onChange?.(e, max);
          return;
        } else {
          onChange?.(e, max);
          setValue(MAX_VALUE);
          return;
        }
      }

      if (isControlled) {
        onChange?.(e, newValue);
      } else {
        onChange?.(e, newValue);
        setValue(String(newValue));
      }
    };

    return (
      <TextInput
        allowFontScaling={allowFontScaling}
        ref={ref}
        testID={numberFieldTestID}
        inputMode="numeric"
        editable={!isDisabled}
        value={effectiveValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        secureTextEntry={masked}
        aria-disabled={isDisabled}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        style={StyleSheet.flatten([
          { fontFamily },
          styles.input,
          isHovered && styles.hoverStyle(state),
          isActive && styles.activeStyle(state),
        ])}
        {...props}
      />
    );
  },
);

const stylesheet = createStyleSheet(
  ({
    themes: {
      semantics: {
        color: { text },
      },
      components: {
        input,
        input: {
          atoms: { field },
        },
        foundations: {
          typography: { textStyles },
        },
      },
    },
  }) => ({
    input: {
      flex: 1,
      width: "100%",
      textAlign: "center",
      borderStyle: "solid",
      fontSize: textStyles.v1.paragraph.fontSize.sm,
      lineHeight: textStyles.v1.paragraph.lineHeight.sm,
      borderWidth: input.borderWidth.default,
      borderRadius: field.radius.number,
      minWidth: input.numberInput.v1.size.width.default / 3,
      color: text.default,
      ...Platform.select({
        ios: {
          // TODO: add mobile adaptation token
          lineHeight: 19,
        },
        web: {
          outlineWidth: 0,
        },
      }),
      variants: {
        size: {
          default: {
            paddingHorizontal:
              field.padding.horizontal.default - input.borderWidth.default,
            paddingVertical:
              field.padding.vertical.default - input.borderWidth.default,
          },
          sm: {
            height: 32, // missing token
            paddingVertical:
              field.padding.vertical.sm - input.borderWidth.default,
            paddingHorizontal: field.padding.horizontal.default,
            borderWidth: input.numberInput.v1.borderWidth.default.sm,
          },
        },
        state: {
          default: {
            borderColor: input.color.border.default,
          },
          success: {
            borderColor: input.color.border.success,
          },
          error: {
            borderColor: input.color.border.error,
          },
          disabled: {
            borderColor: input.color.border.inactive,
            backgroundColor: input.color.background.inactive,
            color: input.color.text.inactive,
          },
        },
      },
    },
    hoverStyle: (state) => {
      if (state === "default") {
        return {
          borderColor: input.color.border.hover,
        };
      }
      return {};
    },
    activeStyle: (state) => {
      if (state === "default") {
        return {
          borderColor: input.color.border.active,
        };
      }
      return {};
    },
  }),
);
