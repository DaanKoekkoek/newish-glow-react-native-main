import { composeStory } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";

import meta, { Basic } from "./Toggle.stories";

const Toggle = composeStory(Basic, meta);

describe("<Toggle />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(<Toggle {...Toggle.args} />);
    expect(container).toMatchSnapshot();
  });

  it("toggles is checked", async () => {
    render(<Toggle checked />);

    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeChecked();
  });

  it("can be initialized in pressed state", () => {
    render(<Toggle checked />);

    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeChecked();
  });

  it("cannot be toggled when inactive", async () => {
    const onChange = jest.fn();
    render(<Toggle onChange={onChange} inactive checked={false} />);

    const toggle = screen.getByRole("checkbox");
    expect(toggle).toBeDisabled();

    fireEvent.click(toggle);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(<Toggle checked />);

    const toggle = screen.getByRole("checkbox");
    expect(toggle).toHaveAttribute("aria-label", "Aan");
  });
});
