import { OdidoPalette } from "_internals/Color";

type Range<
  N extends number,
  Result extends number[] = [],
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

type Percentage = Range<101>;

/**
 * Props for the ProgressBar.
 * @interface ProgressBarProps
 * @property {number} progress - The value of the progress
 * @property {Palette} [palette] - colour palette for the Progresss bar component
 */
export interface ProgressBarProps {
  progress: Percentage;
  palette?: OdidoPalette;
  children?: React.ReactNode;
}

/**
 * Props for the ProgressBarStep.
 * @interface ProgressBarStepProps
 * @property {string} title - The title of the step
 * @property {boolean} [active] - Whether the step is active
 * @property {string} [testID] - testID
 */
export interface ProgressBarStepProps {
  title: string;
  active?: boolean;
  testID?: string;
}
