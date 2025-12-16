import { NumberField } from "./NumberField";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<NumberField />", () => {
  it("renders correctly a Number Field", async () => {
    const { asFragment } = render(
      <NumberField onChange={(val) => console.log(val)} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls onChange", async () => {
    const onChange = jest.fn();
    render(<NumberField onChange={onChange} />);
    const input = screen.getByTestId("number-field");
    await userEvent.type(input, "10");
    expect(onChange).toHaveBeenCalled();
  });

  it("Allows input to be controlled", async () => {
    render(<NumberField value="10" />);
    const input = screen.getByTestId("number-field");
    await userEvent.type(input, "20");
    expect(input).toHaveDisplayValue("10");
  });

  it("Renders small size", async () => {
    const { asFragment } = render(<NumberField size="sm" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("throws error when invalid min", async () => {
    expect(async () => NumberField({ min: -5 }));
  });

  it("throws error when invalid max", async () => {
    expect(async () => NumberField({ max: -5 }));
  });
});
