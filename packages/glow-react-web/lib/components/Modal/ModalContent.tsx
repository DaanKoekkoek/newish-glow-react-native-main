import type { ModalProps } from "./Modal.types.ts";

import styles from "./Modal.module.scss";
import classNames from "classnames";

interface ModalContentProps extends Pick<ModalProps, "children" | "footer"> {}

export const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div
      className={classNames(
        styles.content,
        styles["dialog-gap"],
        styles["subtle-divider"],
      )}
    >
      {children}
    </div>
  );
};
