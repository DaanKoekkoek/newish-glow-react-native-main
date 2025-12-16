import { Price } from "components/Price";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { PriceContextProps } from "./PriceContext.types";

export const PriceContext = ({
  priceProps,
  description,
  disclaimer,
  moreInfo,
  testID = "price-context",
}: PriceContextProps) => {
  const { styles } = useStyles(stylesheet);

  const { theme } = useThemeProviderContext();
  const isIcon = moreInfo?.type.toString().includes("Icon");

  return (
    <View style={styles.priceContext}>
      <View style={styles.priceMoreInfo}>
        <Price {...priceProps} testID={testID} />
        {moreInfo && isIcon ? (
          <Icon
            {...moreInfo.props}
            style={theme === "dark" && { color: "#ffffff" }}
          />
        ) : (
          moreInfo
        )}
      </View>
      <Paragraph size="sm" style={styles.description}>
        {description}
      </Paragraph>
      <Paragraph size="xxs" style={styles.disclaimer}>
        {disclaimer}
      </Paragraph>
    </View>
  );
};

export const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        card: {
          atoms: { priceContext },
        },
      },
    },
  }) => ({
    priceContext: {
      rowGap: priceContext.gap.horizontal,
    },
    priceMoreInfo: {
      columnGap: priceContext.gap.horizontal,
      flexDirection: "row",
      alignItems: "center",
    },
    description: {
      color: priceContext.color.text.description,
    },
    disclaimer: {
      color: priceContext.color.text.disclaimer,
    },
  }),
);
