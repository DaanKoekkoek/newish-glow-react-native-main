import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import metaInpage, { Inpage } from "./Stepper.inpage.stories";

const StepperInpage = composeStory(Inpage, metaInpage);

describe("StepperInpage", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<StepperInpage {...StepperInpage.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
