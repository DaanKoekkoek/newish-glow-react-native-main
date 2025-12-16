import React, { useCallback, useRef } from "react";

import { ModalProps, ModalHandle, ModalEvent } from "./Modal.types";

import { ModalHeader } from "./ModalHeader.tsx";
import { ModalContent } from "./ModalContent.tsx";
import { ModalFooter } from "./ModalFooter.tsx";
import { ModalOverlay } from "./ModalOverlay.tsx";
import styles from "components/Modal/Modal.module.scss";

interface IModalComponent
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<ModalHandle>
  > {}

const defaultModalHandle = {
  triggerModalOpen: () => void 0,
  triggerModalClose: () => void 0,
};

const ModalComponent = React.forwardRef(function ModalComponent(
  {
    closable = true,
    trigger,
    onClose = () => {},
    onOpen = () => {},
    ...props
  }: ModalProps,
  ref: React.Ref<ModalHandle>,
) {
  const overlayRef = useRef<ModalHandle>(defaultModalHandle);

  React.useImperativeHandle(ref, () => ({
    triggerModalOpen: (event) => overlayRef.current.triggerModalOpen(event),
    triggerModalClose: (event) => overlayRef.current.triggerModalClose(event),
  }));

  const handleOnClose = useCallback((event: ModalEvent) => {
    overlayRef.current.triggerModalClose(event);
  }, []);

  const handleOnOpen = useCallback((event: ModalEvent) => {
    overlayRef.current.triggerModalOpen(event);
  }, []);

  return (
    <>
      {!!trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: handleOnOpen,
        })}
      <ModalOverlay
        ref={overlayRef}
        closable={closable}
        onClose={onClose}
        onOpen={onOpen}
        {...props}
      >
        <div className={styles.scrollable}>
          <ModalHeader {...props} />
          <ModalContent {...props} />
        </div>
        <ModalFooter onClose={handleOnClose} {...props} />
      </ModalOverlay>
    </>
  );
});

ModalComponent.displayName = "Modal";

const Modal = ModalComponent as IModalComponent;

export { Modal };
