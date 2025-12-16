import React, { useEffect, useState } from "react";
import { Icon } from "foundations/Icon";
import styles from "./Stepper.vertical.module.scss";

import { Heading } from "foundations/Heading";
import {
  StepperVerticalProps,
  StepperState,
  StepperVerticalStepProps,
} from "../Stepper.types";
import { Marker, DottedLine } from "_internals/ProgressIndicators";
import { tokenClassNames } from "_utility";
import classNames from "classnames";

const MAX_ALLOWED_STEPS = 5;

export const StepperVertical = ({
  activeStep = 0,
  children,
  testID = "stepper",
  palette = "default",
  collapsible = false,
}: StepperVerticalProps) => {
  let stateHandler: StepperState = "inactive";

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(styles, "stepper-vertical")}
    >
      {React.Children.map(children, (child, index) => {
        if (index >= MAX_ALLOWED_STEPS) return null;
        if (!React.isValidElement(child)) {
          throw new Error("Invalid child element");
        }
        const stepIndex = index + 1;
        const activeState = activeStep === stepIndex;
        let activeSpacer = false;
        stateHandler = activeState
          ? "active"
          : (child.props.state ?? "inactive");

        // if index is less than active index, state is completed
        if (index < activeStep - 1) {
          activeSpacer = true;
          stateHandler = "completed";
        }

        return (
          <StepperVerticalStep
            {...child.props}
            key={child.key}
            state={stateHandler}
            index={stepIndex}
            palette={palette}
            lastStep={React.Children.count(children) - 1 === index}
            collapsible={collapsible}
            testID={testID}
            activeSpacer={activeSpacer}
          />
        );
      })}
    </div>
  );
};

export const StepperVerticalStep = ({
  title,
  titleAs = "span",
  state = "default",
  index,
  testID,
  contentBody,
  contentFooter,
  lastStep,
  activeSpacer,
  palette = "default",
  collapsible = false,
  collapsed = false,
}: StepperVerticalStepProps) => {
  const [expand, setCollapse] = useState(collapsible);

  const toggleCollapse = () => {
    setCollapse(!expand);
  };

  useEffect(() => {
    if (state === "active") setCollapse(false);
    if (collapsible) {
      setCollapse(true);
      if (collapsed) setCollapse(false);
    } else {
      setCollapse(false);
    }
  }, [collapsible, state, collapsed]);

  const Collapsible = ({
    children,
    testID,
  }: {
    children: React.ReactNode;
    testID: string | undefined;
  }) => {
    return collapsible ? (
      <button
        type="button"
        className={styles["label-wrapper"]}
        onClick={toggleCollapse}
        data-testid={`${testID}-step-${index}`}
      >
        {children}
      </button>
    ) : (
      <>{children}</>
    );
  };

  return (
    <div data-testid={testID} className={styles["stepper-step-container"]}>
      <div
        className={classNames(styles["stepper-step-col-left"], {
          [styles["inactive-step"]]: state !== "active",
        })}
      >
        <div className={styles.marker}>
          <Marker state={state} index={index} palette={palette} />
        </div>
        {lastStep ? null : (
          <DottedLine active={activeSpacer} direction="vertical" />
        )}
      </div>
      <div className={styles["stepper-step-col-right"]}>
        <Collapsible testID={testID}>
          <Heading
            size="sm"
            as={titleAs}
            aria-label={title}
            data-testid={`${testID}-heading-${index}`}
          >
            {title}
          </Heading>
          {collapsible && contentBody && (
            <Icon
              name={expand ? "chevron-down" : "chevron-up"}
              size="default"
              className={styles["flex-end"]}
              data-testid={`${testID}-icon${expand ? "down" : "up"}-${index}`}
            />
          )}
        </Collapsible>
        {!expand && (
          <div
            className={styles["step-content-container"]}
            data-testid={`stepper-content-${index}`}
          >
            {contentBody && (
              <>
                {contentBody}
                {contentFooter && contentFooter}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
