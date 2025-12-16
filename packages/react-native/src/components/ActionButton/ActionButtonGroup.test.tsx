import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./ActionButtonGroup.stories";

const ActionButtonDefault = composeStory(Basic, meta);

describe("<ActionButton />", () => {
  it("renders action buttons", () => {
    const { toJSON } = render(<ActionButtonDefault {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders action buttons with label", () => {
    const { getAllByText } = render(<ActionButtonDefault {...Basic.args} />);
    expect(getAllByText("label text")).toBeDefined();
  });
});
