import type { BreakpointKeys } from "_theming/breakpoints";
import { Dimensions } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const AddonStyle = createStyleSheet(
  ({
    screenSizes: { grid },
    themes: {
      components: {
        assets: {
          logosAndVisuals: { addOns },
        },
      },
    },
  }) => {
    return {
      container: {
        overflow: "hidden",
        variants: {
          size: {
            xs: {
              height: addOns.size.xs,
              width: addOns.size.xs,
              borderRadius: addOns.radius.xs,
            },
            sm: {
              height: addOns.size.sm,
              width: addOns.size.sm,
              borderRadius: addOns.radius.sm,
            },
            default: {
              borderRadius: addOns.radius.default,
              width: "100%",
            },
          },
        },
      },
      svgNativeMaxHeight: (breakpoint: BreakpointKeys) => {
        return {
          maxHeight:
            Dimensions.get("window").width / 2 - grid.margin[breakpoint],
        };
      },
      borderOverlay: {
        flexBasis: "100%",
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
        height: "100%",
        variants: {
          state: {
            default: {
              borderColor: addOns.color.border.default,
              borderWidth: addOns.borderWidth.default,
            },
            inactive: {
              borderColor: addOns.color.border.inactive,
              borderWidth: addOns.borderWidth.inactive,
            },
          },
          size: {
            xs: {
              borderRadius: addOns.radius.xs,
              borderWidth: 1,
            },
            sm: {
              borderRadius: addOns.radius.sm,
            },
            default: {
              borderRadius: addOns.radius.default,
            },
          },
        },
      },
    };
  },
);
