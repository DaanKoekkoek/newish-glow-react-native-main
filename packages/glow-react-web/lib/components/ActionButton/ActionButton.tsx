import { Paragraph } from "foundations/Paragraph";
import {
  ActionButtonIcon,
  type ActionButtonIconProps,
} from "./ActionButtonIcon";
import styles from "./ActionButton.module.scss";
import classNames from "classnames";
import { tokenClassNames } from "_utility";

export type ActionButtonProps = Pick<
  ActionButtonIconProps,
  "onClick" | "icon" | "prominence" | "state" | "inverted"
> & {
  testID?: string;
  label: string;
};

export const ActionButton = ({
  icon,
  inverted,
  label,
  onClick,
  prominence,
  state,
  testID,
}: ActionButtonProps) => {
  return (
    <div
      data-testid={testID}
      className={tokenClassNames(styles, "action-button")}
    >
      <ActionButtonIcon
        onClick={onClick}
        prominence={prominence}
        icon={icon}
        stretched
        state={state}
        inverted={inverted}
        ariaLabel={label}
      />
      <Paragraph
        size="xs"
        className={classNames(styles["action-button-label"], {
          [styles.inactive]: state === "inactive",
        })}
      >
        {label}
      </Paragraph>
    </div>
  );
};
