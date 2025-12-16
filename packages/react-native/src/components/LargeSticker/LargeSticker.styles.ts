import { resolvePaletteColor } from "_theming/resolveThemePrimitives";
import type { OdidoPalette } from "_theming/tokenLoader";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type { LargeStickerVariant } from "./LargeSticker.types";

const version = "v1";

export const LargeStickerStyles = createStyleSheet(
  ({
    themes: {
      components: {
        sticker: {
          largeSticker: { [version]: largeSticker },
        },
      },
    },
  }) => ({
    background: (
      variant: LargeStickerVariant,
      paletteVariant: OdidoPalette,
    ) => {
      return {
        borderTopRightRadius: largeSticker.radius.default,
        borderBottomLeftRadius: largeSticker.radius.default,
        borderBottomRightRadius: largeSticker.radius.default,
        paddingTop: largeSticker.padding.top,
        paddingBottom: largeSticker.padding.bottom,
        paddingLeft: largeSticker.padding.left,
        paddingRight: largeSticker.padding.right,
        gap: largeSticker.gap.large,
        backgroundColor:
          variant === "emphasised"
            ? largeSticker.color.background.emphasised
            : largeSticker.color.background.default[paletteVariant],
      };
    },
    stickerText: (
      variant: LargeStickerVariant,
      paletteVariant: OdidoPalette,
    ) => {
      if (variant === "emphasised") {
        return {
          color: largeSticker.color.text.emphasised,
        };
      }

      return {
        color: resolvePaletteColor(
          paletteVariant,
          UnistylesRuntime.themeName,
          "sticker",
        ),
      };
    },
  }),
);
