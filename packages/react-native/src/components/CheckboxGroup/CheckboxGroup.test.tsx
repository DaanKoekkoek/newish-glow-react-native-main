import { render } from "_test-utils";
import React from "react";

import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox";

describe("CheckboxGroup", () => {
  const defaultCheckboxProps = {
    label: "foo",
    id: "id-here",
    onPress: () => {},
  };

  it("does not render if children are not provided", () => {
    const { queryByTestId } = render(<CheckboxGroup />);
    expect(queryByTestId("checkbox-group-container")).toBeFalsy();
  });

  it("renders without legend if not provided via the props", () => {
    const { queryByTestId } = render(
      <CheckboxGroup>
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(queryByTestId("legend-container")).toBeFalsy();
  });

  it("renders with legend if provided via the props", () => {
    const { getByText } = render(
      <CheckboxGroup legend={{ text: "bar" }}>
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(getByText("bar")).toBeDefined();
  });

  it("renders without with error message if the state prop does not evaluate to 'error', although the 'errorMessage' prop is 'defined'", () => {
    const { queryByTestId } = render(
      <CheckboxGroup state="default" errorMessage="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(queryByTestId("error-message-container")).toBeFalsy();
  });

  it("renders with error message if the 'state' prop evaluates to 'error' and the 'errorMessage' props is 'defined'", () => {
    const { getByText } = render(
      <CheckboxGroup state="error" errorMessage="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(getByText("bar")).toBeDefined();
  });

  it("renders without helper text if the 'helperText' prop is 'undefined'", () => {
    const { queryByTestId } = render(
      <CheckboxGroup state="default" helperText={undefined}>
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders without helper text if the 'state' prop evaluates to 'error' and the 'helperText' prop is 'defined'", () => {
    const { queryByTestId } = render(
      <CheckboxGroup state="error" helperText="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders with helper text if the 'state' prop does not evaluate to 'error' and the 'helperText' prop is 'defined'", () => {
    const { getByText } = render(
      <CheckboxGroup state="default" helperText="bar">
        <Checkbox {...defaultCheckboxProps} checked />
        <Checkbox {...defaultCheckboxProps} />
      </CheckboxGroup>,
    );
    expect(getByText("bar")).toBeDefined();
  });
});
