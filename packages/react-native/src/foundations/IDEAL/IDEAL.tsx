import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { IDEALIcon } from "./IDEALIcon";

export const IDEAL = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <IDEALIcon />
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        assets: {
          logosAndVisuals: { paymentProvider: pay },
        },
      },
    },
  }) => ({
    container: {
      width: pay.v1.size.width.default,
      height: pay.v1.size.height.default,
    },
  }),
);
