import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./Accordion.stories";

const Accordion = composeStory(Basic, meta);

describe("<Accordion />", () => {
  it("renders a stable snapshot", () => {
    const { toJSON } = render(<Accordion {...Accordion.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
