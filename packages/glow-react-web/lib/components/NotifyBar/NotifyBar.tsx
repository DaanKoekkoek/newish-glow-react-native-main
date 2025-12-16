import React from "react";
import { Icon } from "foundations/Icon";
import { Button } from "../Button";
import { NotifyBarProps } from "./NotifyBar.types";
import styles from "./NotifyBar.module.scss";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

export const NotifyBar = ({
  children,
  actionText,
  closeText,
  onActionPress,
  onClose,
  icon,
  state = "default",
  testID = "notify-bar",
}: NotifyBarProps) => {
  const iconName =
    state === "error"
      ? "status-error"
      : state === "success"
        ? "oval-checkmark"
        : icon;

  return (
    <div
      className={tokenClassNames(styles, "notifybar", styles[`state-${state}`])}
      role="alert"
      aria-live="assertive"
      data-testid={testID}
    >
      <div className={styles["notifybar-message"]}>
        {icon && iconName && (
          <Icon
            name={iconName}
            className={styles["notifybar-icon"]}
            testID={`${testID}-icon`}
          />
        )}
        {React.isValidElement(children) ? (
          <div className={styles["notifybar-text"]}>{children}</div>
        ) : (
          <Paragraph size="sm" className={styles["notifybar-text"]}>
            {children}
          </Paragraph>
        )}
      </div>
      {(actionText || closeText) && (
        <div className={styles["notifybar-actions"]}>
          {actionText && (
            <Button
              size="sm"
              onClick={onActionPress}
              inverted
              testID={`${testID}-action-button`}
            >
              {actionText}
            </Button>
          )}
          {closeText && onClose && (
            <Button
              size="sm"
              prominence="secondary"
              onClick={onClose}
              inverted
              testID={`${testID}-action-close`}
            >
              {closeText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
