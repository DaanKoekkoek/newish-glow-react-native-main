import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Default } from "./LargeSticker.stories";

const Story = composeStory(Default, meta);

describe("<LargeSticker />", () => {
  it("renders stable snapshot", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with list component", () => {
    //@ts-expect-error
    const { toJSON } = render(<Story {...Story.args} type="usp" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with price component", () => {
    //@ts-expect-error
    const { toJSON } = render(<Story {...Story.args} type="default" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with price component in emphasised variant", () => {
    const { toJSON } = render(
      //@ts-expect-error
      <Story {...Story.args} variant="emphasised" type="default" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with description", () => {
    const { toJSON } = render(
      <Story
        {...Story.args}
        //@ts-expect-error
        type="default"
        description="Describe your promotion"
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
