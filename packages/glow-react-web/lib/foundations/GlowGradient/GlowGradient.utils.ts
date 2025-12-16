import type { OdidoPalette } from "_internals/Color";
import { gradientConfiguration } from "./gradientConfiguration";
import { GlowGradientTypes } from "./GlowGradient.types";
import { paletteToGradientType } from "./GlowGradient.constants";

export const getGradientConfig = (
  palette: OdidoPalette,
  type?: GlowGradientTypes,
) => {
  const glow = type ? type : paletteToGradientType[palette];
  const config = gradientConfiguration[glow];

  if (!config) {
    throw new Error(`No gradient configuration found for type "${palette}"`);
  }

  return { config, glow };
};

export const getGradientTransform = (
  base: string | undefined,
  zoom?: boolean,
) => {
  if (!zoom) return base;

  const zoomTransform = "scale(1, 1.5)";

  return base ? `${base} ${zoomTransform}` : zoomTransform;
};
