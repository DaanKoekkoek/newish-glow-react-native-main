import { Button } from "components/Button";
import { TextLink } from "components/TextLink";
import { Icon } from "foundations/Icon";
import type {
  Action,
  ActionPosition,
  LocalNavigationProps,
} from "./LocalNavigation.types";
import styles from "./LocalNavigation.module.scss";

import classNames from "classnames";

export const ActionButton = ({
  action,
  position = "left",
  prominence,
  variant,
  testID,
}: {
  action?: Action;
  position: ActionPosition;
  prominence: LocalNavigationProps["prominence"];
  variant: LocalNavigationProps["variant"];
  testID?: string;
}) => {
  if (!action) return null;

  if (prominence === "emphasised") {
    return (
      <Button
        icon={{ name: action.icon, position }}
        testID={`${testID}-button-${position}`}
        inverted
        size="sm"
        onClick={action.onClick}
        className={styles["action-button"]}
      >
        <span>{action.title}</span>
      </Button>
    );
  }

  return (
    <TextLink
      className={classNames({
        [styles["action-button"]]: variant === "compact",
      })}
      onClick={action.onClick}
      role="link"
      href={action.href}
    >
      {position === "left" ? <Icon name={action.icon} /> : null}
      {action.title}
      {position === "right" ? <Icon name={action.icon} /> : null}
    </TextLink>
  );
};
