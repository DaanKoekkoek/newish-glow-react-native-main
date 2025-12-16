import { resolvePaletteColor } from "_theming/resolveThemePrimitives";
import type { OdidoPalette } from "_theming/tokenLoader";
import { createStyleSheet, UnistylesRuntime } from "react-native-unistyles";

import type { StickerVariant } from "./DefaultSticker.types";

const version = "v1";

export const DefaultStickerStyles = createStyleSheet(
  ({
    themes: {
      components: {
        sticker: {
          defaultSticker: { [version]: defaultSticker },
        },
      },
    },
  }) => ({
    background: (variant: StickerVariant, paletteVariant: OdidoPalette) => {
      return {
        paddingHorizontal: defaultSticker.padding.horizontal,
        paddingVertical: defaultSticker.padding.vertical,
        flexDirection: "column",
        alignItems: "flex-start",
        minWidth: defaultSticker.size.minWidth,
        maxWidth: defaultSticker.size.maxWidth,
        gap: defaultSticker.gap.default,
        borderRadius: defaultSticker.radius.default,
        backgroundColor:
          variant === "emphasised"
            ? defaultSticker.color.background.emphasised
            : defaultSticker.color.background.default[paletteVariant],
      };
    },
    stickerText: (variant: StickerVariant, paletteVariant: OdidoPalette) => {
      if (variant === "emphasised") {
        return { color: defaultSticker.color.text.emphasised };
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
