import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { AFMIcon } from "./AFMIcon";

export const AFM = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <AFMIcon />
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        assets: {
          logosAndVisuals: { afm },
        },
      },
    },
  }) => ({
    container: {
      width: afm.v1.size.width.default,
      height: afm.v1.size.height.default,
    },
  }),
);
