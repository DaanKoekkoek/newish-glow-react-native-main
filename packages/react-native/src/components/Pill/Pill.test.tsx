import { fireEvent, render, screen } from "_test-utils";
import React from "react";

import { Pill } from "./Pill";

describe("Given <Pill /> component", () => {
  it("renders correctly default Pill variant", () => {
    const { toJSON } = render(<Pill title="pill title" value="value" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly logo Pill variant", () => {
    const { toJSON } = render(
      <Pill variant="logo" brand="Apple" value="value" />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly disabled Pill variant", () => {
    const { toJSON } = render(
      <Pill variant="logo" brand="Apple" value="value" disabled />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("set selection and call onChange when pressed", () => {
    const onChange = jest.fn();
    const value = "pill value";
    const testID = "pill test";
    const { toJSON } = render(
      <Pill
        testID={testID}
        variant="logo"
        brand="Apple"
        value={value}
        onChange={onChange}
      />,
    );
    const pill = screen.getByTestId(testID);
    fireEvent.press(pill);
    expect(onChange).toHaveBeenCalledWith(value);
    expect(toJSON()).toMatchSnapshot();
  });

  it("don't set selection and call don't onChange when pressed and disabled", () => {
    const onChange = jest.fn();
    const value = "pill value";
    const testID = "pill";
    const { toJSON } = render(
      <Pill
        variant="logo"
        disabled
        brand="Apple"
        value={value}
        onChange={onChange}
        testID={testID}
      />,
    );
    const pill = screen.getByTestId(testID);
    fireEvent.press(pill);
    expect(onChange).not.toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });
});
