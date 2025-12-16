import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./DonutGraph.stories";

const DonutGraphStory = composeStory(Default, meta);

describe("<DonutGraph />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<DonutGraphStory {...DonutGraphStory.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(<DonutGraphStory {...DonutGraphStory.args} />);
    expect(container).toMatchSnapshot();
  });
});
