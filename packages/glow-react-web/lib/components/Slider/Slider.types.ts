import { OdidoPalette } from "_internals/Color";

/**
 * @interface SliderProps
 * @property {string} [id] - Used as id when label is positioned outside of the component.
 * @property {number} [minValue] - The minimum value of the slider
 * @property {number} [maxValue] - The maximum value of the slider
 * @property {number} [value] - The current value of the slider
 * @property {number} [step] - The increment by which the slider increases or decreases
 * @property {OdidoPalette} [palette] - The color palette of the slider
 * @property {boolean} [legend] - Show legend of the slider
 * @property {(value: number) => void} [onValueChange] - Callback function when the value changes
 * @property {string} [className] - Optional className applied on the container.
 */
export interface SliderProps {
  id?: string;
  minValue: number;
  maxValue: number;
  value?: number;
  step?: number;
  palette?: OdidoPalette;
  onValueChange?: (value: number) => void;
  legend?: boolean;
  className?: string;
}
