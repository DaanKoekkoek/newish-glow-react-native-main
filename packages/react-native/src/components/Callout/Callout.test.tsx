import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic, Error, Success, Warning } from "./Callout.stories";

const CalloutBasic = composeStory(Basic, meta);
const CalloutError = composeStory(Error, meta);
const CalloutSuccess = composeStory(Success, meta);
const CalloutWarning = composeStory(Warning, meta);

describe.each([
  ["Basic", CalloutBasic],
  ["Error", CalloutError],
  ["Success", CalloutSuccess],
  ["Warning", CalloutWarning],
])("%s Callout", (_, Story) => {
  test("renders a stable snapshot", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
