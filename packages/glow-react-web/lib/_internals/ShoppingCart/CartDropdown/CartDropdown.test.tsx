import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default, Empty } from "./CartDropdown.stories";

const CartDropdownStory = composeStory(Default, meta);
const CartDropdownStoryEmpty = composeStory(Empty, meta);

describe("<CartDropdown />", () => {
  it("should not have any accessibility violations when empty", async () => {
    const { container } = render(
      <CartDropdownStory {...CartDropdownStoryEmpty.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have any accessibility violations with products", async () => {
    const { container } = render(
      <CartDropdownStory {...CartDropdownStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot when empty", () => {
    const { container } = render(
      <CartDropdownStory {...CartDropdownStoryEmpty.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders a stable snapshot with products", () => {
    const { container } = render(
      <CartDropdownStory {...CartDropdownStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });
});
