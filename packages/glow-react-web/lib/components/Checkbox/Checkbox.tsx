import classNames from "classnames";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.scss";
import { HelperMessage, Legend } from "_internals/Form";
import { BaseText } from "_internals/Typography";
import React, { isValidElement } from "react";
import { GlowGradient } from "foundations/GlowGradient";
import { tokenClassNames } from "_utility";

export const Checkbox = ({
  checked,
  className,
  errorMessage,
  helperText,
  indeterminate = false,
  id,
  label,
  legend,
  onChange,
  state = "default",
  testID = "checkbox",
  isStretched = false,
  disabled,
  palette = "default",
  ...inputProps
}: CheckboxProps) => {
  const isDisabled = state === "inactive";
  const isInvalid = state === "error";

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      onChange?.({ id, checked: event.target.checked });
    }
  };

  return (
    <div className={tokenClassNames(styles, "checkbox")}>
      {legend?.label && <Legend {...legend} data-testid="legend-container" />}
      <input
        type="checkbox"
        id={id}
        onChange={(event) => handleOnChange(event)}
        disabled={isDisabled}
        checked={checked}
        className={classNames({
          [styles["is-indeterminate"]]: indeterminate,
          [styles["is-invalid"]]: isInvalid,
        })}
        data-testid={testID}
        {...inputProps}
      />
      <label
        htmlFor={id}
        className={classNames(styles["checkbox-label-container"], className, {
          [styles["text-label-disabled"]]: isDisabled,
          [styles["is-stretched"]]: isStretched,
          [styles["start-aligned"]]:
            typeof label !== "string" &&
            isValidElement(label) &&
            label.type !== "span",
        })}
      >
        {!disabled && (
          <GlowGradient
            as="span"
            enableHover
            className={styles["checkbox-gradient"]}
            zIndex={1}
            palette={palette}
          />
        )}
        {label && <BaseText className={styles["text-label"]}>{label}</BaseText>}
      </label>
      <HelperMessage errorMessage={errorMessage}>{helperText}</HelperMessage>
    </div>
  );
};
