import { svgIconsNative } from "@odido-portals/glow-icon/svg-icons-native";
import React from "react";
import { View } from "react-native";

import { iconSize } from "./Icon.constants";
import type { MaskIconProps } from "./Icon.types";
import {
  transformIconName,
  svgScaleCalculation,
  isComponentInChildren,
} from "./Icon.utils";

export const MaskIcon = React.forwardRef<View, MaskIconProps>(
  (
    {
      name,
      size = "default",
      style,
      testID,
      solid = false,
      children,
      brand = "odido",
    },
    ref,
  ) => {
    const fontSize = iconSize[size];

    if (
      isComponentInChildren(children, ["G", "Rect", "Circle", "GlowGradient"])
    ) {
      // Switch uses the same font icon as Odido
      // probably better to do the mapping in the glow-icon repo already
      if (brand === "switch") {
        brand = "odido";
      }
      const SvgIcons = svgIconsNative[brand][solid ? "solid" : "outline"];

      const transformedName = transformIconName(name);
      const { pathScale, gradientScale } = svgScaleCalculation(
        fontSize,
        children,
      );

      if (SvgIcons[transformedName]) {
        const SvgIconComponent = SvgIcons[transformedName];
        return (
          <View style={style} testID={testID} ref={ref}>
            <SvgIconComponent
              testID={testID || "icon"}
              solid={solid}
              scaleX={pathScale}
              scaleY={pathScale}
              gradientScale={gradientScale}
              width={fontSize}
              height={fontSize}
            >
              {children}
            </SvgIconComponent>
          </View>
        );
      }

      console.warn(
        `SVG icon "${name}" (transformed: "${String(transformedName)}") not found for size ${fontSize}`,
      );
      return null;
    }

    return null;
  },
);
