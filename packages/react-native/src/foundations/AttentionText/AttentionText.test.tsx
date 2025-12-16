import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic, WithoutIcon } from "./AttentionText.stories";

const Story = composeStory(Basic, meta);
const StoryWithoutIcon = composeStory(WithoutIcon, meta);

describe("<AttentionText />", () => {
  it("renders a stable snapshot", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("applies the correct styles based on variant", () => {
    const { getByTestId } = render(<Story {...Story.args} variant="error" />);
    const container = getByTestId("attention-container");
    expect(container.props.style).toMatchSnapshot();
  });

  it("applies the correct styles based on size", () => {
    const { getByTestId } = render(<Story {...Story.args} size="sm" />);
    const container = getByTestId("attention-container");
    expect(container.props.style).toMatchSnapshot();
  });

  it("renders the children text", () => {
    const { getByText } = render(<Story {...Story.args} />);
    expect(getByText(Story.args.children as string)).toBeTruthy();
  });

  it("does not render the icon", () => {
    const { queryByTestId } = render(<Story {...StoryWithoutIcon.args} />);
    expect(queryByTestId("attention-text-icon")).toBeTruthy();
  });
});
