import { mergeTestIds } from "_utility";
import React, { useState } from "react";
import type {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { NumberInputProps } from "./NumberInput.types";
import { ActionButtonIcon } from "../ActionButton";
import { NumberField } from "../NumberField/NumberField";
import { NumberInputButton } from "../NumberInputButton/NumberInputButton";

export const NumberInput = ({
  value: valueProp,
  size = "default",
  state = "default",
  min = 1,
  max = 999,
  step = 1,
  onChange,
  onIncrement,
  onDecrement,
  defaultValue,
  testID,
  ...props
}: NumberInputProps) => {
  const [value, setValue] = useState(String(defaultValue ?? min));

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

  const { styles } = useStyles(stylesheet, {
    size: size === "default" ? null! : size,
  });

  const numberInputTestId = mergeTestIds(testID, "number-input");
  const isDisabled = state === "disabled";
  const isControlled = valueProp !== undefined;
  const effectiveValue = isControlled ? String(valueProp) : value;

  const handleChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    value: number,
  ) => {
    onChange?.(e, value);
    setValue(String(value));
  };

  const handleIncrement = (e: GestureResponderEvent) => {
    const newValue = Number(effectiveValue) + step;

    if (newValue > max) {
      return;
    }

    if (isControlled) {
      onChange?.(e as any, newValue);
    } else {
      onChange?.(e as any, newValue);
      setValue(String(newValue));
    }

    onIncrement?.(e, newValue);
  };

  const handleDecrement = (e: GestureResponderEvent) => {
    const newValue = Number(effectiveValue) - step;

    if (newValue < min) {
      return;
    }

    if (isControlled) {
      onChange?.(e as any, newValue);
    } else {
      onChange?.(e as any, newValue);
      setValue(String(newValue));
    }

    onDecrement?.(e, newValue);
  };

  const input = (
    <NumberField
      allowFontScaling={size === "default"}
      testID={numberInputTestId}
      min={min}
      max={max}
      size={size}
      state={state}
      value={effectiveValue}
      onChange={handleChange}
      {...props}
    />
  );

  if (size === "sm") {
    return (
      <View testID={numberInputTestId} style={styles.inputContainer}>
        <View style={{ position: "absolute", left: 0, zIndex: 1 }}>
          <NumberInputButton
            icon="min"
            testID={numberInputTestId}
            onPress={handleDecrement}
            state={
              isDisabled || Number(effectiveValue) <= min
                ? "disabled"
                : undefined
            }
          />
        </View>
        {input}
        <View style={{ position: "absolute", right: 0, zIndex: 1 }}>
          <NumberInputButton
            icon="plus"
            testID={numberInputTestId}
            onPress={handleIncrement}
            state={
              isDisabled || Number(effectiveValue) >= max
                ? "disabled"
                : undefined
            }
          />
        </View>
      </View>
    );
  }

  return (
    <View testID={numberInputTestId} style={styles.inputContainer}>
      <ActionButtonIcon
        icon="min"
        testID={numberInputTestId}
        onPress={handleDecrement}
        state={
          isDisabled || Number(effectiveValue) <= min ? "disabled" : undefined
        }
      />
      {input}
      <ActionButtonIcon
        icon="plus"
        testID={numberInputTestId}
        onPress={handleIncrement}
        state={
          isDisabled || Number(effectiveValue) >= max ? "disabled" : undefined
        }
      />
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      variants: {
        size: {
          default: {
            width: input.numberInput.v1.size.width.default,
            gap: input.gap.horizontal.default,
          },
          sm: {
            width: input.numberInput.v1.size.width.sm,
          },
        },
      },
    },
  }),
);
