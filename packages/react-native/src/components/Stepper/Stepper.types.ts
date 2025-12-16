import type { OdidoPalette } from "_theming/tokenLoader";
import type { LayoutChangeEvent } from "react-native";

/**
 * Represents the status of a step.
 * @type {"default" | "active" | "completed" | "inactive"}
 */

export type StepperStatus = "default" | "active" | "completed" | "inactive";

/**
 * Represents the size of the Stepper's steps.
 * @type {"default" | "small" | "large"}
 */
export type StepperSize = "default" | "small" | "large";

/**
 * Props for stepper
 * @interface StepperProps
 * @property {StepperSize} [size] - The size of the stepper's steps.
 * @property {number} [activeStep] - The current active step.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `<Stepper.Step />` as its children.
 * @property {string} [testID] - The testID of the step.
 */
export interface StepperHorizontalProps {
  size?: StepperSize;
  activeStep?: number;
  children:
    | React.ReactElement<StepperHorizontalStepProps>
    | React.ReactElement<StepperHorizontalStepProps>[];
  testID?: string;
  palette?: OdidoPalette;
}
export interface StepperVerticalProps {
  size?: StepperSize;
  activeStep?: number;
  children:
    | React.ReactElement<StepperVerticalStepProps>
    | React.ReactElement<StepperVerticalStepProps>[];
  testID?: string;
  palette?: OdidoPalette;
  collapsable?: boolean;
}
export interface StepperInpageProps {
  children:
    | React.ReactElement<StepperInpageStepProps>
    | React.ReactElement<StepperInpageStepProps>[];
  testID?: string;
  palette?: OdidoPalette;
}

/**
 * Props for stepper step's
 * @interface StepperStepProps
 * @property {string} [title] - The label of the step.
 * @property {number} [index] - The current active step.
 * @property {StepperSize} [size] - The size of the steps.
 * @property {StepperStatus} [status] - Whether the step should be `completed`, `active` or `inactive`.
 * @property {boolean} [active] - The active step.
 * @property {boolean} [activeSpacer] - The active spacer of the step.
 * @property {string} [testID] - The testID of the step.
 * @property {(event: LayoutChangeEvent) => void} [onStepLayout] - Callback for onLayout change event.
 */

export interface StepperVerticalStepProps {
  title: string;
  index?: number;
  size?: StepperSize;
  status?: StepperStatus;
  active?: boolean;
  activeSpacer?: boolean;
  testID?: string;
  onStepLayout?: (event: LayoutChangeEvent) => void;
  contentBody?: React.ReactElement | React.ReactElement[];
  contentFooter?: React.ReactElement | React.ReactElement[];
  lastStep?: boolean;
  palette?: OdidoPalette;
  collapsable?: boolean;
  collapsed?: boolean;
}
export interface StepperHorizontalStepProps {
  title: string;
  index?: number;
  size?: StepperSize;
  status?: StepperStatus;
  active?: boolean;
  activeSpacer?: boolean;
  testID?: string;
  onStepLayout?: (event: LayoutChangeEvent) => void;
  palette?: OdidoPalette;
  variant?: "horizontal";
}
export interface StepperInpageStepProps {
  title: string;
  size?: StepperSize;
  status?: StepperStatus;
  index?: number;
  testID?: string;
  content?: React.ReactElement | React.ReactElement[];
  textLink?: React.ReactElement;
  button?: React.ReactElement;
  palette?: OdidoPalette;
  badgeText?: string;
}

/**
 * Props for stepper step's container (containing the label and the current step)
 * @interface StepperStepContainerProps
 * @property {string} [label] - The label of the step.
 * @property {StepperSize} [size] - The size of the step.
 * @property {StepperStatus} [status] - Whether the step should be completed, active or inactive.
 * @property {number} [index] - Index that correlates with the active step. Uses the `activeStep`.
 * @property {string} [testID] - The testID of the steps.
 * @property {(event: LayoutChangeEvent) => void} [onLabelLayout] - Callback for onLayout change event.
 */
export interface StepperStepContainerProps {
  label: string;
  size?: StepperSize;
  status?: StepperStatus;
  index?: number;
  testID?: string;
  onLabelLayout?: (event: LayoutChangeEvent) => void;
  palette?: OdidoPalette;
}

/**
 * Props for stepper step's label
 * @interface StepperLabelProps
 * @property {string} [text] - The label text.
 * @property {StepperSize} [size] - The size of the step.
 * @property {StepperStatus} [status] - Whether the label should be completed, active or inactive.
 * @property {(event: LayoutChangeEvent) => void} [onLayout] - Callback for onLayout change event.
 */
export interface StepperLabelProps {
  text?: string;
  size?: StepperSize;
  status?: StepperStatus;
  onLayout?: (event: LayoutChangeEvent) => void;
}

/**
 * Props for stepper step's marker indicator
 * @interface StepperMarkerProps
 * @property {StepperStatus} [status] - Whether the marker indicator should be completed, active or inactive.
 * @property {StepperSize} [size] - The size of the step.
 * @property {number} [index] - The current active step.
 */
export type StepperMarkerProps = {
  status?: StepperStatus;
  size?: StepperSize;
  index?: number;
  variant?: "horizontal" | "vertical" | "inpage";
  palette?: OdidoPalette;
};

/**
 * Props for stepper step's spacer (dotted lines)
 * @interface StepperDottedLineProps
 * @property {boolean} [active] - Whether the dotted lines should be active or inactive.
 */
export type StepperDottedLineProps = {
  active?: boolean;
  direction?: "horizontal" | "vertical";
};
