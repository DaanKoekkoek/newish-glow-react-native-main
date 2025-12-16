import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./UserNavigation.stories";

const UserNavigationStory = composeStory(Default, meta);

describe("<UserNavigation />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <UserNavigationStory {...UserNavigationStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <UserNavigationStory {...UserNavigationStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });
});
