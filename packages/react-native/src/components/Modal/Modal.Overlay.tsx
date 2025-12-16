import { usePrefetchImage, useWindowDimensions } from "_global-hooks";
import type { BreakpointKeys } from "_theming/index";
import { hexToRGB, mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Heading, Image, Paragraph } from "foundations/index";
import React, { createContext, useContext, useMemo, useState } from "react";
import type { ViewStyle } from "react-native";
import {
  KeyboardAvoidingView,
  Modal as NativeModal,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { ActionButtonIcon, type ActionButtonIconProps } from "../ActionButton";
import { Button } from "../Button";
import { Divider } from "../Divider";
import { Snackbar } from "../Snackbar";
import { modalStyles } from "./Modal.styles";
import type {
  ModalContextProps,
  ModalFooterContentProps,
  ModalFooterProps,
  ModalOverlayProps,
} from "./Modal.types";
import { useModalAnimation } from "./hooks";

const ModalContext = createContext<ModalContextProps>({
  breakpoint: "desktop",
});

export const useModalContext = () => useContext(ModalContext);

const ModalOverlay = ({
  hasSnackbar,
  visible,
  position,
  onClose,
  footer,
  closable,
  width,
  testID,
  ...props
}: ModalOverlayProps) => {
  const { styles } = useStyles(modalStyles);

  const config = {
    visible,
    onClose,
    footer,
    closable,
    position,
    width,
    ...props,
  };

  const modalTestID = mergeTestIds(testID, "modal");

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  return (
    <ModalContext.Provider value={{ breakpoint }}>
      <NativeModal
        testID={modalTestID}
        visible={visible}
        onRequestClose={onClose}
        transparent
        {...props}
      >
        {hasSnackbar && <Snackbar context="modal" />}
        {footer !== "none" ? (
          <>
            <ModalBackdrop {...config} />
            <ModalDialog {...config} />
          </>
        ) : position[breakpoint] === "default" ? (
          <View style={styles.overlay}>
            <ModalBackdrop {...config} />
            <ScrollView
              style={[
                styles.dialogLayer,
                styles.scrollViewPosition,
                styles.scrollViewMaxWidth(width, breakpoint) as ViewStyle,
                { pointerEvents: "auto" },
              ]}
              contentContainerStyle={[
                styles.dialogPaddingOffset(position[breakpoint]),
                styles.dialogVerticalOffset,
              ]}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              stickyHeaderIndices={closable ? [0] : [-1]}
            >
              <DialogCloseButton {...config} />
              <ModalDialog {...config} />
            </ScrollView>
          </View>
        ) : (
          <>
            <ModalBackdrop {...config} />
            <ModalDialog {...config} />
          </>
        )}
      </NativeModal>
    </ModalContext.Provider>
  );
};

const ModalBackdrop = ({
  onClose,
  closable,
  backdrop,
  visible,
  position,
  width,
}: ModalOverlayProps) => {
  const { styles } = useStyles(modalStyles, {
    backdrop: backdrop === "default" ? undefined : backdrop,
  });
  const { breakpoint } = useModalContext();
  const { height } = useWindowDimensions();
  const { backdropAnimation } = useModalAnimation(
    visible,
    width,
    breakpoint,
    position[breakpoint],
  );

  const config = {
    style: [
      styles.backdrop,
      styles.backdropLayer,
      styles.backdropHeight(height),
    ],
    testID: "backdrop",
  };

  return closable ? (
    <Pressable onPress={onClose} {...config}>
      <Animated.View style={backdropAnimation} />
    </Pressable>
  ) : (
    <View {...config}>
      <Animated.View style={backdropAnimation} />
    </View>
  );
};

const ModalDialog = ({
  visible,
  position,
  footer,
  width,
  closable,
  image,
  headerRatio,
  title,
  customHeader,
  titleSize = "lg",
  buttonLabel,
  dismissButtonLabel,
  footerChildren,
  children,
  wrapToContent = false,
  onClose,
  onPress,
}: ModalOverlayProps) => {
  const [footerHeight, setFooterHeight] = useState(0);

  const { breakpoint } = useModalContext();
  const { modalAnimation } = useModalAnimation(
    visible,
    width,
    breakpoint,
    position[breakpoint],
  );
  const { height } = useWindowDimensions();
  const { styles } = useStyles(modalStyles, {
    ratio: headerRatio,
    wrapToContent,
  });

  const config = {
    visible,
    position,
    footer,
    width,
    closable,
    image,
    title,
    customHeader,
    titleSize,
    buttonLabel,
    dismissButtonLabel,
    footerChildren,
    children,
    onClose,
    onPress,
  };

  const showCloseButton =
    (position[breakpoint] !== "default" || footer !== "none") &&
    Platform.OS !== "web";
  const showCloseButtonWeb =
    (position[breakpoint] !== "default" || footer !== "none") &&
    Platform.OS === "web";

  const isValidImagePath = usePrefetchImage(image?.src || image?.localSrc);
  const computedStyles = useMemo(
    () =>
      [
        styles.dialogContainer,
        styles.dialogMaxWidth(width),
        position[breakpoint] === "default" &&
          styles.dialogPositionDefault(footer, wrapToContent),
        position[breakpoint] === "right" && styles.dialogPositionRight,
        position[breakpoint] === "bottom" &&
          styles.dialogPositionBottom(height, breakpoint),
        modalAnimation,
      ] as ViewStyle,
    [
      breakpoint,
      footer,
      height,
      modalAnimation,
      position,
      styles,
      width,
      wrapToContent,
    ],
  );

  return (
    <KeyboardAvoidingView
      style={[
        styles.overlay,
        styles.dialogLayer,
        footer !== "none" && styles.dialogOffset(position[breakpoint]),
      ]}
      pointerEvents="box-none"
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      <Animated.View style={computedStyles}>
        {showCloseButton && <DialogCloseButton {...config} />}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          stickyHeaderIndices={closable && Platform.OS === "web" ? [0] : [-1]}
          scrollEventThrottle={16}
          style={{ pointerEvents: "auto" }}
        >
          {showCloseButtonWeb && <DialogCloseButton {...config} />}
          <View style={styles.dialogBody}>
            <View>
              {(!!customHeader || !!image) && (
                <View
                  style={[
                    styles.dialogHeaderBackground,
                    styles.dialogHeaderRatio,
                  ]}
                >
                  {customHeader
                    ? customHeader
                    : !!image && isValidImagePath && <Image {...image} />}
                </View>
              )}
              <Heading
                size={titleSize}
                as="h3"
                style={[
                  styles.dialogHeader,
                  !image &&
                    !isValidImagePath &&
                    styles.dialogHeaderRightOffset(breakpoint),
                ]}
              >
                {title}
              </Heading>
            </View>
            <View
              style={[
                styles.dialogContent,
                footer === "subtle" &&
                  styles.dialogBottomOffset(footerHeight, breakpoint),
              ]}
            >
              <View style={styles.dialogBody}>{children}</View>
            </View>
          </View>
        </ScrollView>
        {footer !== "none" &&
          (buttonLabel || dismissButtonLabel || footerChildren) && (
            <ModalFooter
              onFooterHeight={(height) => setFooterHeight(height)}
              {...config}
            >
              {footerChildren}
            </ModalFooter>
          )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const ModalFooter = ({
  onFooterHeight,
  footer,
  ...props
}: ModalFooterProps) => {
  const { styles } = useStyles(modalStyles);
  const { brand } = useThemeProviderContext();
  const dividerProminence = brand === "switch" ? "subtle" : "default";

  const {
    theme: {
      themes: {
        components: { overlay },
      },
    },
  } = useStyles();

  const onLayout = useMemo(
    () =>
      (event: {
        nativeEvent: { layout: { width: number; height: number } };
      }) => {
        const { height } = event.nativeEvent.layout;
        onFooterHeight(height);
      },
    [onFooterHeight],
  );

  return footer === "strong" ? (
    <View style={styles.footerDivider}>
      <Divider prominence={dividerProminence} />
      <ModalFooterContent {...props} />
    </View>
  ) : (
    <View style={styles.footerGradient} onLayout={onLayout}>
      <LinearGradient
        colors={[
          hexToRGB(overlay.color.background.footer.subtle_100),
          hexToRGB(overlay.color.background.footer.subtle_0),
        ]}
        locations={[0.75, 0]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <ModalFooterContent {...props} />
      </LinearGradient>
    </View>
  );
};

const ModalFooterContent = ({
  children,
  buttonLabel,
  onPress,
  closable,
  dismissButtonLabel,
  onClose,
  width,
}: ModalFooterContentProps) => {
  const { styles } = useStyles(modalStyles, {
    width: width === "default" ? undefined : width,
  });

  return (
    <View style={[styles.footer]}>
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          {children &&
            (React.isValidElement(children) ? (
              children
            ) : (
              <Paragraph>{children}</Paragraph>
            ))}
          {(buttonLabel || dismissButtonLabel) && (
            <View style={styles.footerButtonContainer}>
              {onClose && closable && dismissButtonLabel && (
                <Button
                  testID="modal-close"
                  onPress={onClose}
                  prominence={buttonLabel ? "secondary" : "default"}
                  pressableStyle={styles.footerButton}
                  baseStyle={styles.footerButton}
                >
                  {dismissButtonLabel}
                </Button>
              )}
              {buttonLabel && (
                <Button
                  onPress={onPress}
                  pressableStyle={styles.footerButton}
                  baseStyle={styles.footerButton}
                >
                  {buttonLabel}
                </Button>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const DialogCloseButton = ({
  onClose,
  closable,
  visible,
  width,
  position,
}: ModalOverlayProps) => {
  const { brand } = useThemeProviderContext();
  const { styles } = useStyles(modalStyles);
  const { breakpoint } = useModalContext();
  const { closeButtonAnimation } = useModalAnimation(
    visible,
    width,
    breakpoint,
    position[breakpoint],
  );

  const config: ActionButtonIconProps = {
    onPress: onClose!,
    icon: "close",
  };

  const closeButtonSize =
    breakpoint === "desktop" || breakpoint === "laptop" ? "default" : "sm";

  const buttonPalette = brand === "switch" ? "neutral" : undefined;

  return closable ? (
    <Animated.View
      style={[
        styles.dialogCloseButton,
        styles.dialogLayer,
        closeButtonAnimation,
      ]}
    >
      <ActionButtonIcon
        testID="modal-close"
        size={closeButtonSize}
        palette={buttonPalette}
        {...config}
      />
    </Animated.View>
  ) : null;
};

export { ModalOverlay };
