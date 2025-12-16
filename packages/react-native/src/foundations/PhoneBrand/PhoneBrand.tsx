import { useThemeProviderContext } from "components/ThemeProvider";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { PhoneBrandProps } from "./PhoneBrand.types";
import { getPhoneBrand } from "./PhoneBrand.utils";

export const PhoneBrand = ({ state, brand }: PhoneBrandProps) => {
  const { theme } = useThemeProviderContext();

  const { styles } = useStyles(stylesheet);

  const PhoneBrandComponent = getPhoneBrand(brand);
  const fillOverride = state === "inactive";

  if (!PhoneBrandComponent) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PhoneBrandComponent fillOverride={fillOverride} theme={theme} />
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        assets: {
          logosAndVisuals: { phoneBrands },
        },
      },
    },
  }) => ({
    container: {
      height: phoneBrands.size.height.default,
      flexDirection: "row",
      alignItems: "center",
    },
  }),
);

export default PhoneBrand;
