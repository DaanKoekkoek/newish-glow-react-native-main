import { Icon } from "foundations/Icon";
import React, { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { StepperMarker, StepperDottedLine } from "./Stepper.atoms";
import type {
  StepperVerticalProps,
  StepperVerticalStepProps,
  StepperStatus,
} from "./Stepper.types";
import { stylesheetVertical } from "./Stepper.vertical.styles";
import type { BreakpointKeys } from "../../_theming/";
import { mergeTestIds } from "../../_utility";
import { Heading } from "../../foundations/Heading";

const StepperVertical = ({
  activeStep = 0,
  children,
  testID,
  palette = "default",
  collapsable = false,
}: StepperVerticalProps) => {
  const { styles } = useStyles(stylesheetVertical);
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const stepperTestID = mergeTestIds(testID || "", "stepper");
  const MAX_ALLOWED_STEPS = 5;
  let statusHandler: StepperStatus = "inactive";

  const size = () => {
    if (breakpoint === "laptop" || breakpoint === "desktop") return "large";
    return "small";
  };

  return (
    <View testID={stepperTestID} style={styles.container}>
      {React.Children.map(children, (child, index) => {
        if (index >= MAX_ALLOWED_STEPS) return null;
        if (!React.isValidElement(child)) {
          throw new Error("Invalid child element");
        }
        const stepIndex = index + 1;
        const activeStatus = activeStep === stepIndex;
        let activeSpacer = false;
        statusHandler = activeStatus
          ? "active"
          : (child.props.status ?? "inactive");

        // if index is less than active index, status is completed
        if (index < activeStep - 1) {
          activeSpacer = true;
          statusHandler = "completed";
        }

        return (
          <Step
            {...child.props}
            key={child.key}
            size={size()}
            status={statusHandler}
            index={stepIndex}
            palette={palette}
            lastStep={React.Children.count(children) - 1 === index}
            collapsable={collapsable}
            testID={stepperTestID}
            activeSpacer={activeSpacer}
          />
        );
      })}
    </View>
  );
};

const Step = ({
  title,
  status = "default",
  size,
  index,
  testID,
  contentBody,
  contentFooter,
  lastStep,
  activeSpacer,
  palette = "default",
  collapsable = false,
  collapsed = false,
}: StepperVerticalStepProps) => {
  const { styles } = useStyles(stylesheetVertical, {
    size: size === "default" ? undefined : size,
    status: status === "default" ? undefined : status,
  });

  const [expand, setCollapse] = useState(collapsable);

  const toggleCollapse = () => {
    setCollapse(!expand);
  };

  useEffect(() => {
    if (status === "active") setCollapse(false);
    if (collapsable) {
      setCollapse(true);
      if (collapsed) setCollapse(false);
    } else {
      setCollapse(false);
    }
  }, [collapsable, status, collapsed]);

  const Collapsable = ({ children }: { children: React.ReactNode }) => {
    return collapsable ? (
      <Pressable
        style={styles.labelWrapper}
        onPress={toggleCollapse}
        accessibilityLabel={`${title}`}
        role="button"
        testID={`${testID}-step-${index}`}
      >
        {children}
      </Pressable>
    ) : (
      <>{children}</>
    );
  };

  return (
    <View testID={testID} style={styles.stepperStepContainer}>
      <View style={styles.stepperStepColLeft}>
        <StepperMarker
          status={status}
          size={size}
          index={index}
          palette={palette}
        />
        {lastStep ? null : (
          <StepperDottedLine active={activeSpacer} direction="vertical" />
        )}
      </View>
      <View style={styles.stepperStepColRight}>
        <Collapsable>
          <Heading
            size="sm"
            aria-label={title}
            testID={`${testID}-heading-${index}`}
          >
            {title}
          </Heading>
          {collapsable &&
            contentBody &&
            (!expand ? (
              <Icon
                name="chevron-up"
                size="default"
                style={styles.flexEnd}
                testID={`${testID}-iconup-${index}`}
              />
            ) : (
              <Icon
                name="chevron-down"
                size="default"
                style={styles.flexEnd}
                testID={`${testID}-icondown-${index}`}
              />
            ))}
        </Collapsable>
        {!expand && (
          <View
            style={styles.stepContentContainer}
            testID={`${testID}-content-${index}`}
          >
            {contentBody && <View>{contentBody}</View>}
            {contentFooter && contentBody && <View>{contentFooter}</View>}
          </View>
        )}
      </View>
    </View>
  );
};

Step.displayName = "StepperVertical.Step";

StepperVertical.Step = Step;

export { StepperVertical };
