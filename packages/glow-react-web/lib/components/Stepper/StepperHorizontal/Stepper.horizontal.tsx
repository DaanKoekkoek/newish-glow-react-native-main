import { Strong } from "foundations/Strong";
import React from "react";
import styles from "./Stepper.horizontal.module.scss";

import type {
  StepperHorizontalProps,
  StepperHorizontalStepProps,
  StepperLabelProps,
  StepperState,
} from "../Stepper.types";
import classNames from "classnames";
import { Marker, DottedLine } from "_internals/ProgressIndicators";
import { tokenClassNames } from "_utility";

export const Stepper = ({
  activeStep = 0,
  className,
  children,
  palette = "default",
  testID,
}: StepperHorizontalProps) => {
  let activeSpacer = true;
  let stateHandler: StepperState = "inactive";

  return (
    <div
      className={tokenClassNames(styles, "stepper-horizontal", className)}
      data-testid={testID}
    >
      {React.Children.map(children, (child, index) => {
        if (index >= 5) return null;
        if (!React.isValidElement(child)) {
          throw new Error("Invalid child element");
        }
        const activeState = activeStep === index + 1;
        stateHandler = activeState
          ? "active"
          : (child.props.state ?? "inactive");
        if (index < activeStep - 1) stateHandler = "completed"; // if index is less than active index, state is completed
        if (stateHandler === "active") activeSpacer = false; // if active, no spacer
        if (activeStep <= 0) activeSpacer = false; //if no active index, no spacer
        return (
          <div className={styles.step} data-testid="step">
            <HorizontalStep
              {...child.props}
              key={child.key}
              index={index + 1}
              active={activeState}
              state={stateHandler}
              palette={palette}
            />
            {Array.isArray(children) &&
              children.length - 1 !== index &&
              index < 4 && <DottedLine active={activeSpacer} />}
          </div>
        );
      })}
    </div>
  );
};

export const HorizontalStep = ({
  title,
  state,
  index = 0,
  palette = "default",
}: StepperHorizontalStepProps) => {
  return (
    <div>
      <Marker state={state} index={index} palette={palette} />
      <StepperLabel text={title} state={state} />
    </div>
  );
};

export const StepperLabel = ({
  text,
  state = "default",
}: StepperLabelProps) => {
  if (!text) return null;
  return (
    <div className={styles["label-wrapper"]}>
      <Strong
        className={classNames(styles["label"], styles[`label-state-${state}`])}
        aria-label={text}
      >
        {text}
      </Strong>
    </div>
  );
};
