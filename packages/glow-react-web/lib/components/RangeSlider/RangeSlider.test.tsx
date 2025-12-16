import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./RangeSlider.stories";

const RangeSliderStory = composeStory(Default, meta);

describe("<RangeSlider />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <RangeSliderStory {...RangeSliderStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <RangeSliderStory {...RangeSliderStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });
});
