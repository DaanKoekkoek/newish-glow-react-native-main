import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./GlowIcon.stories";

const GlowIconBasic = composeStory(Basic, meta);

describe("<GlowIcon />", () => {
  it("a stable snapshot", () => {
    const { toJSON } = render(<GlowIconBasic {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
