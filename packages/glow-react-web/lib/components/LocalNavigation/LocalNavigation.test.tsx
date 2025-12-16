import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import meta, {
  Default,
  Compact,
  WithLeftAction,
  WithRightAction,
  Emphasised,
} from "./LocalNavigation.stories";

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
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });
});
