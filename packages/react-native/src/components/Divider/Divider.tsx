import { mergeTestIds } from "_utility";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { DividerProps } from "./Divider.types";

const version = "v1";

export const Divider = ({
  prominence = "default",
  variant = "default",
  inverted = false,
  testID,
}: DividerProps) => {
  const { styles } = useStyles(stylesheet, {
    prominence: prominence === "default" ? undefined : prominence,
    variant: variant === "default" ? undefined : variant,
    inverted,
  });

  const dividerTestID = mergeTestIds(testID, "divider");

  return <View testID={dividerTestID} style={styles.divider} />;
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        divider: { [version]: divider },
      },
    },
  }) => ({
    divider: {
      width: "100%",
      variants: {
        prominence: {
          default: {
            height: divider.size.height.default,
          },
          subtle: {
            height: divider.size.height.subtle,
          },
        },
        variant: {
          default: {
            backgroundColor: divider.color.background.default,
          },
          strong: {
            backgroundColor: divider.color.background.strong,
          },
        },
        inverted: {
          true: {
            backgroundColor: divider.color.background.inverted.strong,
          },
        },
      },
    },
  }),
);
