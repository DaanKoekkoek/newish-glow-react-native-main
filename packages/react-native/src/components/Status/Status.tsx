import { mergeTestIds } from "_utility";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { StatusProps } from "./Status.types";

export const Status = ({ type, statusText, testID }: StatusProps) => {
  const { styles } = useStyles(stylesheet, {
    type,
  });

  const statusTestID = mergeTestIds(testID, "status");

  return (
    <View testID={statusTestID} style={styles.container}>
      <View style={styles.statusIndicator} />
      <Paragraph size="sm">{statusText}</Paragraph>
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        status: { v1: status },
      },
    },
  }) => ({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: status.gap.horizontal.default,
    },
    statusIndicator: {
      borderRadius: status.radius.indicator.default,
      width: status.size.indicator.width.default,
      variants: {
        type: {
          success: {
            backgroundColor: status.color.indicator.success,
            height: status.size.indicator.height.success,
          },
          warning: {
            backgroundColor: status.color.indicator.warning,
            height: status.size.indicator.height.warning,
          },
          error: {
            backgroundColor: status.color.indicator.error,
            height: status.size.indicator.height.error,
          },
        },
      },
    },
  }),
);
