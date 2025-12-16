import { composeStory } from "@storybook/react";

import metaInpage, { Inpage } from "./Stepper.inpage.stories";
import { render } from "@testing-library/react";

const StepperInpage = composeStory(Inpage, metaInpage);

describe("StepperInpage", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<StepperInpage {...StepperInpage.args} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
