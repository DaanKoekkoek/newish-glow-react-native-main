import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, {
  Default,
  Compact,
  WithLeftAction,
  WithRightAction,
  Emphasised,
} from "./LocalNavigation.stories";

//@ts-expect-error
const DefaultStory = composeStory(Default, meta);
const CompactStory = composeStory(Compact, meta);
const EmphasisedStory = composeStory(Emphasised, meta);
const WithLeftActionStory = composeStory(WithLeftAction, meta);
const WithRightActionStory = composeStory(WithRightAction, meta);

describe.each([
  ["Default", DefaultStory],
  ["Compact", CompactStory],
  ["Emphasised", EmphasisedStory],
  ["WithLeftAction", WithLeftActionStory],
  ["WithRightAction", WithRightActionStory],
])("%s LocalNavigation", (_, Story) => {
  test("renders a stable snapshot", () => {
    //@ts-expect-error
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
