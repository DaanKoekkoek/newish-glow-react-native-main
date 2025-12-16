import classNames from "classnames";
import { RadioButtonProps } from "./RadioButton.types";
import styles from "./RadioButton.module.scss";
import { Label } from "_internals/Form";
import { sanitizeString, tokenClassNames } from "_utility";
import { GlowGradient } from "foundations/GlowGradient";

export const RadioButton = ({
  id,
  label,
  name,
  checked,
  onChange,
  testID = "radio-button",
  disabled,
  palette = "default",
  validated,
  ...props
}: RadioButtonProps) => {
  const sanitizedId = sanitizeString(id);
  const sanitizedName = name ? sanitizeString(name) : undefined;

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(styles, "radio-button")}
    >
      <input
        {...props}
        type="radio"
        name={sanitizedName}
        id={sanitizedId}
        className={styles["radio-button-input"]}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <Label
        id={sanitizedId}
        testID={`${testID}-label`}
        className={classNames(styles["radio-button-label"], {
          [styles["has-error"]]: validated?.valid === false,
        })}
      >
        {!disabled && (
          <GlowGradient
            as="span"
            enableHover
            className={styles["radio-button-gradient"]}
            zIndex={1}
            palette={palette}
          />
        )}
        <span className={styles["radio-button-label-text"]}>{label}</span>
      </Label>
    </div>
  );
};
