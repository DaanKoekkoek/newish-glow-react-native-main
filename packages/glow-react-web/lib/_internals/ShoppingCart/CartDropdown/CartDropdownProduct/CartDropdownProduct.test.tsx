import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import meta, { Default } from "./CartDropdownProduct.stories";
import { axe } from "jest-axe";

const CartDropdownProductStory = composeStory(Default, meta);

describe("<CartDropdownProduct />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <CartDropdownProductStory {...CartDropdownProductStory.args} />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <CartDropdownProductStory {...CartDropdownProductStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });
});
