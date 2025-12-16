import { type BreakpointKeys, resolveThemePrimitives } from "_theming/index";
import { Platform } from "react-native";
import type { UnistylesValues } from "react-native-unistyles";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type {
  ModalFooterStyle,
  ModalPosition,
  ModalWidth,
  ModalCustomHeaderProps,
} from "./Modal.types";

const versionModal = "v1";
const versionSubscriptionHero = "v1";

export const modalStyles = createStyleSheet(
  ({
    themes: {
      components: {
        overlay,
        overlay: {
          modal: { [versionModal]: modal },
        },
        hero: {
          subscriptionHero: { [versionSubscriptionHero]: subscriptionHero },
        },
      },
    },
  }) => ({
    overlay: {
      flex: 1,
      alignItems: "center",
    },
    backdropLayer: {
      zIndex: 8,
    },
    backdrop: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      variants: {
        backdrop: {
          default: {
            backgroundColor: overlay.color.backdrop.default,
          },
          subtle: {
            backgroundColor: overlay.color.backdrop.subtle,
          },
        },
      },
    },
    backdropHeight: (calculatedHeight: number) => {
      return {
        minHeight: calculatedHeight,
      };
    },
    customHeader: {
      flex: 1,
      height: "100%",
    },
    customHeaderChild: {
      alignSelf: "center",
      height: "100%",
      maxWidth: "100%",
      variants: {
        fixedWidth: {
          true: {
            width: "auto",
          },
          false: {
            width: "100%",
          },
        },
      },
    },
    customHeaderBackground: (palette: ModalCustomHeaderProps["palette"]) => {
      return resolveThemePrimitives({
        // TODO: Replace this token with a modal-specific token
        value: subscriptionHero.color.background.default,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette,
      });
    },
    customHeaderHorizontalPadding: {
      paddingHorizontal: modal.padding.header.horizontal,
    },
    customHeaderVerticalPadding: {
      paddingVertical: modal.padding.header.vertical,
    },
    dialogLayer: {
      zIndex: 9,
    },
    dialogBody: {
      rowGap: modal.gap.body.vertical,
    },
    dialogHeader: {
      paddingHorizontal: modal.padding.body.horizontal,
      paddingTop: modal.padding.body.top,
    },
    dialogHeaderBackground: {
      overflow: "hidden",
    },
    dialogHeaderRatio: {
      variants: {
        ratio: {
          "1/1": {
            aspectRatio: 1 / 1,
          },
          "2/1": {
            aspectRatio: 2 / 1,
          },
          "3/1": {
            aspectRatio: 3 / 1,
          },
          "3/4": {
            aspectRatio: 3 / 4,
          },
          "4/3": {
            aspectRatio: 4 / 3,
          },
          "16/9": {
            aspectRatio: 16 / 9,
          },
          "9/16": {
            aspectRatio: 9 / 16,
          },
        },
      },
    },
    dialogHeaderRightOffset: (breakpoint: BreakpointKeys) => {
      return {
        paddingRight:
          modal.padding.body.horizontal[breakpoint] +
          overlay.padding.title.right[breakpoint],
      };
    },
    dialogOffset: (position?: ModalPosition) => {
      if (!position) return {};

      if (position === "right") {
        return {
          marginLeft: modal.padding.right.left,
        };
      }

      return {
        marginHorizontal: modal.padding[position].horizontal,
      };
    },
    dialogPaddingOffset: (position?: ModalPosition) => {
      if (!position) return {};

      if (position === "right") {
        return {
          marginLeft: modal.padding.right.left,
        };
      }
      return {
        marginHorizontal: modal.padding[position].horizontal,
      };
    },
    dialogVerticalOffset: {
      ...Platform.select({
        web: {
          marginVertical: modal.padding.default.vertical,
        },
        default: {
          paddingVertical: modal.padding.default.vertical,
        },
      }),
    },
    dialogContainer: {
      overflow: "hidden",
      backgroundColor: overlay.color.background.footer.default,
      padding: 0,
      variants: {
        wrapToContent: {
          false: {
            position: "absolute",
          },
        },
      },
    },
    dialogContent: {
      paddingHorizontal: modal.padding.body.horizontal,
      paddingBottom: modal.padding.body.bottom.default,
    },
    dialogBottomOffset: (footerHeight: number, breakpoint: BreakpointKeys) => {
      return {
        paddingBottom:
          footerHeight +
          modal.padding.body.bottom.default[breakpoint] -
          overlay.padding.footer.vertical[breakpoint],
      };
    },
    dialogCloseButton: {
      position: "absolute",
      top: overlay.padding.closeButton.top,
      right: overlay.padding.closeButton.right,
    },
    dialogMaxWidth: (width: ModalWidth) => {
      return {
        width: "100%",
        maxWidth: modal.size.maxWidth[width],
      };
    },
    dialogPositionDefault: (
      footer: ModalFooterStyle,
      wrapToContent: boolean,
    ) => {
      const baseStyle: UnistylesValues = {
        borderRadius: modal.radius.default,
      };
      if (footer !== "none") {
        baseStyle.marginVertical = "auto";

        if (wrapToContent) {
          baseStyle.maxHeight = 0;
        } else {
          baseStyle.top = modal.padding.default.vertical;
          baseStyle.bottom = modal.padding.default.vertical;
        }
      } else {
        baseStyle.position = "relative";
      }

      return baseStyle;
    },
    dialogPositionBottom: (
      screenHeight: number,
      breakpoint: BreakpointKeys,
    ) => {
      return {
        bottom: 0,
        borderTopLeftRadius: modal.radius.bottom,
        borderTopRightRadius: modal.radius.bottom,
        maxHeight: screenHeight - modal.padding.bottom.top[breakpoint],
        marginTop: modal.padding.bottom.top,
      };
    },
    dialogPositionRight: {
      right: modal.padding.right.right,
      top: 0,
      bottom: 0,
      maxHeight: "100%",
    },
    scrollViewMaxWidth: (width: ModalWidth, breakpoint: BreakpointKeys) => {
      return {
        width: "100%",
        maxWidth:
          modal.size.maxWidth[width][breakpoint] +
          modal.padding.default.horizontal[breakpoint] * 2,
      };
    },
    scrollViewPosition: {
      flexGrow: 0,
      marginVertical: "auto",
      ...Platform.select({
        web: {
          pointerEvents: "box-none",
        },
      }),
    },
    footer: {
      paddingHorizontal: overlay.padding.footer.horizontal,
    },
    footerContainer: {
      paddingVertical: overlay.padding.footer.vertical,
    },
    footerContent: {
      rowGap: overlay.gap.footer.vertical,
    },
    footerGradient: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    footerDivider: {
      marginTop: "auto",
      backgroundColor: overlay.color.background.footer.default,
    },
    footerButtonContainer: {
      width: "100%",
      alignItems: "stretch",
      flexDirection: {
        mobileSmall: "column",
        tablet: "row",
      },
      gap: overlay.gap.footer["2Buttons"].horizontal,
      ...Platform.select({
        web: {
          flexWrap: "wrap",
        },
      }),
      variants: {
        width: {
          default: {
            justifyContent: "flex-start",
          },
          narrow: {
            justifyContent: "space-between",
          },
        },
      },
    },
    footerButton: {
      alignSelf: "stretch",
      variants: {
        width: {
          default: {
            ...Platform.select({
              web: {
                flex: 1,
              },
            }),
          },
          wide: {},
        },
      },
    },
  }),
);
