import React from "react";
import classNames from "classnames";
import styles from "./SelectorContainer.module.scss";
import type { SelectorContainerProps } from "./SelectorContainer.types";
import { tokenClassNames } from "_utility";

export const SelectorContainer = ({
  checked,
  id,
  type,
  state,
  className,
  highlight,
  children,
  onChange,
  contentClassName,
  testID,
  palette = "default",
  ...inputProps
}: SelectorContainerProps) => {
  const isCheckbox = type === "checkbox";
  const isDisabled = state === "inactive";

  const checkboxStyles = [
    styles["token-input-checkbox-v1"],
    styles["token-input-gap"],
    styles["token-paragraph"],
    styles["token-assets-icons"],
    styles.checkbox,
  ];

  return (
    <div
      className={tokenClassNames(
        styles,
        "selector-container",
        styles[`selector-container-palette-${palette}`],
        isDisabled && styles["is-disabled"],
        className,
        isCheckbox && checkboxStyles,
      )}
    >
      <input
        checked={checked}
        disabled={isDisabled}
        type={type}
        id={id}
        onChange={(event) => {
          onChange?.(id, event.target.checked);
        }}
        className={classNames({
          [styles["is-invalid"]]: state === "error" && !checked,
        })}
        data-testid={testID}
        {...inputProps}
      />
      <label htmlFor={id} data-testid={`${testID}-label`}>
        {highlight &&
          React.cloneElement(highlight, {
            state: state,
            checked: checked,
            textClassName: styles["selector-container-highlight-text"],
            className: styles["selector-container-highlight"],
          })}
        <div
          className={classNames(
            styles["selector-container-content"],
            contentClassName,
            {
              [styles["has-highlight"]]: !!highlight,
            },
          )}
        >
          {children}
        </div>
      </label>
    </div>
  );
};
