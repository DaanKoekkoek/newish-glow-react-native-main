import { GlowGradient } from "foundations/GlowGradient";
import styles from "./Toggle.module.scss";
import { ToggleLabelOptions, ToggleProps } from "./Toggle.types";
import { tokenClassNames } from "_utility";

const labelOptions: Record<ToggleLabelOptions, [string, string]> = {
  aanuit: ["Aan", "Uit"],
  onoff: ["On", "Off"],
  yesno: ["Yes", "No"],
  janee: ["Ja", "Nee"],
};

export const Toggle = ({
  id,
  testID,
  stretched = false,
  size = "default",
  labelText = "aanuit",
  checked,
  onChange,
  palette = "default",
  ...props
}: ToggleProps) => {
  const [labelOn, labelOff] = labelOptions[labelText] ?? ["", ""];

  const ariaLabel = props["aria-label"]
    ? props["aria-label"]
    : checked
      ? labelOn
      : labelOff;

  return (
    <div
      className={tokenClassNames(
        styles,
        "toggle",
        styles[`toggle-size-${size}`],
        {
          [styles[`toggle-stretched`]]: !!stretched,
        },
      )}
      data-testid={testID}
    >
      <input
        {...props}
        checked={checked}
        aria-label={ariaLabel}
        id={id}
        type="checkbox"
        className={styles["toggle-checkbox"]}
        onChange={(e) => onChange?.(e)}
      />
      <label htmlFor={id} className={styles["toggle-label"]}>
        <span className={styles["toggle-gradient-wrapper"]}>
          <GlowGradient
            as="span"
            palette={palette}
            enableHover
            zIndex={2}
            className={styles["toggle-gradient"]}
          />
          <span className={styles["toggle-knob"]} />
          {size === "xl" && (
            <span className={styles["toggle-label-text"]}>
              <span className={styles["is-checked"]}>{labelOn}</span>
              <span className={styles["is-unchecked"]}>{labelOff}</span>
            </span>
          )}
        </span>
      </label>
    </div>
  );
};
