import classNames from "classnames";
import { SnackOptions } from "./Snackbar.types";
import { Button } from "components/Button";
import { Paragraph } from "foundations/Paragraph";
import { Spinner } from "components/Spinner";
import { Icon } from "foundations/Icon";
import { useMemo } from "react";
import styles from "./Snackbar.module.scss";
import { tokenClassNames } from "_utility";

export const Snack = ({
  message,
  cancelButtonText,
  id = "",
  type,
  icon,
  ariaLabel,
  onDismiss,
  palette = "default",
}: SnackOptions) => {
  const iconProps = useMemo((): typeof icon => {
    switch (type) {
      case "error":
        return { name: "status-error", solid: true };
      case "success":
        return { name: "status-success", solid: true };
      default: {
        return icon;
      }
    }
  }, [type, icon]);

  return (
    <div
      className={tokenClassNames(styles, "snackbar")}
      aria-busy={type === "loading"}
      aria-label={ariaLabel}
      role="alert"
    >
      <div className={styles["snackbar-message-wrapper"]}>
        {type === "loading" ? (
          <Spinner
            className={styles["snackbar-icon-loading"]}
            palette={palette}
          />
        ) : (
          !!iconProps?.name && (
            <Icon
              {...iconProps}
              testID={`${iconProps.name || "has"}-icon`}
              className={classNames({
                [styles["snackbar-icon"]]: type === "default",
                [styles[`snackbar-icon-success`]]: type === "success",
                [styles[`snackbar-icon-error`]]: type === "error",
              })}
            />
          )
        )}
        <Paragraph>{message}</Paragraph>
        {type === "loading" && (
          <Button
            onClick={() => {
              onDismiss?.(id);
            }}
            prominence="secondary"
            size="sm"
          >
            {cancelButtonText || "Annuleren"}
          </Button>
        )}
      </div>
    </div>
  );
};
