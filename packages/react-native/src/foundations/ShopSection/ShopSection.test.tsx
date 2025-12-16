import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Default } from "./ShopSection.stories";

const Story = composeStory(Default, meta);

describe("<ShopSection />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with padding", () => {
    const { toJSON } = render(
      <Story {...Story.args} paddingBottom="large" paddingTop="large" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with no top padding", () => {
    const { toJSON } = render(<Story {...Story.args} paddingTop="none" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with emphasised background", () => {
    const { toJSON } = render(<Story {...Story.args} variant="emphasised" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
