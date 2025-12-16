import type { BrandName } from "components/ThemeProvider";

import type { LogosSize } from "./Logos.types";
import {
  Odido,
  OdidoLarge,
  OdidoXl,
  Ben,
  BenLarge,
  BenXl,
  Simpel,
  SimpelLarge,
  SimpelXl,
} from "./brands/index";

const brandMap = {
  odido: {
    default: Odido,
    lg: OdidoLarge,
    xl: OdidoXl,
  },
  // Switch uses the same logo as Odido for now
  switch: {
    default: Odido,
    lg: OdidoLarge,
    xl: OdidoXl,
  },
  ben: { default: Ben, lg: BenLarge, xl: BenXl },
  simpel: { default: Simpel, lg: SimpelLarge, xl: SimpelXl },
};

export const getLogos = (name: BrandName, size: LogosSize) => {
  return brandMap[name]?.[size] || null;
};
