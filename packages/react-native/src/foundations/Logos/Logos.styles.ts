import type { BreakpointKeys } from "_theming/breakpoints";
import { Dimensions } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

const version = "v1";

export const LogosStyle = createStyleSheet(
  ({
    screenSizes: { grid },
    themes: {
      components: {
        assets: {
          logosAndVisuals: {
            logos: { [version]: logos },
          },
        },
      },
    },
  }) => {
    return {
      container: {
        variants: {
          size: {
            default: {
              height: logos.size.height.default,
              width: logos.size.width.default,
            },
            lg: {
              height: logos.size.height.lg,
              width: logos.size.width.lg,
            },
            xl: {
              height: logos.size.height.xl,
              width: logos.size.width.xl,
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
    };
  },
);
