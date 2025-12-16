import { OdidoPalette } from "_internals/Color";
import { HeadingRenderType } from "foundations/Heading";
import React from "react";

/**
 * Represents the state of a step.
 * @type {"default" | "active" | "completed" | "inactive"}
 */
export type StepperState = "default" | "active" | "completed" | "inactive";

/**
 * Represents the size of the Stepper's steps.
 * @type {"default" | "small" | "large"}
 */
export type StepperSize = "default" | "small" | "large";

/**
 * Props for the horizontal stepper
 * @interface StepperProps
 * @property {number} [activeStep] - The current active step.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `<Stepper.Step />` as its children.
 * @property {string} [className] - The class name of the stepper.
 * @property {string} [testID] - The testID of the step.
 * @property {OdidoPalette} [palette] - The color palette of the stepper.
 */
export interface StepperHorizontalProps {
  activeStep?: number;
  children:
    | React.ReactElement<StepperHorizontalStepProps>
    | React.ReactElement<StepperHorizontalStepProps>[];
  className?: string;
  testID?: string;
  palette?: OdidoPalette;
}

/** Props for the vertical stepper
 * @interface StepperVerticalProps
 * @property {number} [activeStep] - The current active step.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `<Stepper.Step />` as its children.
 * @property {string} [testID] - The testID of the stepper.
 * @property {OdidoPalette} [palette] - The color palette of the stepper.
 * @property {boolean} [collapsible] - Whether the stepper is collapsible or not.
 * @property {StepperSize} [size] - The size of the stepper.
 */

export interface StepperVerticalProps {
  size?: StepperSize;
  activeStep?: number;
  children:
    | React.ReactElement<StepperVerticalStepProps>
    | React.ReactElement<StepperVerticalStepProps>[];
  testID?: string;
  palette?: OdidoPalette;
  collapsible?: boolean;
}

/** Props for the inpage stepper
 * @interface StepperInpageProps
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `<Stepper.Step />` as its children.
 * @property {string} [testID] - The testID of the stepper.
 * @property {OdidoPalette} [palette] - The color palette of the stepper.
 * @property {number} [startingLabel] - The step number on the label of the first step.
 * @property {boolean} [withTerminalDivider] - Whether to show the divider after the last step.
 */
export interface StepperInpageProps {
  children:
    | React.ReactElement<StepperInpageStepProps>
    | React.ReactElement<StepperInpageStepProps>[];
  testID?: string;
  palette?: OdidoPalette;
  startingLabel?: number;
  withTerminalDivider?: boolean;
}

/**
 * Props for the vertical stepper steps
 * @interface StepperStepProps
 * @property {string} [title] - The label of the step.
 * @property {HeadingRenderType} [titleAs] - The HTML element used for the title.
 * @property {number} [index] - The current active step.
 * @property {StepperSize} [size] - The size of the steps.
 * @property {StepperState} [state] - Whether the step should be `completed`, `active` or `inactive`.
 * @property {boolean} [active] - The active step.
 * @property {boolean} [activeSpacer] - The active spacer of the step.
 */
export interface StepperVerticalStepProps {
  title: string;
  titleAs?: HeadingRenderType;
  index?: number;
  size?: StepperSize;
  state?: StepperState;
  active?: boolean;
  activeSpacer?: boolean;
  testID?: string;
  contentBody?: React.ReactElement | React.ReactElement[];
  contentFooter?: React.ReactElement | React.ReactElement[];
  lastStep?: boolean;
  palette?: OdidoPalette;
  collapsible?: boolean;
  collapsed?: boolean;
}

/** Props for horizontal stepper step
 * @interface StepperHorizontalStepProps
 * @property {string} [title] - The label of the step.
 * @property {number} [index] - The current active step.
 * @property {StepperSize} [size] - The size of the steps.
 * @property {StepperState} [state] - Whether the step should be `completed`, `active` or `inactive`.
 * @property {boolean} [active] - The active step.
 * @property {boolean} [activeSpacer] - Whether to show the activeSpacer of the step.
 * @property {string} [testID] - The testID of the step.
 * @property {OdidoPalette} [palette] - The color palette of the stepper.
 * @property {string} [variant] - The variant of the stepper.
 */
export interface StepperHorizontalStepProps {
  title: string;
  index?: number;
  size?: StepperSize;
  state?: StepperState;
  active?: boolean;
  activeSpacer?: boolean;
  testID?: string;
  palette?: OdidoPalette;
  variant?: "horizontal";
}

/**
 * Props for inpage stepper step
 * @type {StepperInpageStepProps}
 * @property {string} title - The label of the step.
 * @property {StepperState} [state='default'] - Whether the step should be `completed`, `active` or `inactive`.
 * @property {number} [label] - The label of the step.
 * @property {React.ReactNode} [children] - The content of the step.
 * @property {React.ReactElement} [textLink] - The text link of the step.
 * @property {React.ReactElement} [button] - The button of the step.
 * @property {OdidoPalette} [palette='default'] - The color palette of the stepper.
 * @property {React.ReactElement} [callout] - The Callout of the step.
 * @property {string} [badge] - The badge of the step.
 * @property {React.ReactElement} [summary] - The summary of the step. Only visible when `state` is set to `completed`.
 * @property {boolean} [divider=true] - Whether to show the divider after the step, if it is the last step.
 */
export type StepperInpageStepProps = {
  title: string;
  state?: StepperState;
  label?: number;
  children?: React.ReactNode;
  textLink?: React.ReactElement;
  button?: React.ReactElement;
  palette?: OdidoPalette;
  callout?: React.ReactElement;
  badge?: React.ReactElement;
  summary?: React.ReactElement;
  divider?: boolean;
};

/**
 * Props for stepper step's container (containing the label and the current step)
 * @interface StepperStepContainerProps
 * @property {string} [label] - The label of the step.
 * @property {StepperState} [state] - Whether the step should be completed, active or inactive.
 * @property {number} [index] - Index that correlates with the active step. Uses the `activeStep`.
 * @property {string} [testID] - The testID of the steps.
 */
export interface StepperStepContainerProps {
  label: string;
  state?: StepperState;
  index?: number;
  testID?: string;
  palette?: OdidoPalette;
}

/**
 * Props for stepper step's label
 * @interface StepperLabelProps
 * @property {string} [text] - The label text.
 * @property {StepperState} [state] - Whether the label should be completed, active or inactive.
 */
export interface StepperLabelProps {
  text?: string;
  state?: StepperState;
}
