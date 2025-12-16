import type { OdidoPalette } from "_theming/index";
import type { GlowGradientTypes } from "foundations/GlowGradient";
import type { ImageProps } from "foundations/Image";

export type StickerType = "default" | "image";

export type StickerVariant = "default" | "emphasised";

interface BaseStickerProps {
  variant?: StickerVariant;
  palette?: OdidoPalette;
  glow?: GlowGradientTypes;
}

export interface DefaultStickerDefaultTypeProps extends BaseStickerProps {
  type: "default";
  text: string;
  image?: never;
}

export interface DefaultStickerImageTypeProps extends BaseStickerProps {
  type: "image";
  image: ImageProps;
  text?: never;
}

export type DefaultStickerProps =
  | DefaultStickerDefaultTypeProps
  | DefaultStickerImageTypeProps;
