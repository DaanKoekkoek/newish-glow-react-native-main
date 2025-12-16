import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet(
  ({
    themes: {
      semantics: {
        color: { text },
      },
      components: {
        foundations: {
          typography: { textStyles },
        },
        overlay: {
          tooltip: { v1: tooltip },
        },
      },
    },
  }) => ({
    wrapper: {},
    tooltip: {
      position: "absolute",
      zIndex: 999,
      backgroundColor: tooltip.color.background.default,
      borderRadius: tooltip.radius.default,
      paddingHorizontal: tooltip.padding.horizontal,
      paddingVertical: tooltip.padding.vertical,
      marginBottom: tooltip.padding.whiteSpace.bottom,
      marginTop: tooltip.padding.whiteSpace.top,
      ...Platform.select({
        default: {},
        native: { width: tooltip.size.maxWidth.mobile },
      }),
      variants: {
        tipPosition: {
          default: {
            borderBottomRightRadius: tooltip.radius.none,
            right: "0%",
            bottom: "100%",
            transformOrigin: "bottom right",
          },
          topLeft: {
            borderBottomRightRadius: tooltip.radius.none,
            right: "0%",
            bottom: "100%",
            transformOrigin: "bottom right",
          },
          topRight: {
            borderBottomLeftRadius: tooltip.radius.none,
            left: "0%",
            bottom: "100%",
            transformOrigin: "bottom left",
          },
          bottomRight: {
            borderTopLeftRadius: tooltip.radius.none,
            top: "100%",
            left: "0%",
            transformOrigin: "top left",
          },
          bottomLeft: {
            borderTopRightRadius: tooltip.radius.none,
            top: "100%",
            right: "0%",
            transformOrigin: "top right",
          },
        },
        brand: {
          odido: {},
          switch: {},
          simpel: {
            marginVertical: tooltip.size.tip.height,
            marginLeft: -tooltip.size.tip.width * 2,
          },
        },
      },
    },
    container: {
      gap: tooltip.gap.horizontal.default,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tip: {
      position: "absolute",
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderTopWidth: tooltip.size.tip.height,
      borderRightWidth: tooltip.size.tip.height,
      borderBottomWidth: 0,
      borderLeftWidth: tooltip.size.tip.height,
      borderTopColor: tooltip.color.background.default,
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
      height: tooltip.size.tip.height,
      width: tooltip.size.tip.width,
      variants: {
        brand: {
          odido: {
            display: "none",
          },
          simpel: {},
          ben: {},
        },
        tipPosition: {
          default: {
            top: -tooltip.size.tip.height,
            left: 0,
          },
          topLeft: {},
          topRight: {
            top: -tooltip.size.tip.height,
            left: 0,
          },
          bottomLeft: {
            transform: [{ rotate: "180deg" }],
            top: "100%",
          },
          bottomRight: {
            transform: [{ rotate: "180deg" }],
            top: "100%",
          },
        },
      },
    },
    text: {
      maxWidth: tooltip.size.maxWidth,
      color: tooltip.color.text.default,
      fontSize: textStyles.v1.paragraph.fontSize.sm,
      lineHeight: textStyles.v1.paragraph.lineHeight.sm,
      letterSpacing: textStyles.v1.paragraph.letterSpacing.sm,
      ...Platform.select({
        web: {
          textWrap: "nowrap",
        },
        native: {
          width: tooltip.size.maxWidth.mobile - tooltip.padding.horizontal * 4,
        },
      }),
    },
    textWidth: {
      width: tooltip.size.maxWidth,
      textWrap: "wrap",
    },
    icon: {
      display: "flex",
      alignSelf: "flex-start",
      color: tooltip.color.icon.default,
      width: tooltip.size.icon.default,
      height: tooltip.size.icon.default,
      fontSize: tooltip.size.icon.default,
    },
    triggerIcon: {
      color: text.default,
    },
  }),
);
