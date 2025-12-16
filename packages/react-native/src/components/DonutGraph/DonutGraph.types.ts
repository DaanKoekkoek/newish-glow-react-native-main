import type { CommonPalette } from "_theming/tokenLoader";

/**
 * Props for the Donut Graph item.
 * @type DonutGraphProps
 * @property {DonutGraphSize} [size='default'] - Sets a size of Donut graph.
 * @property {String} [value] - Value displayed in graph.
 * @property {String} [label] - Label displayed in graph.
 * @property {Palette} [palette] - Palette color.
 * @property {Number} [percentage] - Current percentage of graph.
 */

/**
 * Represents the size of the Donut Graph
 * @type {"default" | "lg" }
 */
export type DonutGraphSize = "default" | "lg";

type Range<
  N extends number,
  Result extends number[] = [],
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

type Percentage = Range<101>;

export interface DonutGraphProps {
  size?: DonutGraphSize;
  label: string;
  value: string;
  palette?: CommonPalette;
  percentage: Percentage;
}
