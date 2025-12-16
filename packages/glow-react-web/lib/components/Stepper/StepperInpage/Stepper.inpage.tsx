import React from "react";
import type {
  StepperInpageStepProps,
  StepperInpageProps,
} from "../Stepper.types";
import { Heading } from "foundations/Heading";
import styles from "./Stepper.inpage.module.scss";
import classNames from "classnames";
import { Divider } from "components/Divider";
import { Marker } from "_internals/ProgressIndicators";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

export const StepperInpage = ({
  children,
  palette = "default",
  startingLabel = 1,
}: StepperInpageProps) => {
  return (
    <ol className={tokenClassNames(styles, "inpage-stepper")}>
      {React.Children.map(children, (child, index) => {
        return (
          <StepperInpageStep
            {...child.props}
            key={child.key}
            label={startingLabel + index}
            palette={palette}
            state={child.props.state}
          />
        );
      })}
    </ol>
  );
};

export const StepperInpageStep = ({
  title,
  state = "default",
  label,
  children,
  textLink,
  button,
  palette = "default",
  badge,
  callout,
  summary,
  divider = true,
}: StepperInpageStepProps) => {
  const isActive = state === "active";
  const isCompleted = state === "completed";
  const isInactive = state === "inactive";

  return (
    <li
      className={classNames(
        styles["inpage-step"],
        styles[`inpage-step-state-${state}`],
      )}
    >
      <div className={styles["inpage-step-label"]}>
        <Marker
          state={state}
          index={label}
          variant="inpage"
          palette={palette}
        />
        <div className={styles["inpage-step-heading-container"]}>
          <Heading
            size="md"
            as="h3"
            aria-label={title}
            className={styles["inpage-step-heading"]}
          >
            {title}
          </Heading>
          {badge &&
            React.cloneElement(badge, {
              state: isInactive ? "inactive" : "default",
            })}
        </div>
        {isCompleted && <div>{textLink}</div>}
      </div>
      <>
        {callout}
        {children && !isCompleted && (
          <div className={styles["inpage-step-content"]}>
            {React.isValidElement(children) ? (
              children
            ) : (
              <Paragraph size="sm">{children}</Paragraph>
            )}
          </div>
        )}
        {isCompleted && summary}
        {!isActive && !isCompleted && textLink && (
          <div>
            {React.cloneElement(textLink, {
              disabled: isInactive,
            })}
          </div>
        )}
        {button && children && isActive && (
          <div className={isActive ? styles["inpage-step-button"] : ""}>
            {button}
          </div>
        )}
      </>
      {divider && <Divider className={styles["inpage-step-divider"]} />}
    </li>
  );
};
