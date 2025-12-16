import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { ModalProps, ModalHandle, ModalEvent } from "./Modal.types";
import { useClient, useScrollLockWeb } from "./hooks";
import classNames from "classnames";
import styles from "./Modal.module.scss";
import { FocusTrap } from "_internals/Navigation";
import { ModalCloseButton } from "components/Modal/ModalCloseButton.tsx";
import { tokenClassNames } from "_utility";

interface ModalDialogContainerProps
  extends Pick<
    ModalProps,
    | "width"
    | "position"
    | "children"
    | "backdrop"
    | "footer"
    | "dismissButtonLabel"
  > {
  isOpen?: boolean;
  onClose?: (event: ModalEvent) => void;
  closeButtonSticky?: boolean;
  hideCloseIconButton?: boolean;
}

const ANIMATION_TIME = 200;

const ModalDialogContainer = ({
  position,
  width = "default",
  children,
  backdrop,
  isOpen = false,
  footer,
  onClose,
  dismissButtonLabel,
  closeButtonSticky = false,
  hideCloseIconButton = false,
}: ModalDialogContainerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogIsOpen = useRef(false);

  useEffect(() => {
    // cancel any previous timer immediately
    if (animationTimeout.current) clearTimeout(animationTimeout.current);

    if (isOpen) {
      // Avoid calling showModal twice
      if (!dialogIsOpen.current) {
        dialogRef.current?.showModal?.();
        dialogIsOpen.current = true;
      }

      animationTimeout.current = setTimeout(() => {
        dialogRef.current?.classList.add(
          styles["backdrop-opened"],
          styles.open,
        );
      }, 0);
    } else {
      // remove classes right away
      dialogRef.current?.classList.remove(
        styles["backdrop-opened"],
        styles.open,
      );

      // close the dialog
      animationTimeout.current = setTimeout(() => {
        dialogRef.current?.close?.();
        dialogIsOpen.current = false;
      }, ANIMATION_TIME);
    }

    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [isOpen]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      suppressHydrationWarning
      id="modal"
      ref={dialogRef}
      data-testid="dialog"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose?.(e);
        }
      }}
      data-open={isOpen}
      className={tokenClassNames(
        styles,
        "dialog-root",
        styles.backdrop,
        styles[`backdrop-${backdrop}`],
        { [styles.scrollable]: footer === "none" },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className={classNames(
          styles["dialog-content"],
          styles.dialog,
          styles["dialog-wrapper"],
          styles[`position-${position}`],
          styles[`width-${width}`],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && !hideCloseIconButton ? (
          <div
            className={classNames({
              [styles["scroll-container-sticky"]]: closeButtonSticky,
            })}
          >
            <ModalCloseButton
              dismissButtonLabel={dismissButtonLabel}
              onClose={onClose}
            />
          </div>
        ) : undefined}
        {children}
      </div>
    </dialog>
  );
};

interface ModalPositionContainerProps
  extends Pick<
    ModalProps,
    | "children"
    | "position"
    | "footer"
    | "width"
    | "backdrop"
    | "dismissButtonLabel"
  > {
  isOpen?: boolean;
  onClose?: (event: ModalEvent) => void;
}

const ModalPositionContainer = ({
  position = "default",
  children,
  footer,
  width,
  backdrop,
  isOpen,
  onClose,
  dismissButtonLabel,
  hideCloseIconButton,
}: ModalPositionContainerProps & { hideCloseIconButton?: boolean }) => {
  // Footer "none" implementation expects that closeIconButton becomes sticky
  if ((!footer || footer === "none") && position !== "right") {
    return (
      <div
        className={classNames(
          styles["scroll-container"],
          {
            [styles["scroll-container-bottom"]]: position === "bottom",
          },
          styles["dialog-wrapper"],
          styles[`width-${width}`],
        )}
      >
        <ModalDialogContainer
          position={position}
          width={width}
          footer={footer}
          backdrop={backdrop}
          isOpen={isOpen}
          onClose={onClose}
          dismissButtonLabel={dismissButtonLabel}
          closeButtonSticky
          hideCloseIconButton={hideCloseIconButton}
        >
          {children}
        </ModalDialogContainer>
      </div>
    );
  }

  return (
    <ModalDialogContainer
      position={position}
      width={width}
      footer={footer}
      backdrop={backdrop}
      isOpen={isOpen}
      onClose={onClose}
      dismissButtonLabel={dismissButtonLabel}
      hideCloseIconButton={hideCloseIconButton}
    >
      {children}
    </ModalDialogContainer>
  );
};

export const ModalOverlay = React.forwardRef(function ModalOverlay(
  {
    closable = true,
    backdrop = "default",
    visible = false,
    onClose = () => {},
    onOpen = () => {},
    footer,
    children,
    dismissButtonLabel,
    hideCloseIconButton,
    ...props
  }: ModalProps,
  ref: React.Ref<ModalHandle>,
) {
  const [isOpen, setIsOpen] = useState(visible);
  const [isOpenBackdrop, setIsOpenBackdrop] = useState(visible);
  useScrollLockWeb(isOpen, styles["scroll-lock"]);

  const setOpen = (isOpenVal: boolean = true) => {
    let openTimeout: ReturnType<typeof setTimeout>;
    let closeTimeout: ReturnType<typeof setTimeout>;

    if (isOpenVal) {
      setIsOpen(true);
      // Timeout required to play opening animation
      openTimeout = setTimeout(() => {
        setIsOpenBackdrop(true);
      }, 0);
    } else {
      setIsOpenBackdrop(false);
      // Timeout to allow the closing animation to play before hiding the modal
      closeTimeout = setTimeout(() => {
        setIsOpen(false);
      }, ANIMATION_TIME);
    }
    return () => {
      clearTimeout(openTimeout);
      clearTimeout(closeTimeout);
    };
  };

  const isClient = useClient();

  const handleOnClose = useCallback(
    (event: ModalEvent) => {
      setOpen(false);
      onClose(event);
    },
    [onClose],
  );

  const handleOnOpen = (event: ModalEvent) => {
    setOpen(true);
    onOpen(event);
  };

  useImperativeHandle(ref, () => ({
    triggerModalOpen: handleOnOpen,
    triggerModalClose: handleOnClose,
  }));

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  useEffect(() => {
    if (!isClient || !closable) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleOnClose(event);
      }
      event.stopPropagation();
    };

    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isClient, closable, handleOnClose]);

  return (
    <>
      {isOpen && (
        <FocusTrap active={isOpen} focus="mount" returnFocusOnDeactivate>
          <ModalPositionContainer
            footer={footer}
            backdrop={backdrop}
            onClose={closable ? handleOnClose : undefined}
            isOpen={isOpenBackdrop}
            dismissButtonLabel={dismissButtonLabel}
            hideCloseIconButton={hideCloseIconButton}
            {...props}
          >
            {children}
          </ModalPositionContainer>
        </FocusTrap>
      )}
    </>
  );
});
