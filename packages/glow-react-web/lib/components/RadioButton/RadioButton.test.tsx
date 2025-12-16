import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioButton } from "./RadioButton";

describe("<RadioButton />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(
      <RadioButton id="radio-id" label="Option 1" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the label correctly", () => {
    render(<RadioButton id="radio-id" label="Option 1" />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("renders the input with the correct attributes", () => {
    render(<RadioButton id="radio-id" name="radio-group" checked />);
    const input = screen.getByRole("radio");
    expect(input).toHaveAttribute("id", "radio-id");
    expect(input).toHaveAttribute("name", "radio-group");
    expect(input).toBeChecked();
  });

  it("calls onChange when clicked", async () => {
    const onChangeMock = jest.fn();
    render(<RadioButton id="radio-id" onChange={onChangeMock} />);

    await userEvent.click(screen.getByRole("radio"));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("disables the radio button when disabled prop is true", () => {
    render(<RadioButton id="radio-id" disabled />);
    const input = screen.getByRole("radio");
    expect(input).toBeDisabled();
  });

  it("applies the error class when errorMessage is provided", () => {
    render(<RadioButton id="radio-id" validated={{ valid: false }} />);
    expect(screen.getByTestId("radio-button-label")).toHaveClass("has-error");
  });
});
