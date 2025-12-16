import { render, screen } from "@testing-library/react";

import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox";

describe("CheckboxGroup", () => {
  const defaultCheckboxProps = {
    label: "foo",
    id: "id-here",
    onChange: jest.fn(),
  };

  it("does not render if children are not provided", () => {
    render(<CheckboxGroup />);
    expect(screen.queryByTestId("checkbox-group")).toBeFalsy();
  });

  it("renders without legend if not provided via the props", () => {
    render(
      <CheckboxGroup>
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.queryByTestId("checkbox-legend")).toBeFalsy();
  });

  it("renders with legend if provided via the props", () => {
    render(
      <CheckboxGroup legend={{ label: "bar" }}>
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.getByText("bar")).toBeDefined();
  });

  it("renders without error message if the state prop does not evaluate to 'error', although the 'errorMessage' prop is provided", () => {
    render(
      <CheckboxGroup state="default" errorMessage="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.queryByTestId("error-message-container")).toBeFalsy();
  });

  it("renders with error message if the 'state' prop evaluates to 'error' and the 'errorMessage' props is provided", () => {
    render(
      <CheckboxGroup state="error" errorMessage="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.getByText("bar")).toBeDefined();
  });

  it("renders without helper text if the 'helperText' prop is 'undefined'", () => {
    render(
      <CheckboxGroup state="default" helperText={undefined}>
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders without helper text if the 'state' prop evaluates to 'error' and the 'helperText' prop is provided", () => {
    render(
      <CheckboxGroup state="error" helperText="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders with helper text if the 'state' prop does not evaluate to 'error' and the 'helperText' prop is provided", () => {
    render(
      <CheckboxGroup state="default" helperText="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(screen.getByText("bar")).toBeDefined();
  });
});
