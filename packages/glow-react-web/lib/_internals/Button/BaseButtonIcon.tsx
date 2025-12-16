import classNames from "classnames";

import { Icon } from "foundations/Icon";
import styles from "./styles/Button.module.scss";
import type { BaseButtonSize, BaseButtonIconProps } from "./BaseButton.types";

export const BaseButtonIcon = ({
  buttonIconSize,
  className,
  ...props
}: {
  buttonIconSize?: BaseButtonSize;
  className?: string;
} & BaseButtonIconProps) => {
  const { position, ...iconProps } = props;

  return (
    <Icon
      testID={`button-icon-${position || "left"}`}
      {...iconProps}
      className={classNames(
        styles["button-icon"],
        styles[`button-icon-size-${buttonIconSize}`],
        className,
      )}
    />
  );
};
