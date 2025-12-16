import { PinProps } from "./Pin.types";
import styles from "./Pin.module.scss";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { Spinner } from "components/Spinner";
import { Icon } from "foundations/Icon";

export function PinMessage({
  errorMessage,
  loadingMessage,
  successMessage,
  state,
}: Pick<
  PinProps,
  "errorMessage" | "loadingMessage" | "successMessage" | "state"
>) {
  if (state === "error" && errorMessage) {
    return (
      <div
        className={classNames(
          styles["pincode-message"],
          styles["pincode-message--error"],
        )}
      >
        <Icon
          className={styles["pin-message-media"]}
          name="status-alert"
          size="sm"
        />
        <Paragraph>{errorMessage}</Paragraph>
      </div>
    );
  }
  if (state === "loading" && loadingMessage) {
    return (
      <div
        className={classNames(
          styles["pincode-message"],
          styles["pincode-message--loading"],
        )}
      >
        <Spinner
          className={classNames(
            styles["pin-message-spinner"],
            styles["pin-message-media"],
          )}
          size="sm"
        />
        <Paragraph>{loadingMessage}</Paragraph>
      </div>
    );
  }
  if (state === "success" && successMessage) {
    return (
      <div
        className={classNames(
          styles["pincode-message"],
          styles["pincode-message--success"],
        )}
      >
        <Icon
          className={styles["pin-message-media"]}
          name="status-success"
          size="sm"
        />
        <Paragraph>{successMessage}</Paragraph>
      </div>
    );
  }
  return null;
}
