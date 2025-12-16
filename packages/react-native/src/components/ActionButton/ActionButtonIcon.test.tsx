import { composeStory } from "@storybook/react";
import { render, fireEvent } from "_test-utils";
import React from "react";

import meta, { Basic, Emphasised } from "./ActionButtonIcon.stories";

const ActionButtonIconDefault = composeStory(Basic, meta);
const ActionButtonIconEmphasised = composeStory(Emphasised, meta);

describe("<ActionButtonIcon />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<ActionButtonIconDefault {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("triggers the onPress callback", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ActionButtonIconDefault {...Basic.args} onPress={mockOnPress} />,
    );
    fireEvent(getByTestId("button"), "click");
    expect(mockOnPress).toHaveBeenCalled();
  });

  it("applies emphasised prominence", () => {
    const { getByTestId } = render(
      <ActionButtonIconEmphasised {...Emphasised.args} />,
    );
    expect(getByTestId("button-visual").props["style"].backgroundColor).toBe(
      "#1b5ee4",
    );
  });
});
