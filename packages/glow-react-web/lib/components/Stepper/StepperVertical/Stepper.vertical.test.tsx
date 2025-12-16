import { composeStory } from "@storybook/react";

import metaVertical, { Vertical } from "./Stepper.vertical.stories";
import { render, screen, fireEvent } from "@testing-library/react";

const StepperVertical = composeStory(Vertical, metaVertical);

describe("StepperVertical", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <>
        <StepperVertical {...StepperVertical.args} />
        <StepperVertical {...StepperVertical.args} collapsible />
      </>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should toggle steps if the stepper is collapsible", () => {
    render(<StepperVertical {...StepperVertical.args} collapsible />);

    // Check if the first step is collapsed
    expect(screen.getByTestId("stepper-content-1")).toBeTruthy();

    // Check if the step to be toggled collapsible
    expect(screen.queryByTestId("stepper-content-3")).toBeNull();

    fireEvent.click(screen.getByTestId("stepper-step-3"));

    expect(screen.getByTestId("stepper-content-3")).toBeTruthy();

    fireEvent.click(screen.getByTestId("stepper-step-3"));

    expect(screen.queryByTestId("stepper-content-3")).toBeNull();
  });
});
