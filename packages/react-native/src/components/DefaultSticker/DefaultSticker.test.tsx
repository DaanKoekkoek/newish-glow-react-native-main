import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic, WithImage } from "./DefaultSticker.stories";

const BasicStory = composeStory(Basic, meta);
const WithImageStory = composeStory(WithImage, meta);

describe.each([
  ["Basic", BasicStory],
  ["WithImage", WithImageStory],
])("%s DefaultSticker", (_, Story) => {
  test("renders a stable snapshot", () => {
    // @ts-expect-error
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
