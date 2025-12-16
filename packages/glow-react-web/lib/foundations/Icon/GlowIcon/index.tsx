import React from "react";
import { svgIconsWeb } from "@odido-portals/glow-icon/svg-icons-web";
import { GlowGradient } from "foundations/GlowGradient";
import type { IconProps } from "../Icon.types";
import type { GlowGradientProps } from "foundations/GlowGradient";
import styles from "./GlowIcon.module.scss";
import { iconSize } from "../Icon.constants";
import { transformIconName, svgScaleCalculation } from "../Icon.utils";
import { BrandName } from "components/ThemeProvider";
import { tokenClassNames } from "_utility";

export type GlowIconProps = Omit<IconProps, "style"> &
  Omit<GlowGradientProps, "mask" | "type"> & {
    maskClassName?: string;
  };

export const GlowIcon = ({
  name,
  size,
  solid,
  zIndex = 0,
  palette = "default",
  style,
  maskClassName,
  enableHover = false,
  ...gradientProps
}: GlowIconProps) => {
  return (
    <span
      className={tokenClassNames(
        styles,
        "glow-icon",
        styles[palette],
        maskClassName,
        {
          [styles["no-hover"]]: !enableHover,
        },
        style,
      )}
    >
      <MaskIcon name={name} size={size} solid={solid}>
        <GlowGradient
          {...gradientProps}
          enableHover={enableHover}
          palette={palette}
          zIndex={zIndex}
          mask
        />
      </MaskIcon>
    </span>
  );
};

type MaskIconProps = Omit<IconProps, "style"> & {
  children?: React.ReactElement;
};

const MaskIcon = React.forwardRef<
  HTMLSpanElement,
  MaskIconProps & { brand?: BrandName }
>(
  (
    {
      name,
      size = "default",
      testID,
      solid = false,
      children,
      brand = "odido",
    },
    ref,
  ) => {
    const fontSize = iconSize[size];

    // Simwallet uses the same font icon as Odido
    // probably better to do the mapping in the glow-icon repo already
    // Remove this if we have icons for Simpel as well.
    if (brand === "simpel" || brand === "sim-wallet") {
      brand = "odido";
    }
    const SvgIcons = svgIconsWeb[brand][solid ? "solid" : "outline"];

    const transformedName = transformIconName(name);
    const { pathScale, gradientScale } = svgScaleCalculation(fontSize);

    if (SvgIcons[transformedName]) {
      const SvgIconComponent = SvgIcons[transformedName];
      return (
        <span data-testid={testID} ref={ref}>
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
        </span>
      );
    }

    console.warn(
      `SVG icon "${name}" (transformed: "${String(transformedName)}") not found for size ${fontSize}`,
    );
    return null;
  },
);
