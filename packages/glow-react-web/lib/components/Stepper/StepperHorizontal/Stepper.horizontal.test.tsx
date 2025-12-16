import { composeStory } from "@storybook/react";

import metaHorizontal, { Horizontal } from "./Stepper.horizontal.stories";
import { render, screen } from "@testing-library/react";

const StepperHorizontal = composeStory(Horizontal, metaHorizontal);

describe("StepperHorizontal", () => {
  test("renders a stable snapshot", () => {
    const { asFragment } = render(
      <StepperHorizontal {...StepperHorizontal.args} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders active class on active", () => {
    render(<StepperHorizontal {...StepperHorizontal.args} />);

    const activeStep = screen.getByText("Step 3 label");

    expect(activeStep).toHaveClass("label-state-active");
  });
});
