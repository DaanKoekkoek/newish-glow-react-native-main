import { usePropAcrossBreakpoints } from "_global-hooks";
import type { BreakpointKeys } from "_theming/breakpoints";
import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/ThemeProvider";
import { View, Platform } from "react-native";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { LogosStyle } from "./Logos.styles";
import type { LogosProps } from "./Logos.types";
import { getLogos } from "./Logos.utils";

const version = "v1";

export const Logos = ({
  brand,
  size = "default",
  variant = "default",
  testID,
}: LogosProps) => {
  const LogosTestID = mergeTestIds(testID, "logo");
  const { brand: brandContext } = useThemeProviderContext();
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const sizePerBreakpoint = usePropAcrossBreakpoints(size);

  const { styles } = useStyles(LogosStyle, {
    size:
      sizePerBreakpoint[breakpoint] === "default"
        ? undefined
        : sizePerBreakpoint[breakpoint],
  });

  const {
    theme: {
      themes: {
        components: {
          assets: {
            logosAndVisuals: {
              logos: { [version]: logos },
            },
          },
        },
      },
    },
  } = useStyles();

  const LogosBrandComponent = getLogos(
    brand || brandContext,
    sizePerBreakpoint[breakpoint],
  );

  const fillOverride = variant === "inverted" ? logos.color.inverted : "";

  return (
    <View
      style={[
        styles.container,
        (Platform.OS === "android" || Platform.OS === "ios") &&
          styles.svgNativeMaxHeight(breakpoint),
      ]}
      testID={LogosTestID}
    >
      {variant === "inverted"}
      {LogosBrandComponent ? (
        <LogosBrandComponent fillOverride={fillOverride} />
      ) : null}
    </View>
  );
};
