import classNames from "classnames";
import { RadioButtonGroupProps } from "./RadioButtonGroup.types";
import styles from "./RadioButtonGroup.module.scss";
import { RadioButton, RadioButtonProps } from "components/RadioButton";
import { sanitizeString, tokenClassNames } from "_utility";
import { HelperMessage, Legend } from "_internals/Form";

export const RadioButtonGroup = ({
  options,
  legend,
  name,
  direction = "column",
  onChange,
  validated,
  helperText,
  disabled,
  testID = "radio-buttton-group",
}: RadioButtonGroupProps) => {
  const sanitizedName = name ? sanitizeString(name) : undefined;
  const groupId = `radio-group-${sanitizedName}`;
  const isInvalid = validated?.valid === false;
  const helperId = isInvalid ? `${groupId}-error` : `${groupId}-helper`;
  const errorMessage = isInvalid ? validated.message : undefined;

  return (
    <div
      id={groupId}
      data-testid={testID}
      className={tokenClassNames(styles, "radio-button-group")}
    >
      <Legend {...legend} testID="radio-legend" />
      <div
        className={classNames(styles["radio-button-group-radios"], {
          [styles["is-in-row"]]: direction === "row",
        })}
      >
        {options.map((option: RadioButtonProps) => {
          const sanitizedId = sanitizeString(option.id);
          return (
            <RadioButton
              {...option}
              key={option.id}
              value={option.value}
              name={sanitizedName}
              id={sanitizedId}
              label={option.label}
              validated={validated}
              testID={testID}
              onChange={() => onChange?.(option.value)}
              checked={option.checked}
              disabled={disabled}
            />
          );
        })}
      </div>
      {(!!helperText || !!errorMessage) && (
        <HelperMessage id={helperId} errorMessage={errorMessage}>
          {helperText}
        </HelperMessage>
      )}
    </div>
  );
};
