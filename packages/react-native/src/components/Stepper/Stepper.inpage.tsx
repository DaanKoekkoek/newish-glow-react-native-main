import type { BreakpointKeys } from "_theming/breakpoints";
import { mergeTestIds } from "_utility";
import { Divider } from "components/Divider";
import { Heading } from "foundations/Heading";
import React from "react";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { Badge } from "../Badge";
import { StepperInpageMarker } from "./Stepper.atoms";
import { stylesheetInpage } from "./Stepper.inpage.styles";
import type {
  StepperInpageStepProps,
  StepperInpageProps,
} from "./Stepper.types";

const StepperInpage = ({
  children,
  testID,
  palette = "default",
}: StepperInpageProps) => {
  const { styles } = useStyles(stylesheetInpage);
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const stepperTestID = mergeTestIds(testID, "stepper");
  const MAX_ALLOWED_STEPS = 5;

  const size = () => {
    if (breakpoint === "laptop" || breakpoint === "desktop") return "large";
    return "small";
  };

  return (
    <View testID={stepperTestID}>
      <View style={styles.container}>
        {React.Children.map(children, (child, index) => {
          if (index >= MAX_ALLOWED_STEPS) return null;
          if (!React.isValidElement(child)) {
            throw new Error("Invalid child element");
          }
          return (
            <>
              <Step
                {...child.props}
                key={child.key}
                size={size()}
                index={index + 1}
                palette={palette}
                status={child.props.status}
              />
            </>
          );
        })}
      </View>
    </View>
  );
};

const Step = ({
  title,
  status = "default",
  size,
  index,
  testID,
  content,
  textLink,
  button,
  palette = "default",
  badgeText,
}: StepperInpageStepProps) => {
  const { styles } = useStyles(stylesheetInpage, {
    size: size === "default" ? undefined : size,
    status: status === "default" ? undefined : status,
  });

  return (
    <View style={styles.stepperStepContainer} testID={testID}>
      <View style={styles.labelWrapper}>
        <StepperInpageMarker
          status={status}
          index={index}
          variant="inpage"
          palette={palette}
        />
        <View style={styles.heading}>
          <Heading size="md" aria-label={title} style={styles.headingText}>
            {title}
          </Heading>
          {!!badgeText && (
            <Badge
              text={badgeText}
              palette="green"
              {...(status === "inactive" ? { inactive: true } : {})}
            />
          )}
        </View>
        {status === "completed" && <View>{textLink}</View>}
      </View>
      {status !== "inactive" && (
        <>
          {content && <View>{content}</View>}
          {textLink &&
            status !== "active" &&
            status !== "completed" &&
            textLink}
          {button && content && status === "active" && (
            <View style={styles.button}>{button}</View>
          )}
        </>
      )}
      <View style={styles.diverder}>
        <Divider />
      </View>
    </View>
  );
};

Step.displayName = "StepperInpage.Step";

StepperInpage.Step = Step;

export { StepperInpage };
