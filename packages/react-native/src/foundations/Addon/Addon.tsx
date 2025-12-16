import { usePropAcrossBreakpoints } from "_global-hooks";
import type { BreakpointKeys } from "_theming/breakpoints";
import { mergeTestIds } from "_utility";
import { View, Platform } from "react-native";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { AddonStyle } from "./Addon.styles";
import type { AddonProps } from "./Addon.types";
import { getAddonIcon } from "./Addon.utils";

export const Addon = ({
  name,
  size = "default",
  state = "default",
  testID,
}: AddonProps) => {
  const addonTestID = mergeTestIds(testID, "addon");

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const sizePerBreakpoint = usePropAcrossBreakpoints(size);

  const { styles } = useStyles(AddonStyle, {
    state: state === "default" ? undefined : state,
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
            logosAndVisuals: { addOns },
          },
        },
      },
    },
  } = useStyles();

  const AddonIconComponent = getAddonIcon(name, sizePerBreakpoint[breakpoint]);

  const fillOverride = state === "inactive" ? addOns.color.fill.inactive : "";

  return (
    <View
      style={[
        styles.container,
        (Platform.OS === "android" || Platform.OS === "ios") &&
          styles.svgNativeMaxHeight(breakpoint),
      ]}
      testID={addonTestID}
    >
      {state === "inactive" && <View style={styles.borderOverlay} />}
      {AddonIconComponent ? (
        <AddonIconComponent fillOverride={fillOverride} />
      ) : null}
    </View>
  );
};
