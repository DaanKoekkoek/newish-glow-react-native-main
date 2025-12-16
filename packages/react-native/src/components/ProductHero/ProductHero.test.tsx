import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Default, DefaultWith5Items, Promo } from "./ProductHero.stories";

const StoryDefault = composeStory(Default, meta);

const StoryDefaultWith5Items = composeStory(DefaultWith5Items, meta);

const StoryPromo = composeStory(Promo, meta);

describe("<ProductHero />", () => {
  it("renders as default", () => {
    const { toJSON } = render(<StoryDefault {...StoryDefault.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders as promo", () => {
    const { toJSON } = render(<StoryPromo {...StoryPromo.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders as default with 5 items", () => {
    const { toJSON } = render(<StoryDefaultWith5Items {...StoryPromo.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
