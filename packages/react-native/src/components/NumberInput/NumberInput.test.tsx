import { fireEvent, render } from "_test-utils";
import React from "react";

import { NumberInput } from "./";

describe("<NumberInput />", () => {
  it("renders correctly a Number input", () => {
    const { toJSON } = render(
      <NumberInput onChange={(val) => console.log(val)} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders controls", () => {
    const { getAllByTestId } = render(<NumberInput />);
    const buttons = getAllByTestId("number-input_button");
    expect(buttons.length).toBe(2);
  });

  it("increments", () => {
    const { getAllByTestId, getByTestId } = render(<NumberInput min={0} />);
    const input = getByTestId("number-input_number-field");
    const buttons = getAllByTestId("number-input_button");
    fireEvent.press(buttons[1]);
    fireEvent.press(buttons[1]);
    fireEvent.press(buttons[1]);
    expect(input.props.value).toBe("3");
  });

  it("decrements", () => {
    const { getAllByTestId, getByTestId } = render(
      <NumberInput defaultValue="10" />,
    );
    const input = getByTestId("number-input_number-field");
    const buttons = getAllByTestId("number-input_button");
    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[0]);
    expect(input.props.value).toBe("7");
  });

  it("increments by step", () => {
    const { getAllByTestId, getByTestId } = render(
      <NumberInput min={0} step={5} />,
    );
    const input = getByTestId("number-input_number-field");
    const buttons = getAllByTestId("number-input_button");
    fireEvent.press(buttons[1]);
    fireEvent.press(buttons[1]);
    fireEvent.press(buttons[1]);
    expect(input.props.value).toBe("15");
  });

  it("decrements by step", () => {
    const { getAllByTestId, getByTestId } = render(
      <NumberInput defaultValue="25" step={4} />,
    );
    const input = getByTestId("number-input_number-field");
    const buttons = getAllByTestId("number-input_button");
    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[0]);
    fireEvent.press(buttons[0]);
    expect(input.props.value).toBe("13");
  });

  it("calls onIncrement", () => {
    const onIncrement = jest.fn();
    const { getAllByTestId } = render(
      <NumberInput defaultValue="10" onIncrement={onIncrement} />,
    );
    const buttons = getAllByTestId("number-input_button");
    fireEvent(buttons[1], "press");
    expect(onIncrement).toHaveBeenCalled();
  });

  it("calls onDecrement", () => {
    const onDecrement = jest.fn();
    const { getAllByTestId } = render(
      <NumberInput defaultValue="10" onDecrement={onDecrement} />,
    );
    const buttons = getAllByTestId("number-input_button");
    fireEvent(buttons[0], "press");
    expect(onDecrement).toHaveBeenCalled();
  });

  it("calls onChange when incremented", () => {
    const onChange = jest.fn();
    const { getAllByTestId } = render(
      <NumberInput defaultValue="10" onChange={onChange} />,
    );
    const buttons = getAllByTestId("number-input_button");
    fireEvent(buttons[1], "press");
    expect(onChange).toHaveBeenCalled();
  });

  it("calls onChange when decremented", () => {
    const onChange = jest.fn();
    const { getAllByTestId } = render(
      <NumberInput defaultValue="10" onChange={onChange} />,
    );
    const buttons = getAllByTestId("number-input_button");
    fireEvent(buttons[0], "press");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders small size", () => {
    const { toJSON } = render(<NumberInput size="sm" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("throws error when simultaneously controlled and uncontrolled", () => {
    expect(() => NumberInput({ value: 10, defaultValue: "10" }));
  });

  it("throws error when initial value is lower than min or higher than man", () => {
    expect(() => NumberInput({ min: 10, defaultValue: "5" }));
    expect(() => NumberInput({ max: 10, defaultValue: "15" }));
  });

  it("throws error when invalid min", () => {
    expect(() => NumberInput({ min: -5 }));
  });

  it("throws error when invalid max", () => {
    expect(() => NumberInput({ max: -5 }));
  });
});
