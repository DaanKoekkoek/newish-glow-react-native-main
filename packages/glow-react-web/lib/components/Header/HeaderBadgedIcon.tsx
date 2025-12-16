import { HeaderBadgedIconProps } from "./Header.types";
import { Icon } from "foundations/Icon";
import classNames from "classnames";
import styles from "./Header.module.scss";
import { BadgeStatus } from "components/Badge/BadgeStatus";

export const HeaderBadgedIcon = ({
  iconName,
  iconSize = "default",
  badgeVariant,
  badgeValue,
  badgeSize = "sm",
  className,
  testID,
}: HeaderBadgedIconProps): JSX.Element => {
  return (
    <div className={classNames(styles["icon-wrapper"], className)}>
      <Icon name={iconName} size={iconSize} />
      <div className={styles["badge-wrapper"]}>
        <BadgeStatus
          variant={badgeVariant || "default"}
          size={badgeSize}
          testID={testID ? `${testID}-badge` : "badged-icon-badge"}
          count={badgeValue}
        />
      </div>
    </div>
  );
};
