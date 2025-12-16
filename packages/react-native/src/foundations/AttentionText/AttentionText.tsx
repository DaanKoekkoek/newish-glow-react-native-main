import { ensureExhaustive, mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import React from "react";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { AttentionTextStyles } from "./AttentionText.styles";
import type {
  AttentionTextProps,
  AttentionTextSize,
} from "./AttentionText.types";
import { Paragraph } from "../Paragraph";

export const AttentionText = ({
  children,
  size = "default",
  icon,
  variant = "success",
  testID,
}: AttentionTextProps) => {
  const { styles } = useStyles(AttentionTextStyles, {
    variant,
    size: size === "default" ? null! : size,
  });
  const { brand } = useThemeProviderContext();

  const attentionContainerTestID = mergeTestIds(testID, "attention-container");
  const attentionIconTestID = mergeTestIds(testID, "attention-text-icon");

  const getIconSize = (size: AttentionTextSize) => {
    switch (size) {
      case "sm":
        return "sm";
      case "default":
        return "default";
      default:
        return ensureExhaustive(size);
    }
  };

  const AttentionText = (
    <View style={styles.container} testID={attentionContainerTestID}>
      {icon && (
        <Icon
          brand={brand !== "simpel" ? brand : undefined}
          style={styles.icon}
          testID={attentionIconTestID}
          name={icon}
          size={getIconSize(size)}
        />
      )}
      <Paragraph size={size} style={styles.message} key="attention-text-0">
        {children}
      </Paragraph>
    </View>
  );

  return AttentionText;
};
