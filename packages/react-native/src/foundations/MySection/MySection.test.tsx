import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import IMAGES from "foundations/Image/Image.mock";
import React from "react";

import meta, { Default } from "./MySection.stories";

const MySection = composeStory(Default, meta);

describe("<MySection />", () => {
  it("renders a stable screenshot", () => {
    const { toJSON } = render(<MySection {...Default.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with no top padding", () => {
    const { toJSON } = render(
      <MySection {...Default.args} paddingTop="none" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with image background", () => {
    const { toJSON } = render(
      <MySection
        {...Default.args}
        variant="image"
        image={{ localSrc: IMAGES["qr-code"], alt: "Alt text" }}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with emphasised background", () => {
    const { toJSON } = render(
      <MySection {...Default.args} variant="emphasised" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
