import type { OdidoPalette } from "_internals/Color";
import type { GlowGradientTypes } from "./GlowGradient.types";

export const glowGradientVariants = [
  "glow1",
  "glow2",
  "glow3",
  "glow4",
] as const;

export const gradientVariants = [...glowGradientVariants] as const;

export const paletteToGradientType: Record<OdidoPalette, GlowGradientTypes> = {
  pink: "glow1",
  orange: "glow1",
  red: "glow1",
  yellow: "glow2",
  green: "glow3",
  default: "glow4",
  blue: "glow4",
  purple: "glow4",
};
