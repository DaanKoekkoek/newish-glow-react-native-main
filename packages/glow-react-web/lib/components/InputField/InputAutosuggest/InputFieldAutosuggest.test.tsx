import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import meta, { DefaultVariant } from "./InputFieldAutosuggest.stories";

const Story = composeStory(DefaultVariant, meta);

describe("<InputFieldAutosuggest />", () => {
  const mockOnSuggestionSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render input field", () => {
    render(
      <Story {...Story.args} onSuggestionSelect={mockOnSuggestionSelect} />,
    );

    const input = screen.getByTestId("autosuggest-input");
    expect(input).toBeInTheDocument();
  });

  test("should filter suggestions based on input value", async () => {
    render(
      <Story {...Story.args} onSuggestionSelect={mockOnSuggestionSelect} />,
    );

    const input = screen.getByTestId("autosuggest-input");
    await userEvent.type(input, "suggestion 1");

    const filteredItems = screen.getAllByTestId(/input-dropdown-suggestion-/);
    expect(filteredItems).toHaveLength(2);
  });

  test("should highlight matching text in suggestions", async () => {
    render(
      <Story {...Story.args} onSuggestionSelect={mockOnSuggestionSelect} />,
    );

    const input = screen.getByTestId("autosuggest-input");
    await userEvent.type(input, "suggestion 1");

    const highlightedTexts = screen.getAllByText(/Suggestion 1/);

    highlightedTexts.forEach((el) => {
      expect(el).toHaveClass("autosuggest-option-highlight");
    });
  });

  test("should select suggestion on mouse click", async () => {
    render(
      <Story {...Story.args} onSuggestionSelect={mockOnSuggestionSelect} />,
    );

    const input = screen.getByTestId("autosuggest-input");
    await userEvent.type(input, "suggestion 1");
    await userEvent.click(
      screen.getByTestId("input-dropdown-suggestion-suggestion-1.1"),
    );

    expect(mockOnSuggestionSelect).toHaveBeenCalledWith({
      text: "Suggestion 1.1",
      value: "suggestion-1.1",
    });
  });

  test("should select suggestion on keyboard enter", async () => {
    render(
      <Story {...Story.args} onSuggestionSelect={mockOnSuggestionSelect} />,
    );

    const input = screen.getByTestId("autosuggest-input");
    await userEvent.type(input, "suggestion 1");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(mockOnSuggestionSelect).toHaveBeenCalledWith({
      text: "Suggestion 1.1",
      value: "suggestion-1.1",
    });
  });

  test("should close dropdown when Escape is pressed", async () => {
    render(
      <Story {...Story.args} onSuggestionSelect={mockOnSuggestionSelect} />,
    );

    const input = screen.getByTestId("autosuggest-input");
    await userEvent.type(input, "suggestion 1");
    await userEvent.keyboard("{Escape}");

    const dropdown = screen.queryByTestId("autosuggest");
    expect(dropdown).not.toBeInTheDocument();
  });
});
