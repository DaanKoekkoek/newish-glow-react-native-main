import { fireEvent, render } from "_test-utils";
import React from "react";

import { NumberField } from "./NumberField";

describe("<NumberField />", () => {
  it("renders correctly a Number Field", () => {
    const { toJSON } = render(
      <NumberField onChange={(val) => console.log(val)} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("stops at max value", () => {
    const { getByTestId } = render(<NumberField max={10} />);
    const input = getByTestId("number-field");
    fireEvent(input, "change", { nativeEvent: { text: "11" } });
    expect(input.props.value).toBe("10");
  });

  it("stops at min value", () => {
    const { getByTestId } = render(<NumberField min={10} />);
    const input = getByTestId("number-field");
    fireEvent(input, "change", { nativeEvent: { text: "2" } });
    expect(input.props.value).toBe("10");
  });

  it("calls onChange", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<NumberField onChange={onChange} />);
    const input = getByTestId("number-field");
    fireEvent(input, "change", { nativeEvent: { text: "10" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("Allows input to be controlled", () => {
    const { getByTestId } = render(<NumberField value="10" />);
    const input = getByTestId("number-field");
    fireEvent(input, "change", { nativeEvent: { text: "20" } });
    expect(input.props.value).toBe("10");
  });

  it("Allows input to be uncontrolled", () => {
    const { getByTestId } = render(<NumberField defaultValue="10" />);
    const input = getByTestId("number-field");
    fireEvent(input, "change", { nativeEvent: { text: "20" } });
    expect(input.props.value).toBe("20");
  });

  it("Renders small size", () => {
    const { toJSON } = render(<NumberField size="sm" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("throws error when simultaneously controlled and uncontrolled", () => {
    expect(() => NumberField({ value: "10", defaultValue: "10" }));
  });

  it("throws error when initial value is lower than min or higher than man", () => {
    expect(() => NumberField({ min: 10, defaultValue: "5" }));
    expect(() => NumberField({ max: 10, defaultValue: "15" }));
  });

  it("throws error when invalid min", () => {
    expect(() => NumberField({ min: -5 }));
  });

  it("throws error when invalid max", () => {
    expect(() => NumberField({ max: -5 }));
  });
});
