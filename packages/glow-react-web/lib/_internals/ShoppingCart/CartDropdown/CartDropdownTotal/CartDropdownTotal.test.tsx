import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import meta, { Default } from "./CartDropdownTotal.stories";
import { axe } from "jest-axe";

const CartDropdownTotalStory = composeStory(Default, meta);

describe("<CartDropdownTotal />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <CartDropdownTotalStory {...CartDropdownTotalStory.args} />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <CartDropdownTotalStory {...CartDropdownTotalStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });
});
