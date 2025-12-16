import type {
  NumberInputProps,
  NumberInputButtonProps,
} from "./NumberInput.types";
import { ActionButtonIcon } from "../ActionButton";
import styles from "./NumberInput.module.scss";
import { NumberField } from "_internals/Form/NumberField";
import { tokenClassNames } from "_utility";
import classNames from "classnames";

export const NumberInput = ({
  size = "default",
  state = "default",
  min = 1,
  max = 999,
  value = min,
  step = 1,
  onChange,
  onIncrement,
  onDecrement,
  testID,
  id,
  ...props
}: NumberInputProps) => {
  const isInactive = state === "inactive";

  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  const handleChange = (val: number) => onChange?.(clamp(val));

  const handleIncrement = () => {
    const newValue = clamp(Number(value) + step);
    onChange?.(newValue);
    if (newValue !== max) onIncrement?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = clamp(Number(value) - step);
    onChange?.(newValue);
    if (newValue !== min) onDecrement?.(newValue);
  };

  const isSm = size === "sm";
  const ButtonComponent = isSm ? SmallButton : DefaultButton;

  return (
    <div
      className={tokenClassNames(
        styles,
        "number-input",
        styles[`size-${size}`],
      )}
    >
      <ButtonComponent
        type="min"
        onClick={handleDecrement}
        inactive={isInactive || Number(value) <= min}
        position="left"
      />
      <NumberField
        id={id}
        testID={testID}
        min={min}
        max={max}
        size={size}
        state={state}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <ButtonComponent
        type="plus"
        onClick={handleIncrement}
        inactive={isInactive || Number(value) >= max}
        position="right"
      />
    </div>
  );
};

const DefaultButton = ({ type, onClick, inactive }: NumberInputButtonProps) => (
  <ActionButtonIcon
    icon={type}
    testID="number-input-button"
    onClick={onClick}
    state={inactive ? "inactive" : undefined}
  />
);

const SmallButton = ({
  type,
  onClick,
  inactive,
  position,
}: NumberInputButtonProps) => (
  <div className={styles["small-button"]} style={{ [position!]: 0 }}>
    <ActionButtonIcon
      testID="number-input-button"
      className={classNames(
        styles["token-button-number-input-button-v1"],
        styles["small-button-action"],
      )}
      size="sm"
      prominence="secondary"
      onClick={onClick}
      icon={type}
      state={inactive ? "inactive" : undefined}
    />
  </div>
);
