import { render, fireEvent, within } from "_test-utils";
import { Paragraph } from "foundations/Paragraph";
import React from "react";

import { Checkbox } from "./Checkbox";

describe("Checkbox component", () => {
  const defaultProps = {
    id: "id-here",
    onPress: () => {},
  };

  it("renders the checkbox if at least the 'id' and 'onPress' props are provided", () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} />);

    expect(getByTestId("checkbox")).toBeDefined();
  });

  it("renders the checkbox with 'label' when the prop is provided", () => {
    const { getByText } = render(<Checkbox {...defaultProps} label="foo" />);

    expect(getByText("foo")).toBeDefined();
  });

  it("renders with the 'unchecked' checked prop state expressed", () => {
    const { queryByTestId } = render(<Checkbox {...defaultProps} />);

    expect(queryByTestId("checkmark-icon")).toBeNull();
  });

  it("renders with the 'checked' prop state expressed", () => {
    const { getByTestId } = render(<Checkbox {...defaultProps} checked />);

    expect(getByTestId("checkmark-icon")).toBeDefined();
  });

  it("renders with the 'indeterminate' prop state expressed", () => {
    const { queryByTestId } = render(
      <Checkbox {...defaultProps} indeterminate={false} />,
    );

    expect(queryByTestId("checkmark-icon")).toBeNull();
  });

  it("renders with the 'indeterminate' prop state expressed", () => {
    const { getByTestId } = render(
      <Checkbox {...defaultProps} indeterminate />,
    );

    expect(getByTestId("min-icon")).toBeDefined();
  });

  it("renders without legend if the 'legend' prop is 'undefined'", () => {
    const { queryByTestId } = render(<Checkbox {...defaultProps} />);

    expect(queryByTestId("legend-container")).toBeNull();
  });

  it("renders legend if the 'legend' prop is 'defined'", () => {
    const { getByText } = render(
      <Checkbox {...defaultProps} legend={{ text: "bar" }} />,
    );

    expect(getByText("bar")).toBeDefined();
  });

  it("handles the 'onPress' event correctly", () => {
    const onPressMock = jest.fn();

    const { getByRole, rerender } = render(
      <Checkbox {...defaultProps} onPress={onPressMock} />,
    );
    const checkboxLabel = getByRole("checkbox");

    expect(onPressMock).toHaveBeenCalledTimes(0);

    fireEvent.press(checkboxLabel);

    expect(onPressMock).toHaveBeenNthCalledWith(1, {
      id: "id-here",
      checked: true,
    });

    rerender(<Checkbox {...defaultProps} checked onPress={onPressMock} />);

    fireEvent.press(checkboxLabel);

    expect(onPressMock).toHaveBeenNthCalledWith(2, {
      id: "id-here",
      checked: false,
    });
  });

  it("renders without the error message if the state does not evaluate to 'error' and the 'errorMessage' prop is defined", () => {
    const { queryByTestId } = render(
      <Checkbox {...defaultProps} errorMessage="bar" />,
    );

    expect(queryByTestId("error-message-container")).toBeNull();
  });

  it("renders with the error message if the state evaluates to 'error' and the 'errorMessage' prop is defined", () => {
    const { getByText } = render(
      <Checkbox {...defaultProps} errorMessage="bar" state="error" />,
    );

    expect(getByText("bar")).toBeDefined();
  });

  it("renders with the 'inactive' state expressed", () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Checkbox {...defaultProps} state="inactive" onPress={onPressMock} />,
    );
    const checkboxElement = getByRole("checkbox");

    fireEvent.press(checkboxElement);

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders without helper text if the 'helperText' prop is 'undefined'", () => {
    const { queryByTestId } = render(
      <Checkbox {...defaultProps} helperText={undefined} />,
    );
    expect(queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders without helper text if the 'state' prop evaluates to 'error' and the 'helperText' prop is 'defined'", () => {
    const { queryByTestId } = render(
      <Checkbox {...defaultProps} state="error" helperText="bar" />,
    );
    expect(queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders with helper text if the 'state' prop does not evaluate to 'error' and the 'helperText' prop is 'defined'", () => {
    const { getByText } = render(
      <Checkbox state="default" {...defaultProps} helperText="bar" />,
    );
    expect(getByText("bar")).toBeDefined();
  });

  it("renders the string label inside the Pressable", () => {
    const { getByRole } = render(
      <Checkbox
        id="checkbox-id"
        label="Checkbox Label"
        onPress={jest.fn()}
        checked={false}
        testID="checkbox-test"
      />,
    );

    const pressableElement = getByRole("checkbox");

    expect(within(pressableElement).getByText("Checkbox Label")).toBeTruthy();
  });

  test("renders the JSX label outside the Pressable", () => {
    const { getByRole, getByText } = render(
      <Checkbox
        id="checkbox-id"
        label={<Paragraph>This is a custom label</Paragraph>}
        onPress={jest.fn()}
        checked={false}
        testID="checkbox-test"
      />,
    );

    const pressableElement = getByRole("checkbox");

    const labelElement = getByText("This is a custom label");

    expect(() =>
      within(pressableElement).getByText("This is a custom label"),
    ).toThrow();
    expect(labelElement).toBeTruthy();
  });
});
