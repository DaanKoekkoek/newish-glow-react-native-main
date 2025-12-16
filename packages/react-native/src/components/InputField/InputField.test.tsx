import { composeStory } from "@storybook/react";
import { render, fireEvent, screen } from "_test-utils";
import React from "react";

import meta, { Basic } from "./InputField.stories";
import { autoSuggestions } from "./mockedData";

// @ts-expect-error
const Story = composeStory(Basic, meta);

describe("<InputField />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("sets attributes correctly", () => {
    const { getByTestId } = render(<Story {...Story.args} />);
    expect(getByTestId("input-field").props["aria-disabled"]).toBe(false);
    expect(getByTestId("input-field").props["aria-labelledby"]).toBe(
      "id-of-input",
    );
  });

  it("displays the correct state", () => {
    const { getByTestId } = render(
      <Story
        {...Story.args}
        validated={{ success: false, message: "boo boo" }}
      />,
    );

    expect(getByTestId("error-text"));
    expect(getByTestId("input-container").props.style.borderColor).toBe(
      "#f5463b",
    );
  });

  it("toggles password visibility", () => {
    const { getByTestId } = render(<Story {...Story.args} type="password" />);
    expect(getByTestId("input-field-affix-password-toggle"));
    fireEvent.press(getByTestId("input-field-affix-password-toggle"));

    const input = getByTestId("input-field").props;
    expect(input.secureTextEntry).toBe(false);
  });

  it("can open the DatePicker", () => {
    render(
      // @ts-expect-error
      <Story {...Story.args} type="date" dateFormat="dd-mm-yyyy" />,
    );

    const button = screen.getByTestId("glow-input-field-affix-date-picker");

    expect(button);
    fireEvent.press(button);
    expect(screen.getByTestId("glow-date-picker"));
  });

  it("can mask the text based on date format when <Input type='date' /> ", () => {
    render(
      // @ts-expect-error
      <Story {...Story.args} type="date" dateFormat="dd-mm-yyyy" />,
    );
    const input = screen.getByTestId("input-field");

    fireEvent.changeText(input, "10011994"); // 10-01-1994
    expect(input.props.value).toBe("10-01-1994");
  });

  it("renders as auto suggest <Input type='autoSuggest' /> with dropdown open", async () => {
    const { getByTestId, toJSON } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="autoSuggest"
        autoSuggestions={autoSuggestions}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, "Al");
    fireEvent(input, "focus");

    expect(getByTestId("input-field-auto-suggest-dropdown")).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders as auto suggest <Input type='autoSuggest' /> with category", async () => {
    const { getByTestId } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="autoSuggest"
        autoSuggestCategory
        autoSuggestions={autoSuggestions}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, "Al");
    fireEvent(input, "focus");

    expect(
      getByTestId(
        "input-field-auto-suggest-dropdown-category-Europe_paragraph",
      ),
    ).toBeTruthy();
  });

  it("should fill input with selected suggestion", async () => {
    const country = "Albania";

    const { getByTestId } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="autoSuggest"
        autoSuggestions={autoSuggestions}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, "Al");
    fireEvent(input, "focus");

    const suggestion = getByTestId(`input-dropdown-suggestion-${country}`);

    fireEvent.press(suggestion);

    expect(input.props.value).toBe(country);
  });

  it("should call onSuggestionSelected callback when suggestion is selected", async () => {
    const country = "Albania";
    const onSuggestionSelected = jest.fn();

    const { getByTestId } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="autoSuggest"
        autoSuggestions={autoSuggestions}
        onSuggestionSelected={onSuggestionSelected}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, "Al");
    fireEvent(input, "focus");

    const suggestion = getByTestId(`input-dropdown-suggestion-${country}`);

    fireEvent.press(suggestion);

    expect(onSuggestionSelected).toHaveBeenCalled();
  });

  it("should present max 5 suggestions", async () => {
    const label = "AAA";
    const suggestions = [
      { text: "AAA", value: 1 },
      { text: "AAA", value: 2 },
      { text: "AAA", value: 3 },
      { text: "AAA", value: 4 },
      { text: "AAA", value: 5 },
      { text: "AAA", value: 6 },
      { text: "AAA", value: 7 },
    ];

    const { getByTestId, getAllByTestId } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="autoSuggest"
        autoSuggestions={suggestions}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, label);
    fireEvent(input, "focus");

    const suggestion = getAllByTestId(`input-dropdown-suggestion-${label}`);

    expect(suggestion.length).toBe(5);
  });

  it("renders correctly with suffix", () => {
    const { toJSON } = render(<Story {...Story.args} suffix="@odido.nl" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders as search <Input type='search' /> with dropdown open", async () => {
    const { getByTestId, getByText, toJSON } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="search"
        autoSuggestions={autoSuggestions}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, "Al");
    fireEvent(input, "focus");

    expect(getByTestId("input-field-auto-suggest-dropdown")).toBeTruthy();

    expect(getByText("Zoek op")).toBeTruthy();
    expect(getByText("Zoek op ‘Al’")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("should fill input with value and call callback onSearch while clicking Zoek op link click", async () => {
    const onSearch = jest.fn();

    const { getByTestId } = render(
      <Story
        {...Story.args}
        // @ts-expect-error
        type="search"
        onSearch={onSearch}
        autoSuggestions={autoSuggestions}
      />,
    );
    const input = getByTestId("input-field");

    fireEvent.changeText(input, "Al");
    fireEvent(input, "focus");

    expect(getByTestId("input-field-auto-suggest-dropdown")).toBeTruthy();

    const link = getByTestId("link");
    fireEvent.press(link);

    expect(onSearch).toHaveBeenCalled();
    expect(input.props.value).toBe("Al");
  });
});
