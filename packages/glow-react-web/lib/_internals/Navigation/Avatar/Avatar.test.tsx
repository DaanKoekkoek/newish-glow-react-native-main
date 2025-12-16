import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./Avatar.stories";

const AvatarStory = composeStory(Default, meta);

describe("<Avatar />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<AvatarStory {...AvatarStory.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(<AvatarStory {...AvatarStory.args} />);
    expect(container).toMatchSnapshot();
  });
});
