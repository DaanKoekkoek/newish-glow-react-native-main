import { ModalEvent } from "components/Modal/Modal.types.ts";
import { ActionButtonIcon } from "components/ActionButton";

import styles from "./Modal.module.scss";

interface ModalCloseButtonProps {
  dismissButtonLabel?: string;
  onClose: (event: ModalEvent) => void;
}

export const ModalCloseButton = ({
  onClose,
  dismissButtonLabel = "Sluiten",
}: ModalCloseButtonProps) => {
  return (
    <ActionButtonIcon
      className={styles["modal-close-button"]}
      testID="modal-close-icon"
      size="default"
      ariaLabel={dismissButtonLabel}
      onClick={onClose}
      icon="close"
    />
  );
};
