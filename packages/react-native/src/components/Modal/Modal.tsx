import { usePropAcrossBreakpoints } from "_global-hooks";
import { Paragraph } from "foundations/Paragraph";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { Platform, View } from "react-native";
import type { GestureResponderEvent } from "react-native";

import { CustomHeader } from "./Modal.CustomHeader";
import { ModalOverlay } from "./Modal.Overlay";
import type { ModalProps, ModalHandle } from "./Modal.types";
import { useScrollLockWeb } from "./hooks";

export const modalDialogLayerZIndex = 9;

interface IModalComponent
  extends React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<ModalHandle>
  > {
  CustomHeader: typeof CustomHeader;
}

const ModalComponent = React.forwardRef(function ModalComponent(
  {
    closable = true,
    footer = "strong",
    position = "default",
    width = "default",
    backdrop = "default",
    dismissButtonLabel,
    trigger,
    visible = false,
    onClose = () => {},
    onOpen = () => {},
    children,
    testID,
    ...props
  }: ModalProps,
  ref: React.Ref<ModalHandle>,
) {
  const [isClient, setIsClient] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const internalPosition = usePropAcrossBreakpoints(position);
  const { lockScroll, unlockScroll } = useScrollLockWeb();

  // Only run client-side logic
  useEffect(function detectPlatform() {
    const isWebClient = typeof window !== "undefined";
    setIsClient(isWebClient);
  }, []);

  useEffect(
    function manageScrollLock() {
      if (!isClient) return;
      if (Platform.OS !== "web") return;

      visible ? lockScroll() : unlockScroll();

      return () => unlockScroll();
    },
    [isClient, lockScroll, unlockScroll, visible],
  );

  useEffect(
    function updateVisibility() {
      setOverlayVisible(visible);
    },
    [visible],
  );

  useImperativeHandle(ref, () => ({
    triggerModalOpen: handleOnOpen,
    triggerModalClose: handleOnClose,
  }));

  const handleOnClose = (event?: GestureResponderEvent) => {
    setOverlayVisible(false);
    onClose(event);
  };

  const handleOnOpen = (event?: GestureResponderEvent) => {
    setOverlayVisible(true);
    onOpen(event);
  };

  // Only render the modal if we're on the client on web
  if (!isClient && Platform.OS !== "android" && Platform.OS !== "ios") {
    return null;
  }

  return (
    <View>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onPress: handleOnOpen,
        })}
      <ModalOverlay
        footer={footer}
        position={internalPosition}
        width={width}
        backdrop={backdrop}
        closable={closable}
        onClose={handleOnClose}
        dismissButtonLabel={dismissButtonLabel}
        visible={overlayVisible}
        {...props}
      >
        {React.isValidElement(children) ? (
          children
        ) : (
          <Paragraph>{children}</Paragraph>
        )}
      </ModalOverlay>
    </View>
  );
});

ModalComponent.displayName = "Modal";

const Modal = ModalComponent as IModalComponent;

Modal.CustomHeader = CustomHeader;

export { Modal };
