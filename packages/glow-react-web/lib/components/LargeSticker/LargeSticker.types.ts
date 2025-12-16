import type { DefaultListProps, PriceProps } from "components/index";
import { OdidoPalette } from "_internals/Color";

/**
 * Props for the Large Sticker item.
 * @type LargeStickerProps
 * @property {LargeStickerType} [type] - Type of Large Sticker.
 * @property {LargeStickerVariant} [variant='default'] - Sets a color on the Background.
 * @property {GlowGradientTypes} [glow='Glow1'] - Sets the gradient type when `variant` is set to `emphasised`.
 * @property {Palette} [palette] - Palette color (currently only available for Odido).
 * @property {React.ReactElement} [price] - Accepts a `<LargeSticker.Price />`, but overrules tokens.
 * @property {React.ReactElement} [list] - Accepts a `<LargeSticker.List />` and `<LargeSticker.ListItem />` as children but overrules tokens.
 * @property {String} [description] - Description displayed in sticket.
 */

/**
 * Represents the color of the Large Sticker
 * @type {"default" | "emphasised" }
 */
export type LargeStickerVariant = "default" | "emphasised";

/**
 * Represents the type of the Large Sticker
 * @type {"default" | "usp" }
 */
export type LargeStickerType = "default" | "usp";

export interface CommonLargeStickerProps {
  variant?: LargeStickerVariant;
  palette?: OdidoPalette;
  type?: LargeStickerType;
  price?: React.ReactElement<PriceProps>;
  list?: React.ReactElement<DefaultListProps>;
  className?: string;
  testID?: string;
}

export type LargeStickerProps =
  | (CommonLargeStickerProps & { type: "default"; description: string })
  | (CommonLargeStickerProps & {
      type: "usp";

      /**
       * Additional className for styling the font icon.
       *
       * @property {string} [className]
       */
      className?: string;
    });
