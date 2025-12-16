import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./Spinner.stories";

const Spinner = composeStory(Basic, meta);

describe("<Spinner />", () => {
  it("renders a stable snapshot", () => {
    const { toJSON } = render(<Spinner {...Spinner.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
