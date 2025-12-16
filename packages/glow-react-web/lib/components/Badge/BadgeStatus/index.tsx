import { Paragraph } from "foundations/Paragraph";
import { Icon } from "foundations/Icon";
import styles from "./BadgeStatus.module.scss";
import classNames from "classnames";
import { BadgeStatusProps, BadgeStatusVariant } from "./BadgeStatus.types";
import { tokenClassNames } from "_utility";

export const BadgeStatus = ({
  variant = "default",
  count = 0,
  size = "default",
  testID = "badge-status",
  type = "default",
  className,
  icon,
}: BadgeStatusProps) => {
  const adjustedCount = count > 99 ? "99+" : count;

  const statusIcon = (variant: Omit<BadgeStatusVariant, "default">) => {
    switch (variant) {
      case "error":
        return "close";
      case "success":
      default:
        return "checkmark";
    }
  };

  return (
    <div
      className={tokenClassNames(
        styles,
        "badge-status",
        styles[`badge-status-variant-${variant}`],
        styles[`badge-status-size-${size}`],
        className,
      )}
      data-testid={testID}
    >
      {type === "default" ? (
        <Paragraph
          as="span"
          testID={`${testID}-number`}
          className={classNames(
            styles["badge-status-number"],
            styles[`badge-status-variant-${variant}-number`],
            styles[`badge-status-size-${size}-number`],
          )}
        >
          {adjustedCount || "0"}
        </Paragraph>
      ) : (
        <Icon
          testID={`${testID}-icon`}
          name={icon ?? statusIcon(variant)}
          className={classNames(
            styles["badge-status-icon"],
            styles[`badge-status-variant-${variant}-icon`],
            styles[`badge-status-size-${size}-icon`],
          )}
        />
      )}
    </div>
  );
};
