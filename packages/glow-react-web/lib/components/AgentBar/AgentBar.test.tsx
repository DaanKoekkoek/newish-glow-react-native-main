import { render } from "@testing-library/react";
import meta, { Default } from "./AgentBar.stories";
import { composeStory } from "@storybook/react";
import { axe } from "jest-axe";

const AgentBarDefault = composeStory(Default, meta);

describe("<AgentBar />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<AgentBarDefault {...AgentBarDefault.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders correctly", () => {
    const { container } = render(<AgentBarDefault {...AgentBarDefault.args} />);

    expect(container).toMatchSnapshot();
  });
});
