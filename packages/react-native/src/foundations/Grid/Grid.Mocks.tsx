import { Box } from "components/Box";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Paragraph } from "../Paragraph";

const version = "v1";

export const MockCard = ({
  direction = "vertical",
}: {
  direction?: "horizontal" | "vertical";
}) => {
  const { styles } = useStyles(styleSheet, {
    direction,
  });

  return (
    <Box size="sm" prominence="color" style={styles.card}>
      <Paragraph>Column</Paragraph>
    </Box>
  );
};

export const styleSheet = createStyleSheet(
  ({
    themes: {
      components: {
        card: {
          addOnCard: { [version]: addOnCard },
        },
      },
    },
  }) => ({
    card: {
      flexGrow: 1,
      variants: {
        direction: {
          horizontal: {
            padding: addOnCard.padding.horizontal.default.default,
            minWidth: addOnCard.size.minWidth.horizontal,
            maxWidth: addOnCard.size.maxWidth.horizontal,
          },
          vertical: {
            padding: addOnCard.padding.vertical.default.default,
            minWidth: addOnCard.size.minWidth.vertical,
            maxWidth: addOnCard.size.maxWidth.vertical,
          },
        },
      },
    },
  }),
);
