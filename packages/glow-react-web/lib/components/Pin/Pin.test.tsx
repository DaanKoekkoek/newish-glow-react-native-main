import { fireEvent, render, screen } from "@testing-library/react";
import { PinCode } from "./Pin";
import { PinSlot } from "./PinSlot";
import { PinProps } from "./Pin.types";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const onCompleted = jest.fn();

const defaultProps = {
  children: (
    <>
      <PinSlot index={0} />
      <PinSlot index={1} />
      <PinSlot index={2} />
      <PinSlot index={3} />
    </>
  ),
  errorMessage: "ErrorMessage",
  loadingMessage: "LoadingMessage",
  maxLength: 4,
  onCompleted,
  successMessage: "SuccessMessage",
} satisfies PinProps;

describe("<Pin />", () => {
  it("renders a 4 digit Pin component", () => {
    render(
      <PinCode code="0123" maxLength={4}>
        <PinSlot index={0} />
        <PinSlot index={1} />
        <PinSlot index={2} />
        <PinSlot index={3} />
      </PinCode>,
    );

    expect(screen.getByText("0")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.queryByText("4")).toBeNull();
  });

  it("renders a 5 digit Pin component", () => {
    render(
      <PinCode code="01234" maxLength={5}>
        <PinSlot index={0} />
        <PinSlot index={1} />
        <PinSlot index={2} />
        <PinSlot index={3} />
        <PinSlot index={4} />
      </PinCode>,
    );

    expect(screen.getByText("0")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.queryByText("5")).toBeNull();
  });

  it("renders a 6 digit Pin component", () => {
    render(
      <PinCode code="012345" maxLength={6}>
        <PinSlot index={0} />
        <PinSlot index={1} />
        <PinSlot index={2} />
        <PinSlot index={3} />
        <PinSlot index={4} />
        <PinSlot index={5} />
      </PinCode>,
    );

    expect(screen.getByText("0")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("4")).toBeDefined();
    expect(screen.getByText("5")).toBeDefined();
    expect(screen.queryByText("6")).toBeNull();
  });

  it("only renders errorMessage", () => {
    render(<PinCode state="error" {...defaultProps} />);

    expect(screen.getByText(defaultProps.errorMessage)).toBeDefined();
    expect(screen.queryByText(defaultProps.loadingMessage)).toBeNull();
    expect(screen.queryByText(defaultProps.successMessage)).toBeNull();
  });

  it("only renders loadingMessage", () => {
    render(<PinCode state="loading" {...defaultProps} />);

    expect(screen.getByText(defaultProps.loadingMessage)).toBeDefined();
    expect(screen.queryByText(defaultProps.errorMessage)).toBeNull();
    expect(screen.queryByText(defaultProps.successMessage)).toBeNull();
  });

  it("only renders successMessage", () => {
    render(<PinCode state="success" {...defaultProps} />);

    expect(screen.getByText(defaultProps.successMessage)).toBeDefined();
    expect(screen.queryByText(defaultProps.errorMessage)).toBeNull();
    expect(screen.queryByText(defaultProps.loadingMessage)).toBeNull();
  });

  it("only calls onCompleted when pin is complete", () => {
    render(<PinCode data-testid="pin" {...defaultProps} />);

    const input = screen.getByTestId("pin");

    fireEvent.change(input, { target: { value: "987" } });

    expect(input).toHaveValue("987");
    expect(onCompleted).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: "9876" } });

    expect(input).toHaveValue("9876");
    expect(onCompleted).toHaveBeenCalledTimes(1);
  });

  it("only accepts numeric values as default", () => {
    render(<PinCode data-testid="pin" {...defaultProps} />);

    const input = screen.getByTestId("pin");

    fireEvent.change(input, { target: { value: "9" } });
    fireEvent.change(input, { target: { value: "abcd" } });

    expect(input).toHaveValue("9");
  });

  it("can be altered to accept alphanumeric values", () => {
    render(
      <PinCode
        data-testid="pin"
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        {...defaultProps}
      />,
    );

    const input = screen.getByTestId("pin");

    fireEvent.change(input, { target: { value: "xy8z" } });

    expect(input).toHaveValue("xy8z");
  });

  it("hides the input visually when masked", () => {
    render(<PinCode data-testid="pin" masked {...defaultProps} />);

    const input = screen.getByTestId("pin");

    fireEvent.change(input, { target: { value: "8765" } });
    const masked_4 = screen.queryAllByText("●");
    expect(masked_4.length).toEqual(4);
    expect(screen.queryByText("8")).toBeNull();

    fireEvent.change(input, { target: { value: "23" } });
    const masked_2 = screen.queryAllByText("●");
    expect(masked_2.length).toEqual(2);
    expect(screen.queryByText("2")).toBeNull();
  });
});
