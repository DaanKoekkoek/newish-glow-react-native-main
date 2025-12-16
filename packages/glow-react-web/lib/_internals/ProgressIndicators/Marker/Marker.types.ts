import { OdidoPalette } from "_internals/Color";
import type { StepperState } from "components/Stepper/StepperInpage";

export type MarkerState = StepperState;

export type MarkerVariant = "horizontal" | "vertical" | "inpage";

/**
 * Props for stepper step's marker indicator
 * @interface MarkerProps
 * @property {MarkerState} [state='default'] - Whether the marker indicator should be completed, active or inactive.
 * @property {number} [index] - The current active step.
 * @property {MarkerVariant} [variant] - Variant of marker.
 * @property {OdidoPalette} [palette="default"] - Palette color of the Marker.
 */
export type MarkerProps = {
  state?: MarkerState;
  index?: number;
  variant?: MarkerVariant;
  palette?: OdidoPalette;
};
