import type { OdidoPalette } from "../../_theming/tokenLoader";

export type SliderProps = {
  minValue: number;
  maxValue: number;
  value?: number;
  step?: number;
  palette?: OdidoPalette;
  onValueChange?: (value: number) => void;
};
