import * as benIconFont from "@odido-portals/glow-icon/fonts/ben";
import * as odidoIconFont from "@odido-portals/glow-icon/fonts/odido";
import { benFonts } from "_theming/brands/ben/fonts";
import { odidoFonts } from "_theming/brands/odido/fonts";
import { simpelFonts } from "_theming/brands/simpel/fonts";
import { switchFonts } from "_theming/brands/switch/fonts";

import type { BrandFonts } from "../ThemeProvider.types";

export const BRAND_FONTS: BrandFonts = {
  odido: odidoFonts,
  simpel: simpelFonts,
  ben: benFonts,
  switch: switchFonts,
};

export const BRAND_ICONS = {
  odido: odidoIconFont,
  simpel: {}, // TODO: Add icons when available
  ben: benIconFont,
  switch: odidoIconFont,
};
