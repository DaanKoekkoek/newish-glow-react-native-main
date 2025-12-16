import type React from "react";

import type {
  glowGradientVariants,
  gradientVariants,
} from "./GlowGradient.constants";
import { OdidoPalette } from "_internals/Color";

type PreserveAspectRatioType = "default" | "meet" | "none";

export type GlowGradientDefaultBrightness = "dark" | "light";

export type GlowGradientRenderAs = "static" | "animated";

export type GlowGradientZoom = boolean;

export type GradientStop = {
  offset?: number | string;
  stopColor: string;
  stopOpacity?: number;
};

export type GradientSvgProps = {
  linearGradientProps?: LinearGradientProps;
  radialGradientsProps?: RadialGradientProps[];
  preserveAspectRatio?: PreserveAspectRatioType;
  transform?: string;
  zoom?: GlowGradientZoom;
};

export type LinearGradientProps = {
  id: string;
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
  stops: GradientStop[];
  gradientTransform?: string;
  gradientUnits: "userSpaceOnUse" | "objectBoundingBox";
  zoom?: GlowGradientZoom;
};

export type RadialGradientProps = {
  id: string;
  cx: number | string;
  cy: number | string;
  r: number | string;
  gradientTransform: string;
  stops: GradientStop[];
  gradientUnits?: string;
  zoom?: GlowGradientZoom;
};

export type GlowGradientProps = {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  zIndex: number;
  palette?: OdidoPalette;
  type?: GradientTypes;
  style?: React.CSSProperties;
  mask?: boolean;
  className?: string;
  enableHover?: boolean;
  preserveAspectRatio?: PreserveAspectRatioType;
  zoom?: GlowGradientZoom;
};

export type BaseSvgProps = {
  children: React.ReactNode;
  preserveAspectRatio?: PreserveAspectRatioType;
};

export type GradientTypes = (typeof gradientVariants)[number];

export type GlowGradientTypes = (typeof glowGradientVariants)[number];

export type GradientConfiguration = {
  [key in GradientTypes]?: {
    linearGradientProps?: LinearGradientProps;
    radialGradientProps?: RadialGradientProps[];
  };
};
