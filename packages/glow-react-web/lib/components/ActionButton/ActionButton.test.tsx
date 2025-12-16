import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import meta, { _Variants } from "./ActionButton.stories";
import { ActionButton } from "./ActionButton";

const ActionButtonAllVariations = composeStory(_Variants, meta);

describe("ActionButton Component", () => {
  it("renders a stable snapshot across all variations", () => {
    const { container } = render(<ActionButtonAllVariations />);
    expect(container).toMatchSnapshot();
  });

  it("invokes onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <ActionButton onClick={onClick} icon="add" label="test compnonent" />,
    );

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalled();
  });
});
