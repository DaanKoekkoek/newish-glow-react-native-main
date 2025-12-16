import type { CommonPalette } from "_theming/tokenLoader";
import type { DonutGraphProps } from "components/DonutGraph";
import type { DottedGraphProps } from "components/DottedGraph";

export type BundleCardVariant = "default" | "runningLow" | "empty";

/**
 * Props for the Donut Graph item.
 * @type BundleCardProps
 * @property {BundleCardVariant} [variant='default'] - Sets a variant of Bundle card.
 * @property {String} [topLabel] - Value of top label
 * @property {String} [bottomLabel] - Value of bottom label
 * @property {String} [buttonLabel] - Button label.
 * @property {Number} [percentage] - Current percentage of graph.
 */

interface BundleCardBaseProps {
  variant?: BundleCardVariant;
  topLabel: string;
  bottomLabel: string;
  buttonLabel?: string;
  onPressButton: () => void;
  palette?: CommonPalette;
}

export type BundleCardProps =
  | (BundleCardBaseProps & { variant: "default"; graphProps?: DonutGraphProps })
  | (BundleCardBaseProps & {
      variant: "runningLow" | "empty";
      graphProps?: DottedGraphProps;
    });
