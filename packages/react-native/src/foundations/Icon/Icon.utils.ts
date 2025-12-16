import React from "react";

import { iconSize } from "./Icon.constants";
import type { SvgIconNames } from "./Icon.types";

export const isComponentInChildren = (
  children: React.ReactNode,
  componentNames: string[],
): boolean => {
  const checkChild = (child: React.ReactNode): boolean => {
    if (React.isValidElement(child)) {
      const childType = child.type;

      const childName =
        typeof childType === "string"
          ? childType
          : (childType as any)?.displayName || (childType as any)?.name; // React component

      if (componentNames.includes(childName)) {
        return true;
      }

      if (child.props?.children) {
        return React.Children.toArray(child.props.children).some(checkChild);
      }
    }
    return false;
  };

  // Convert children to array and check each child
  return React.Children.toArray(children).some(checkChild);
};

export const transformIconName = (name: string): SvgIconNames => {
  const pascalCaseName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const transformedName = pascalCaseName.replace(
    /(\d)([a-zA-Z])/g,
    (_, num, char) => `${num}${char.toUpperCase()}`,
  );

  return `Svg${transformedName}` as SvgIconNames;
};

export const svgScaleCalculation = (
  fontSize: number,
  children?: React.ReactElement,
) => {
  let gradientScale = "1";

  if (isComponentInChildren(children, ["G", "GlowGradient"])) {
    // The scale is based on the gradient size from the design at:
    // https://www.figma.com/design/hluH1occYazz0H9tG53B9B/Glows-and-gradients?node-id=1-385&node-type=frame&t=455H9Gmav6UFsm0r-0
    // Since the gradient is significantly larger than the icon, scaling is necessary.
    // Without scaling, only a small portion of the gradient would be used as the background for the mask.
    const minGradientScale = 0.01;
    const maxGradientScale = 0.08;

    const scaleGradientRange = iconSize.xxl - iconSize.sm;
    const scaleGradientStep =
      (maxGradientScale - minGradientScale) / scaleGradientRange;

    gradientScale = (
      minGradientScale * 2 +
      scaleGradientStep * (fontSize - iconSize.sm)
    ).toFixed(2);
  }

  const pathScale = fontSize / iconSize.xxl;

  return { gradientScale, pathScale };
};
