import { composeStory } from "@storybook/react";
import { render, fireEvent } from "_test-utils";
import React from "react";

import meta, { Basic, Success, Error } from "./TimePicker.stories";

const BasicStory = composeStory(Basic, meta);
const SucessStory = composeStory(Success, meta);
const ErrorStory = composeStory(Error, meta);

describe.each([
  ["Basic", BasicStory],
  ["Error", SucessStory],
  ["Success", ErrorStory],
])("%s TimePicker", (_, Story) => {
  test("renders a stable snapshot", () => {
    const { toJSON } = render(<Story {...Story.args} />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("Select", () => {
  it("onValueChange callback fired when both options are selected", () => {
    const expectedSelectedTime = {
      hours: "12",
      minutes: "30",
    };
    const changeHandler = jest.fn();
    const { getByTestId } = render(
      <BasicStory {...BasicStory.args} onValueChange={changeHandler} />,
    );

    fireEvent.press(getByTestId("timePicker-hours_select_input-field"));
    const hoursPicker = getByTestId("timePicker-hours_select");

    fireEvent(hoursPicker, "onValueChange", expectedSelectedTime.hours);

    fireEvent.press(getByTestId("timePicker-minutes_select_input-field"));
    const minutesPicker = getByTestId("timePicker-minutes_select");

    fireEvent(minutesPicker, "onValueChange", expectedSelectedTime.minutes);

    expect(changeHandler).toHaveBeenCalledWith(expectedSelectedTime);
  });
});
