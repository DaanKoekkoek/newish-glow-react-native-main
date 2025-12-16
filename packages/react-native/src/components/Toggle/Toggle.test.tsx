import { composeStory } from "@storybook/react";
import { render, fireEvent } from "_test-utils";
import React from "react";

import { Toggle } from "./Toggle";
import meta, { Basic } from "./Toggle.stories";

const Story = composeStory(Basic, meta);

describe("Toggle component", () => {
  it("toggle before pressed", () => {
    const { getByRole } = render(
      <Toggle
        ariaLabel="This is a label"
        onPress={() => console.log("test")}
      />,
    );

    expect(getByRole("switch").props["accessibilityState"].checked).toBe(false);
    expect(getByRole("switch").props["accessibilityLabel"]).toBe(
      "This is a label",
    );
  });

  it("toggles when pressed", () => {
    const { getByRole } = render(
      <Toggle ariaLabel="This is a label" onPress={jest.fn()} />,
    );

    fireEvent.press(getByRole("switch"));

    expect(getByRole("switch").props["accessibilityState"].checked).toBe(true);
  });

  it("fires onPress callback when pressed with selected state", () => {
    const mockOnPressHandler = jest.fn();

    const { getByRole } = render(
      <Toggle ariaLabel="This is a label" onPress={mockOnPressHandler} />,
    );

    fireEvent.press(getByRole("switch"));

    expect(mockOnPressHandler).toHaveBeenCalledWith(true, undefined);
  });

  it("renders correctly", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
