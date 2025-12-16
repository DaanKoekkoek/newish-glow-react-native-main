import React, { useRef, useCallback, useReducer } from "react";
import styles from "./InputField.module.scss";

import type { InputFieldProps } from "./Input.types";
import { InputContainer, InputIcon } from "_internals/Form";
import { getDefaultState, reducer } from "./InputField.reducer";
import { useInput } from "./hooks";
import { isSupportedInputIconType, getInputFieldState } from "./utils";
import { tokenClassNames } from "_utility";

export const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      legend,
      inactive = false,
      validated,
      helperText,
      showHelper = true,
      placeholder,
      testID,
      onBlur,
      onFocus,
      onChange,
      id,
      type = "text",
      showClear = false,
      value,
      className,
      iconClassName,
      suffix = "solid",
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const variant = getInputFieldState(inactive, validated?.valid);
    const [state, dispatch] = useReducer(reducer, getDefaultState(type));
    const inputType =
      type === "file" || (type === "password" && state.isPasswordHidden)
        ? type
        : "text";

    const { clearInput } = useInput(internalRef, onChange, state);

    const handleRef = useCallback(
      (textInput: HTMLInputElement) => {
        internalRef.current = textInput;
        if (typeof ref === "function") {
          ref(textInput);
        } else if (ref) {
          ref.current = textInput;
        }
      },
      [ref, internalRef],
    );

    const isPasswordType = type === "password";
    const isSearchType = type === "search";
    const isDateType = type === "date";
    const isFileType = type === "file";
    const isValidated = variant === "valid";
    const displayClearButton = showClear && !isDateType && !inactive;
    const hasFiles = isFileType && value && inactive === false;

    return (
      <InputContainer
        id={id}
        testID={testID}
        legend={legend}
        validated={validated}
        helperText={helperText}
        showHelper={showHelper}
        className={className}
        ref={ref}
      >
        {type === "search" && (
          <InputIcon
            variant={variant}
            position="prefix"
            type={type}
            className={iconClassName}
          />
        )}
        <input
          className={tokenClassNames(styles, "input-field", {
            [styles[`error`]]: variant === "error",
            [styles[`valid`]]: isValidated,
            [styles[`text-prefix`]]: isSearchType,
            [styles[`text-suffix`]]:
              isValidated || displayClearButton || isDateType || isPasswordType,
            [styles[`group-suffix`]]:
              (isValidated || displayClearButton) &&
              (isPasswordType || isDateType || isFileType),
            [styles[`file-selected`]]: hasFiles,
          })}
          id={id}
          ref={handleRef}
          data-testid={testID}
          disabled={inactive}
          placeholder={placeholder}
          readOnly={inactive || isFileType}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange || undefined}
          type={inputType}
          {...(type !== "file" && { value })}
          {...props}
        />
        <InputIcon
          variant={variant}
          showClear={showClear}
          position="suffix"
          state={state}
          className={iconClassName}
          onClick={
            !validated?.valid && !!value && displayClearButton
              ? clearInput
              : undefined
          }
          solid={displayClearButton && suffix === "solid"}
          dispatch={dispatch}
          type={isSupportedInputIconType(type) ? type : "text"}
          fileInputRef={internalRef}
        />
      </InputContainer>
    );
  },
);
