import { useThemeProviderContext } from "components/ThemeProvider";
import { LinearGradient, type LinearGradientProps } from "expo-linear-gradient";
import { Strong, PhoneBrand } from "foundations/index";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { pillStyles } from "./Pill.styles";
import type { PillProps } from "./Pill.types";

export const Pill = ({
  variant = "default",
  title = "",
  brand,
  disabled,
  onChange,
  value,
  testID,
}: PillProps) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [selected, setSelected] = useState(false);

  const { brand: themeBrand } = useThemeProviderContext();

  const {
    styles,
    theme: {
      themes: {
        semantics: {
          color: { border },
        },
      },
    },
  } = useStyles(pillStyles, {
    hovered,
    disabled,
    selected,
    selectedAndDisabled: selected && disabled,
    selectedSwitch: selected && themeBrand === "switch",
    selectedAndHoveredSwitch: hovered && selected && themeBrand === "switch",
  });

  const onPress = () => {
    onChange?.(value);
    setSelected((prevSelected) => !prevSelected);
  };

  const pressableConfiguration = {
    testID,
    disabled,
    onPress,
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
  };

  const lineargradientParams: LinearGradientProps = {
    colors: hovered
      ? [
          border.selected.gradient.hover.stop_1,
          border.selected.gradient.hover.stop_2,
          border.selected.gradient.hover.stop_3,
          border.selected.gradient.hover.stop_4,
        ]
      : [
          border.selected.gradient.default.stop_1,
          border.selected.gradient.default.stop_2,
          border.selected.gradient.default.stop_3,
          border.selected.gradient.default.stop_4,
        ],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
    locations: [0, 0.3, 0.6, 0.8],
    style: styles.border,
  };

  const showGradient = selected && !disabled && themeBrand === "odido";
  const backgroundWithBorder = showGradient ? (
    <LinearGradient {...lineargradientParams}>
      <View style={styles.background} />
    </LinearGradient>
  ) : (
    <View style={styles.border}>
      <View style={styles.background} />
    </View>
  );

  const showBrand = variant === "logo" && brand;
  const pillContent = showBrand ? (
    <View style={styles.brandContainer}>
      <PhoneBrand brand={brand} state={disabled ? "inactive" : "default"} />
    </View>
  ) : (
    <Strong style={styles.label} size="default">
      {title}
    </Strong>
  );

  return (
    <Pressable {...pressableConfiguration} style={styles.container}>
      <View style={styles.content}>
        {backgroundWithBorder}
        {pillContent}
      </View>
    </Pressable>
  );
};
