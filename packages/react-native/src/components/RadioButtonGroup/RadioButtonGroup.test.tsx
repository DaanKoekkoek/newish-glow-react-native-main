import { act, fireEvent, render } from "_test-utils";
import React from "react";

import { RadioButtonGroup } from "./RadioButtonGroup";
import type { RadioButtonGroupDirection } from "./RadioButtonGroup.types";

describe("RadioButtonGroup", () => {
  const mockDefaultProps = {
    accessibilityLabel: "unit-test",
    onPress: jest.fn(),
    options: [
      { id: "1", value: "1", label: "Option 1", testID: "radio-button-1" },
      { id: "2", value: "2", label: "Option 2", testID: "radio-button-2" },
      { id: "3", value: "3", label: "Option 3", testID: "radio-button-3" },
    ],
  };

  it("does not render if children are not provided", () => {
    const { queryByTestId } = render(
      <RadioButtonGroup {...mockDefaultProps} options={[]} />,
    );
    expect(queryByTestId("radio-button-group")).toBeNull();
  });

  it("does render if children provided", () => {
    const { queryByTestId } = render(
      <RadioButtonGroup {...mockDefaultProps} />,
    );
    expect(queryByTestId("radio-button-group")).toBeTruthy();
  });

  it("renders without legend if not provided via the props", () => {
    const { queryByTestId } = render(
      <RadioButtonGroup {...mockDefaultProps} />,
    );
    expect(queryByTestId("legend")).toBeNull();
  });

  it("renders with legend if provided via the props", () => {
    const { getByTestId } = render(
      <RadioButtonGroup {...mockDefaultProps} legend={{ text: "label" }} />,
    );
    expect(getByTestId("legend")).toBeTruthy();
  });

  it.each<RadioButtonGroupDirection>(["vertical", "horizontal"])(
    "renders with the radio buttons in the direction provided via the props: %s",
    (direction: RadioButtonGroupDirection) => {
      const { getByTestId } = render(
        <RadioButtonGroup
          {...mockDefaultProps}
          legend={{ text: "label" }}
          direction={direction}
        />,
      );

      expect(
        getByTestId("radio-button-group-wrapper").props.style.flexDirection,
      ).toBe(direction === "vertical" ? "column" : "row");
    },
  );

  it("renders without with error message if the state prop does not evaluate to 'error', although the 'errorMessage' prop is 'defined'", () => {
    const { queryByTestId } = render(
      <RadioButtonGroup
        {...mockDefaultProps}
        state="default"
        errorMessage="bar"
      />,
    );

    expect(queryByTestId("error-message")).toBeNull();
  });

  it("renders with error message if the 'state' prop evaluates to 'error' and the 'errorMessage' props is 'defined'", () => {
    const { getByText } = render(
      <RadioButtonGroup
        {...mockDefaultProps}
        state="error"
        errorMessage="bar"
      />,
    );

    expect(getByText("bar")).toBeTruthy();
  });

  it("renders without helper text if the 'helperText' prop is 'undefined'", () => {
    const { queryByTestId } = render(
      <RadioButtonGroup
        {...mockDefaultProps}
        state="default"
        helperText={undefined}
      />,
    );

    expect(queryByTestId("helper-text")).toBeNull();
  });

  it("renders without helper text if the 'state' prop evaluates to 'error' and the 'helperText' prop is 'defined'", () => {
    const { queryByTestId } = render(
      <RadioButtonGroup {...mockDefaultProps} state="error" helperText="bar" />,
    );

    expect(queryByTestId("helper-text")).toBeNull();
  });

  it("renders with helper text if the 'state' prop does not evaluate to 'error' and the 'helperText' prop is 'defined'", () => {
    const { getByText } = render(
      <RadioButtonGroup
        {...mockDefaultProps}
        state="default"
        helperText="bar"
      />,
    );

    expect(getByText("bar")).toBeTruthy();
  });

  it("handles onPress when a radio option got pressed", async () => {
    const { getByText } = render(
      <RadioButtonGroup
        {...mockDefaultProps}
        state="default"
        helperText="bar"
      />,
    );
    const radioButton1 = getByText("Option 1");
    const radioButton2 = getByText("Option 2");
    const radioButton3 = getByText("Option 3");

    expect(mockDefaultProps.onPress).not.toHaveBeenCalled();

    await act(() => {
      fireEvent.press(radioButton1);
    });

    expect(mockDefaultProps.onPress).toHaveBeenNthCalledWith(1, {
      id: "1",
      value: "1",
    });

    await act(() => {
      fireEvent.press(radioButton2);
    });

    expect(mockDefaultProps.onPress).toHaveBeenNthCalledWith(2, {
      id: "2",
      value: "2",
    });

    await act(() => {
      fireEvent.press(radioButton3);
    });

    expect(mockDefaultProps.onPress).toHaveBeenNthCalledWith(3, {
      id: "3",
      value: "3",
    });

    await act(() => {
      fireEvent.press(radioButton1);
    });

    expect(mockDefaultProps.onPress).toHaveBeenNthCalledWith(4, {
      id: "1",
      value: "1",
    });
  });

  it("renders with a default selection if one of the options has the 'checked' prop set to 'true'", () => {
    const { getAllByRole } = render(
      <RadioButtonGroup
        {...mockDefaultProps}
        options={[
          { id: "1", value: "1", label: "Option 1" },
          { id: "2", value: "2", label: "Option 2", checked: true },
          { id: "3", value: "3", label: "Option 3" },
        ]}
      />,
    );

    const [radioOne, radioTwo, radioThree] = getAllByRole("radio");

    expect(radioOne.props.accessibilityState.checked).toBeFalsy();
    expect(radioTwo.props.accessibilityState.checked).toBeTruthy();
    expect(radioThree.props.accessibilityState.checked).toBeFalsy();
  });

  it("renders without a default selection if none of the options has the 'checked' prop set to 'true'", () => {
    const { getAllByRole } = render(<RadioButtonGroup {...mockDefaultProps} />);

    const [radioOne, radioTwo, radioThree] = getAllByRole("radio");

    expect(radioOne.props.accessibilityState.checked).toBeFalsy();
    expect(radioTwo.props.accessibilityState.checked).toBeFalsy();
    expect(radioThree.props.accessibilityState.checked).toBeFalsy();
  });
});
