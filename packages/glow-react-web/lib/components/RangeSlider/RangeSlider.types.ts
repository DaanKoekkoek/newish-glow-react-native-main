import type { OdidoPalette } from "_internals/Color";
import type { PriceProps } from "components/Price";
import type { SliderProps } from "components/Slider/Slider.types";
import type { BrandName } from "components/ThemeProvider";

type RangeSliderPrice = Pick<
  PriceProps,
  "beforeText" | "value" | "showCurrency"
>;

export type RangeSliderProps = Omit<SliderProps, "legend"> & {
  buttons?: boolean;
  priceRange?: RangeSliderPrice[];
  palette?: OdidoPalette;
  brand?: BrandName;
  prices?: RangeSliderPrice[];
  ariaLabel?: {
    add: string;
    subtract: string;
  };
};
