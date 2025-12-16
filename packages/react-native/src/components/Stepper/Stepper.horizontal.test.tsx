import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import metaHorizontal, { Horizontal } from "./Stepper.horizontal.stories";

const StepperHorizontal = composeStory(Horizontal, metaHorizontal);

describe("StepperHorizontal", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
      <StepperHorizontal {...StepperHorizontal.args} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
