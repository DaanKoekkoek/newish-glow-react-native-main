import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/ThemeProvider";
import { GlowGradient } from "foundations/GlowGradient";
import { Strong } from "foundations/Strong";
import React, { useEffect, useState } from "react";
import type { GestureResponderEvent } from "react-native";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { useStyles } from "react-native-unistyles";

import { toggleStyles } from "./Toggle.styles";
import type { ToggleProps, ToggleBaseProps } from "./Toggle.types";
import { useToggleAnimation } from "./hooks";

export const Toggle = ({
  ariaLabel,
  onPress,
  isSelected = false,
  isHovered = false,
  size = "default",
  inactive = false,
  label = false,
  labelText = "Aan/Uit",
  testID = "toggle",
}: ToggleProps): JSX.Element => {
  const [internalIsSelected, setInternalIsSelected] = useState(isSelected);
  const [internalIsHovered, setInternalIsHovered] = useState(isHovered);

  const { styles } = useStyles(toggleStyles);
  const toggleTestID = mergeTestIds(testID, "toggle");

  // Only update internal state when the prop value changes
  useEffect(() => {
    setInternalIsSelected(isSelected);
  }, [isSelected]);

  // Update internal hover state only if it changes externally
  useEffect(() => {
    setInternalIsHovered(isHovered);
  }, [isHovered]);

  const handleOnPress = (event: GestureResponderEvent) => {
    if (!inactive) {
      const newSelection = !internalIsSelected;
      setInternalIsSelected(newSelection);
      onPress(newSelection, event);
    }
  };

  const config = {
    isSelected: internalIsSelected,
    isHovered: internalIsHovered,
    onPress,
    ariaLabel,
    labelText,
    inactive,
    size,
    testID,
    label,
  };

  return (
    <View testID={toggleTestID} style={styles.wrapper}>
      {inactive ? (
        <View style={styles.container}>
          <ToggleBase {...config} />
        </View>
      ) : (
        <Pressable
          style={styles.container}
          onPress={handleOnPress}
          onHoverIn={() => setInternalIsHovered(true)}
          onHoverOut={() => setInternalIsHovered(false)}
          role="switch"
          aria-checked={internalIsSelected}
          aria-label={ariaLabel}
        >
          <ToggleBase {...config} />
        </Pressable>
      )}
    </View>
  );
};

const ToggleBase = ({
  size,
  isSelected,
  isHovered,
  inactive,
  label,
  labelText,
}: ToggleBaseProps) => {
  const { brand } = useThemeProviderContext();

  const {
    gradientHoverAnimation,
    positionAnimation,
    labelOffAnimation,
    labelOnAnimation,
  } = useToggleAnimation(size, isSelected, isHovered, inactive);

  const { styles } = useStyles(toggleStyles, {
    size: size === "default" ? undefined : size,
    // @ts-ignore - inactive prop is valid but not in the type definition
    inactive,
  });

  const LabelOn = labelText.split("/")[0];
  const LabelOff = labelText.split("/")[1];

  return (
    <View
      style={[
        styles.toggle,
        styles.toggleBackground(isSelected, isHovered, inactive),
      ]}
    >
      {!!isSelected && !inactive && brand === "odido" && (
        <View style={styles.gradientPosition}>
          <GlowGradient
            type="Glow4"
            style={styles.gradientSize}
            animatedStyle={gradientHoverAnimation}
            zIndex={-1}
          />
        </View>
      )}
      <Animated.View
        style={[
          styles.knob,
          styles.knobBackground(isSelected, isHovered, inactive),
          positionAnimation,
        ]}
      />
      {size === "xl" && label && (
        <>
          <Animated.View
            style={[styles.toggleText, styles.marginRight, labelOffAnimation]}
          >
            <Strong size="sm" style={styles.toggleTextOff}>
              {LabelOff}
            </Strong>
          </Animated.View>
          <Animated.View style={[styles.toggleText, labelOnAnimation]}>
            <Strong size="sm" style={styles.toggleTextOn}>
              {LabelOn}
            </Strong>
          </Animated.View>
        </>
      )}
    </View>
  );
};
