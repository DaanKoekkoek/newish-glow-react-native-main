import type { CommonPalette } from "_theming/tokenLoader";
/**
 * Props for the Dotted Graph item.
 * @type DottedGraphProps
 * @property {DottedGraphSize} [size='default'] - Sets a size of Dotted graph.
 * @property {String} [value] - Value displayed in graph.
 * @property {String} [label] - Label displayed in graph.
 * @property {Palette} [palette] - Palette color.
 * @property {Number} [percentage] - Current percentage of graph.
 */

type Range<
  N extends number,
  Step extends number = 1,
  R extends number[] = [],
> = R["length"] extends N ? R[number] : Range<N, Step, [...R, R["length"]]>;

type VariantPercentage<T extends number> = T extends 24
  ? Range<25>
  : Range<49, 2>;

/**
 * Represents the size of the Dotted Graph
 * @type {"default" | "lg" }
 */
export type DottedGraphSize = "default" | "lg";
export interface DottedGraphProps {
  size?: DottedGraphSize;
  label?: string;
  value?: string;
  palette?: CommonPalette;
  variant?: 24 | 48;
  percentage: VariantPercentage<24> | VariantPercentage<48>;
}
