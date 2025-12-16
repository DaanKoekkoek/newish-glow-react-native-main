import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./GlowGradient.stories";

const GlowGradientBasic = composeStory(Basic, meta);

describe("<GlowGradient />", () => {
  it("a stable snapshot", () => {
    const { toJSON } = render(<GlowGradientBasic {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
