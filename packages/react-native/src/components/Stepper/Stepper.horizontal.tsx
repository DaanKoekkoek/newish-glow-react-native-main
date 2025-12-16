import type { BreakpointKeys } from "_theming/breakpoints";
import { mergeTestIds } from "_utility";
import { Strong } from "foundations/Strong";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { StepperDottedLine, StepperMarker } from "./Stepper.atoms";
import { stylesheetHorizontal } from "./Stepper.horizontal.styles";
import type {
  StepperHorizontalProps,
  StepperHorizontalStepProps,
  StepperStepContainerProps,
  StepperLabelProps,
  StepperStatus,
} from "./Stepper.types";

const Stepper = ({
  activeStep = 0,
  children,
  testID,
  palette = "default",
}: StepperHorizontalProps) => {
  const [labelHeight, setLabelHeight] = useState(0);

  const { styles } = useStyles(stylesheetHorizontal);

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const size = () => {
    if (breakpoint === "laptop" || breakpoint === "desktop") return "large";
    return "small";
  };

  let activeSpacer = true;
  let statusHandler: StepperStatus = "inactive";

  const stepperTestID = mergeTestIds(testID, "stepper");

  const onLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number; height: number } } }) => {
      const { height } = event.nativeEvent.layout;
      if (breakpoint === "laptop" || breakpoint === "desktop") {
        return setLabelHeight((prevHeight) => Math.max(prevHeight, height));
      }
      setLabelHeight(0);
    },
    [breakpoint],
  );

  return (
    <View
      testID={stepperTestID}
      style={styles.containerMinHeight(breakpoint, labelHeight)}
    >
      <View style={styles.container}>
        {React.Children.map(children, (child, index) => {
          if (index >= 5) return null;
          if (!React.isValidElement(child)) {
            throw new Error("Invalid child element");
          }
          const activeStatus = activeStep === index + 1;
          statusHandler = activeStatus
            ? "active"
            : (child.props.status ?? "inactive");
          if (index < activeStep - 1) statusHandler = "completed"; // if index is less than active index, status is completed
          if (statusHandler === "active") activeSpacer = false; // if active, no spacer
          if (activeStep <= 0) activeSpacer = false; //if no active index, no spacer
          return (
            <>
              <Step
                {...child.props}
                key={child.key}
                size={size()}
                index={index + 1}
                active={activeStatus}
                status={statusHandler}
                onStepLayout={onLayout}
                variant="horizontal"
                palette={palette}
              />
              {Array.isArray(children) &&
                children.length - 1 !== index &&
                index < 4 && <StepperDottedLine active={activeSpacer} />}
            </>
          );
        })}
      </View>
    </View>
  );
};

const Step = ({
  title,
  status,
  size,
  index,
  testID,
  onStepLayout,
  palette = "default",
}: StepperHorizontalStepProps) => {
  return (
    <StepperStepContainer
      testID={testID}
      label={title}
      size={size}
      status={status}
      index={index}
      onLabelLayout={onStepLayout}
      palette={palette}
    />
  );
};

const StepperStepContainer = ({
  label,
  size,
  status,
  index = 0,
  onLabelLayout,
  palette = "default",
}: StepperStepContainerProps) => {
  const { styles } = useStyles(stylesheetHorizontal, {
    size: size === "default" ? undefined : size,
    status: status === "default" ? undefined : status,
  });

  return (
    <View style={styles.stepperStepContainer}>
      <StepperMarker
        status={status}
        size={size}
        index={index}
        palette={palette}
      />
      <StepperLabel
        onLayout={onLabelLayout}
        text={label}
        size={size}
        status={status}
      />
    </View>
  );
};

const StepperLabel = ({
  text,
  size,
  status = "default",
  onLayout,
}: StepperLabelProps) => {
  const { styles } = useStyles(stylesheetHorizontal, {
    size: size === "default" ? undefined : size,
    status: status === "default" ? undefined : status,
  });
  if (!text) return null;

  return size === "small" ? (
    <View onLayout={onLayout} />
  ) : (
    <View style={styles.labelWrapper} onLayout={onLayout}>
      <Strong style={[styles.label, { textAlign: "center" }]} aria-label={text}>
        {text}
      </Strong>
    </View>
  );
};

Step.displayName = "Stepper.Step";

Stepper.Step = Step;

const StepperHorizontal = Stepper;

export { Stepper, StepperHorizontal };
