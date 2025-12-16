import type { ModalProps } from "./Modal.types.ts";

import styles from "./Modal.module.scss";
import classNames from "classnames";
import { Button } from "../Button";
import { Divider } from "../Divider";

interface ModalFooterProps
  extends Pick<
    ModalProps,
    | "footer"
    | "buttonLabel"
    | "dismissButtonLabel"
    | "footerChildren"
    | "children"
    | "onClose"
    | "onClick"
    | "footerTopPadding"
  > {}

export const ModalFooter = ({
  footer = "strong",
  buttonLabel,
  dismissButtonLabel = "Sluiten",
  footerChildren,
  onClose,
  onClick,
  footerTopPadding = "default",
}: ModalFooterProps) => {
  if (footer === "none") return null;

  if (!buttonLabel && !dismissButtonLabel && !footerChildren) return null;

  return (
    <footer
      className={classNames(styles.footer, {
        [styles["footer-border-subtle"]]: footer === "subtle",
      })}
    >
      {footer === "strong" && <Divider />}
      <div
        className={classNames(
          styles["footer-container"],
          styles[`footer-padding-${footerTopPadding}`],
        )}
      >
        {footerChildren}
        {(buttonLabel || dismissButtonLabel) && (
          <div className={styles["footer-buttons"]}>
            {onClose && dismissButtonLabel && (
              <Button
                testID="modal-close"
                onClick={onClose}
                prominence={buttonLabel ? "secondary" : "default"}
                className={styles["footer-button"]}
                fill={{ mobileSmall: true, tablet: false }}
              >
                {dismissButtonLabel}
              </Button>
            )}
            {buttonLabel && (
              <Button
                onClick={onClick}
                fill={{ mobileSmall: true, tablet: false }}
                className={styles["footer-button"]}
              >
                {buttonLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </footer>
  );
};
