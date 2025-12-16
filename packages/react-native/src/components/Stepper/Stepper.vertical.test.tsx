import { composeStory } from "@storybook/react";
import { render, fireEvent } from "_test-utils";
import React from "react";

import metaVertical, { Vertical } from "./Stepper.vertical.stories";

const StepperVertical = composeStory(Vertical, metaVertical);

describe("StepperVertical", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
      <>
        <StepperVertical {...StepperVertical.args} />
        <StepperVertical {...StepperVertical.args} collapsable />
      </>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("Check stepper when pressing step on collapseble stepper", () => {
    const { getByTestId, queryByTestId } = render(
      <StepperVertical {...StepperVertical.args} collapsable />,
    );

    // Check if the first step is collapsed
    expect(queryByTestId("stepper-content-1")).toBeTruthy();

    // Check if the step to be toggled collapsable
    expect(queryByTestId("stepper-content-3")).toBeNull();
    fireEvent.press(getByTestId("stepper-step-3"));
    expect(getByTestId("stepper-content-3")).toBeTruthy();
    fireEvent.press(getByTestId("stepper-step-3"));
    expect(queryByTestId("stepper-content-3")).toBeNull();
  });
});
