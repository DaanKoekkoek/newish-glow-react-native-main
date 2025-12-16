import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./ActionButton.stories";

const ActionButtonDefault = composeStory(Basic, meta);

describe("<ActionButton />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<ActionButtonDefault {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with label", () => {
    const { getByText } = render(<ActionButtonDefault {...Basic.args} />);
    expect(getByText("label text")).toBeDefined();
  });
});
