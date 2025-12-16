import { glyphmap } from "@odido-portals/glow-icon/fonts";
import React from "react";
import { Text } from "react-native";

import { iconSize } from "./Icon.constants";
import type { IconProps } from "./Icon.types";

export const Icon = ({
  name,
  size = "default",
  style,
  testID,
  solid = false,
  brand = "odido", // TODO: connect brand value to the unistyles?
  allowFontScaling = true,
  autoWidth = false,
}: IconProps) => {
  const fontSize = iconSize[size];
  const lineHeight = fontSize;
  const widthSize = autoWidth ? "auto" : fontSize;

  const icon = glyphmap[name as keyof typeof glyphmap];

  if (!icon) {
    console.warn(`Font icon "${name}" not found in glyphmap`);
    return null;
  }

  // Switch uses the same font icon as Odido
  if (brand === "switch") {
    brand = "odido";
  }

  const fontFamily = `Icons_${solid ? "Solid" : "Outline"}_${size.toUpperCase()}_${brand}`;
  //const color = "inherit"; // TODO: Add this back when we move on to Expo 51

  return (
    <Text
      style={[{ fontFamily, fontSize, width: widthSize, lineHeight }, style]}
      testID={testID}
      allowFontScaling={allowFontScaling}
    >
      {String.fromCodePoint(icon)}
    </Text>
  );
};
