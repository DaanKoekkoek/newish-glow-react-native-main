import type React from "react";
import type { ViewStyle, StyleProp } from "react-native";

import type {
  glowGradientVariants,
  gradientVariants,
  linearGradientVariants,
} from "./GlowGradient.constants";

export type GlowGradientDefaultBrightness = "dark" | "light";

export type GlowGradientRenderAs = "static" | "animated";

export interface GradientStop {
  offset?: number | string;
  stopColor: string;
  stopOpacity?: number;
}

export interface GradientSvgProps {
  linearGradientProps?: LinearGradientProps;
  radialGradientsProps?: RadialGradientProps[];
}

export interface LinearGradientProps {
  id: string;
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
  stops: GradientStop[];
  gradientUnits: "userSpaceOnUse" | "objectBoundingBox";
}

export interface RadialGradientProps {
  id: string;
  cx: number | string;
  cy: number | string;
  r: number | string;
  gradientTransform: string;
  stops: GradientStop[];
  gradientUnits?: string;
}

export interface GlowGradientProps {
  brightness?: GlowGradientDefaultBrightness;
  renderAs?: GlowGradientRenderAs;
  zIndex: number;
  type: GradientTypes;
  style?: StyleProp<ViewStyle>;
  animatedStyle?: StyleProp<ViewStyle>;
  mask?: boolean;
}

export interface BaseSvgProps {
  children: React.ReactNode;
}

export type GradientTypes = (typeof gradientVariants)[number];

export type GlowGradientTypes = (typeof glowGradientVariants)[number];

export type LinearGradientTypes = (typeof linearGradientVariants)[number];

export type GradientConfiguration = {
  [key in GradientTypes]?: {
    lightLinearGradientProps?: LinearGradientProps;
    lightRadialGradientProps?: RadialGradientProps[];
    darkLinearGradientProps?: LinearGradientProps;
    darkRadialGradientProps?: RadialGradientProps[];
  };
};
