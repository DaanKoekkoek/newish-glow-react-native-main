import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import meta, { Basic } from "components/TextArea/TextArea.stories";

describe("TextArea", () => {
  const Story = composeStory(Basic, meta);

  it("renders correctly", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
