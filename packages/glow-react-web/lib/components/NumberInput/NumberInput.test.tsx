import { NumberInput } from "./";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<NumberInput />", () => {
  it("renders correctly a Number input", () => {
    const { asFragment } = render(
      <NumberInput
        testID="input-number-field"
        onChange={(val) => console.log(val)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders controls", () => {
    render(<NumberInput testID="input-number-field" />);
    const buttons = screen.getAllByTestId("number-input-button");
    expect(buttons.length).toBe(2);
  });

  it("calls onIncrement", async () => {
    const onIncrement = jest.fn();
    render(
      <NumberInput
        testID="input-number-field"
        value={10}
        onIncrement={onIncrement}
      />,
    );
    const buttons = screen.getAllByTestId("number-input-button");
    await userEvent.click(buttons[1]);
    expect(onIncrement).toHaveBeenCalledWith(11);
  });

  it("calls onDecrement", async () => {
    const onDecrement = jest.fn();
    render(
      <NumberInput
        testID="input-number-field"
        value={10}
        onDecrement={onDecrement}
      />,
    );
    const buttons = screen.getAllByTestId("number-input-button");
    await userEvent.click(buttons[0]);
    expect(onDecrement).toHaveBeenCalledWith(9);
  });

  it("calls onChange when incremented", async () => {
    const onChange = jest.fn();
    render(
      <NumberInput
        testID="input-number-field"
        value={10}
        onChange={onChange}
      />,
    );
    const buttons = screen.getAllByTestId("number-input-button");
    await userEvent.click(buttons[1]);
    expect(onChange).toHaveBeenCalledWith(11);
  });

  it("calls onChange when decremented", async () => {
    const onChange = jest.fn();
    render(
      <NumberInput
        testID="input-number-field"
        value="10"
        onChange={onChange}
      />,
    );
    const buttons = screen.getAllByTestId("number-input-button");
    await userEvent.click(buttons[0]);
    expect(onChange).toHaveBeenCalledWith(9);
  });

  it("renders small size", () => {
    const { asFragment } = render(<NumberInput size="sm" />);
    expect(asFragment()).toMatchSnapshot();
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
