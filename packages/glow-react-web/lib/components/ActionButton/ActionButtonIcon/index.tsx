import { Button } from "components/Button";
import { type BaseButtonProminence } from "_internals/Button";
import { Icon } from "foundations/Icon";
import styles from "./ActionButtonIcon.module.scss";
import { ComponentProps } from "react";
import { tokenClassNames } from "_utility";

type ActionButtonIconSize = "sm" | "default";

type ActionButtonIconState = "loading" | "inactive";

export type ActionButtonIconProps = {
  onClick:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | (() => void);
  prominence?: BaseButtonProminence;
  inverted?: boolean;
  size?: ActionButtonIconSize;
  state?: ActionButtonIconState;
  icon: ComponentProps<typeof Icon>["name"];
  className?: string;
  stretched?: boolean;
  testID?: string;
  ariaLabel?: string;
};

export const ActionButtonIcon = ({
  onClick,
  prominence = "default",
  inverted,
  size = "default",
  state,
  icon,
  className,
  stretched,
  testID,
  ariaLabel,
}: ActionButtonIconProps) => {
  return (
    <Button
      state={state}
      inverted={inverted}
      prominence={prominence}
      onClick={onClick}
      className={tokenClassNames(
        styles,
        "action-button-icon",
        {
          [styles["size-default"]]: size === "default",
          [styles["size-sm"]]: size === "sm",
          [styles[`prominence-${prominence}`]]: prominence !== "default",
          [styles["is-inverted"]]: inverted && state === "loading",
          [styles[`state-${state}`]]: state,
        },
        className,
      )}
      stretched={stretched}
      size={size}
      testID={testID}
      ariaLabel={ariaLabel}
    >
      <Icon
        name={icon}
        size={size}
        // We have to force display: block here to maintain a square icon ratio
        className={styles.block}
      />
    </Button>
  );
};
