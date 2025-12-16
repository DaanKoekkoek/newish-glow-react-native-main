import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic, IconStory } from "./BadgeStatus.stories";

const BadgeStatus = composeStory(Basic, meta);
const BadgeStatusWithIcon = composeStory(IconStory, meta);

describe("<BadgeStatusStatus />", () => {
  it("renders correctly basic badgeStatus", () => {
    const { toJSON } = render(<BadgeStatus {...BadgeStatus.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly badgeStatus with icon variant", () => {
    const { toJSON } = render(<BadgeStatus {...BadgeStatusWithIcon.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("formats numbers to '99+' if number is greater", () => {
    const { getByText } = render(<BadgeStatus count={999} />);
    const formattedText = "99+";
    const foundText = getByText(formattedText);
    expect(foundText).not.toBeNull();
  });
});
