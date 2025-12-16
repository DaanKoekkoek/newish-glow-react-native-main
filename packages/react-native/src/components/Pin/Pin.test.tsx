import { render, fireEvent } from "_test-utils";
import React from "react";
import "@testing-library/react-native/extend-expect";
import "@testing-library/jest-dom";

import { Pin } from "./";
import type { PinCodeSequence, PinInputLength } from "./Pin.types";

describe("<Pin />", () => {
  it("renders correctly a 4 length Pin component", () => {
    const { toJSON } = render(
      <Pin length={4} onCompleted={(sec: PinCodeSequence) => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly a 5 length Pin component", () => {
    const { toJSON } = render(
      <Pin length={5} onCompleted={(sec: PinCodeSequence) => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly a 6 length Pin component", () => {
    const { toJSON } = render(
      <Pin length={6} onCompleted={(sec: PinCodeSequence) => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should call the onComplete callback if the pin is complete", () => {
    const mockValues = ["0", "1", "2", "3"];
    const mockCompleteHandler = jest.fn();
    const pinLength = mockValues.length as PinInputLength;

    const { getByTestId } = render(
      <Pin length={pinLength} onCompleted={mockCompleteHandler} />,
    );

    for (let i = 0; i < pinLength; i++) {
      const textInput = getByTestId(`pincode-${i}_number-field`);

      // Simulate typing text into the TextInput
      fireEvent(textInput, "keyPress", { nativeEvent: { key: mockValues[i] } });
    }

    expect(mockCompleteHandler).toHaveBeenCalledWith(mockValues);
  });

  it("should render helper messages in error state", () => {
    const errorMessage = "error!";

    const { getByTestId } = render(
      <Pin length={4} errorMessage={errorMessage} state="error" />,
    );

    const helperMessage = getByTestId("error-text");

    expect(helperMessage).toBeVisible();
  });

  it("should render helper messages in success state", () => {
    const successMessage = "success!";

    const { getByTestId } = render(
      <Pin length={4} successMessage={successMessage} state="success" />,
    );

    const helperMessage = getByTestId("success-text");

    expect(helperMessage).toBeVisible();
  });

  it("should call the onComplete callback only if all values are set", () => {
    const mockValues = ["0", "", "", "3"];
    const mockCompleteHandler = jest.fn();
    const pinLength = mockValues.length as PinInputLength;

    const { getByTestId } = render(
      <Pin length={pinLength} onCompleted={mockCompleteHandler} />,
    );

    for (let i = 0; i < pinLength; i++) {
      const textInput = getByTestId(`pincode-${i}_number-field`);

      fireEvent(textInput, "keyPress", { nativeEvent: { key: mockValues[i] } });
    }

    expect(mockCompleteHandler).not.toHaveBeenCalled();
  });

  it("should ONLY accept aphanumeric values", () => {
    const mockValues = ["a", "1", "#", "3"];
    const mockCompleteHandler = jest.fn();
    const pinLength = mockValues.length as PinInputLength;

    const { getByTestId } = render(
      <Pin length={pinLength} onCompleted={mockCompleteHandler} />,
    );

    for (let i = 0; i < pinLength; i++) {
      const textInput = getByTestId(`pincode-${i}_number-field`);

      fireEvent(textInput, "keyPress", { nativeEvent: { key: mockValues[i] } });
    }

    expect(mockCompleteHandler).not.toHaveBeenCalled();
  });

  it("should accepted pasted code and fire the onComplete callback", () => {
    const mockPastedCode = "1234";
    const mockCompleteHandler = jest.fn();
    const pinLength = mockPastedCode.length as PinInputLength;

    const { getByTestId } = render(
      <Pin length={pinLength} onCompleted={mockCompleteHandler} />,
    );

    const textInput = getByTestId("pincode-0_number-field");
    fireEvent(textInput, "onChange", {
      nativeEvent: { inputType: "insertFromPaste", text: mockPastedCode },
    });

    expect(mockCompleteHandler).toHaveBeenCalledWith([...mockPastedCode]);
  });
});
