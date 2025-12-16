import { composeStory } from "@storybook/react";
import { render, fireEvent } from "_test-utils";
import React from "react";

import meta, { Basic } from "./Select.stories";

const Story = composeStory(Basic, meta);

describe("Select", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays the correct state", () => {
    const { getByTestId } = render(
      <Story
        {...Story.args}
        validated={{ success: false, message: "boo boo" }}
      />,
    );
    expect(getByTestId("error-text"));
    expect(getByTestId("select_input-container").props.style.borderColor).toBe(
      "#f5463b",
    );
  });

  it("onValueChange callback fired when option selected", () => {
    const { getByTestId } = render(
      <Story
        options={[
          { value: "Option 1", label: "Option 1", testID: "opt1" },
          { value: "Option 2", label: "Option 2", testID: "opt2" },
          { value: "Option 3", label: "Option 3", testID: "opt3" },
        ]}
      />,
    );

    fireEvent.press(getByTestId("select_input-field"));
    const picker = getByTestId("select");

    fireEvent(picker, "onValueChange", "Option 1");
    expect(picker.props.selectedIndex).toStrictEqual(1);

    fireEvent(picker, "onValueChange", "Option 2");
    expect(picker.props.selectedIndex).toStrictEqual(2);
  });
});
