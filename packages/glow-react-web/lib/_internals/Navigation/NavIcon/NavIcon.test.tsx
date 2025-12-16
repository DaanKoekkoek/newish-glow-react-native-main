import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./NavIcon.stories";

const NavIconStory = composeStory(Default, meta);

describe("<NavIcon />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<NavIconStory {...NavIconStory.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(<NavIconStory {...NavIconStory.args} />);
    expect(container).toMatchSnapshot();
  });
});
