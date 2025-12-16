import { OdidoPalette } from "_internals/Color/Palette";
import React from "react";

/**
 * Represents the style of DefaultSticker.
 * @type {"default" | "image" }
 */
export type DefaultStickerType = "default" | "image";

/**
 * Represents the style of DefaultSticker.
 * @type {"default" | "emphasised"}
 */
export type DefaultStickerVariant = "default" | "emphasised";

/**
 * Props interface for the DefaultSticker component.
 *
 * @interface DefaultStickerProps
 * @property {string} [text] - Optional text to display in the sticker.
 * @property {React.ReactNode} [image] - Optional image element to show in the sticker.
 * @property {DefaultStickerType} [type] - Optional type of the sticker which determines its appearance.
 * @property {DefaultStickerVariant} [variant] - Optional variant style to apply to the sticker.
 * @property {OdidoPalette} [palette] - Optional color palette to use for the sticker.
 * @property {string} [testID] - Optional test identifier for testing purposes.
 */
export type DefaultStickerProps = {
  text?: string;
  image?: React.ReactNode;
  type?: DefaultStickerType;
  variant?: DefaultStickerVariant;
  palette?: OdidoPalette;
  testID?: string;
};
