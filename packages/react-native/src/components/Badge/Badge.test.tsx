import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic } from "./Badge.stories";

const Badge = composeStory(Basic, meta);

describe("<Badge />", () => {
  it("renders correctly basic badge default", () => {
    const { toJSON } = render(<Badge prominence="default" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly subtle badge subtle", () => {
    const { toJSON } = render(<Badge prominence="subtle" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly outlined badge outline", () => {
    const { toJSON } = render(<Badge prominence="outline" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly basic badge inactive default", () => {
    const { toJSON } = render(<Badge prominence="default" inactive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly subtle badge inactive subtle", () => {
    const { toJSON } = render(<Badge prominence="subtle" inactive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly outlined badge inactive outline", () => {
    const { toJSON } = render(<Badge prominence="outline" inactive />);
    expect(toJSON()).toMatchSnapshot();
  });
});
