import { composeStory } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default } from "./SelectorLight.stories";
import { SelectorLight } from "./SelectorLight";

const DefaultStory = composeStory(Default, meta);

describe("<SelectorLight /> accessibility & snapshots", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<DefaultStory {...DefaultStory.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe.each([["Default", DefaultStory]])("%s SelectorLight", (_, Story) => {
    test("renders a stable snapshot", () => {
      const { container } = render(<Story {...Story.args} />);
      expect(container).toMatchSnapshot();
    });
  });
});

describe("<SelectorLight /> behaviour", () => {
  test("calls onChange when clicked", () => {
    const mockOnChange = jest.fn();
    render(
      <SelectorLight
        id="selector-light"
        name="light"
        title="Test Light"
        state="default"
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByRole("radio");
    fireEvent.click(input);

    expect(mockOnChange).toHaveBeenCalledWith(
      "selector-light",
      expect.anything(),
    );
  });

  test("does not call onChange when state is inactive", () => {
    const mockOnChange = jest.fn();
    render(
      <SelectorLight
        id="selector-light-inactive"
        name="light"
        title="Inactive Light"
        state="inactive"
        onChange={mockOnChange}
      />,
    );

    const input = screen.getByRole("radio");
    fireEvent.click(input);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  test("renders a title as <BaseText> when given a string", () => {
    render(
      <SelectorLight
        id="selector-light-title"
        name="light"
        title="Title Text"
        state="default"
      />,
    );

    expect(screen.getByText("Title Text")).toBeInTheDocument();
  });
});
