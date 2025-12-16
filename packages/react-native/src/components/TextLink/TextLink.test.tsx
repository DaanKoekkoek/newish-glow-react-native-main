import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { IconLeft } from "./TextLink.stories";

const Story = composeStory(IconLeft, meta);

describe("<TextLink />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("sets text styles correctly", () => {
    const { toJSON, getByTestId } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId("link-text").props["style"][1].color).toBe("#1b5ee4");
    expect(getByTestId("link-icon").props["style"][1][0].color).toBe("#1b5ee4");
  });
});
