import React, { ChangeEvent } from "react";

import type { NumberFieldProps } from "./NumberField.types";
import styles from "./NumberField.module.scss";
import { tokenClassNames } from "_utility";

const EMPTY_VALUE = "";
const BACKSPACE_KEY = "Backspace";

const isNumericString = (value: string) => {
  if (typeof value !== "string") return false;
  return !isNaN(Number(value));
};

const trimZeroNumber = (value?: string | number) =>
  String(value).replace(/^0+/, "");

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      size = "default",
      state = "default",
      value,
      masked = false,
      min = 1,
      max = 999,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
      testID = "number-field",
      id,
    }: NumberFieldProps,
    ref,
  ) => {
    const inputType = masked ? "password" : "number";

    const isDisabled = state === "inactive";

    const validateInput = (value: string) => {
      if (value === BACKSPACE_KEY || value === EMPTY_VALUE) return true;
      return isNumericString(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      const isValid = validateInput(key);

      if (!isValid) return;

      onKeyDown?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const textValue = e.target.value.trim();

      const isValid = validateInput(textValue);

      if (!isValid) return;
      const newValue = Number(textValue);

      if (newValue < min) {
        onChange?.(min);
      }

      if (newValue > max) {
        onChange?.(max);
      }

      onChange?.(newValue);
    };

    return (
      <input
        id={id}
        ref={ref}
        type={inputType}
        data-testid={testID}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleChange}
        inputMode="numeric"
        disabled={isDisabled}
        value={trimZeroNumber(value)}
        onKeyDown={handleKeyPress}
        aria-disabled={isDisabled}
        className={tokenClassNames(
          styles,
          "number-field",
          styles[`size-${size}`],
          styles[`state-${state}`],
        )}
      />
    );
  },
);
