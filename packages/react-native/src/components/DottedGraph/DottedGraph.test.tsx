import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Default } from "./DottedGraph.stories";

const Story = composeStory(Default, meta);

describe("<DottedGraph />", () => {
  it("renders stable snapshot", () => {
    const { toJSON } = render(<Story {...Story.args} palette="default" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
