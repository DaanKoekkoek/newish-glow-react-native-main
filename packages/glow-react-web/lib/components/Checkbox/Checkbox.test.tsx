import { render, screen, fireEvent, within } from "@testing-library/react";

import { Checkbox } from "./Checkbox";
import { Paragraph } from "foundations/Paragraph";

describe("Checkbox component", () => {
  const defaultProps = {
    id: "id-here",
    onChange: () => {},
  };

  it("renders the checkbox if at least the 'id' and 'onChange' props are provided", () => {
    render(<Checkbox {...defaultProps} />);

    expect(screen.getByTestId("checkbox")).toBeDefined();
  });

  it("renders the checkbox with 'label' when the prop is provided", () => {
    render(<Checkbox {...defaultProps} label="foo" />);

    expect(screen.getByText("foo")).toBeDefined();
  });

  it("renders with the 'checked' prop state expressed", () => {
    render(<Checkbox {...defaultProps} checked />);

    expect(screen.getByTestId("checkbox")).not.toHaveClass("is-indeterminate");
  });

  it("renders with the 'indeterminate' prop state expressed", () => {
    render(<Checkbox {...defaultProps} indeterminate />);

    expect(screen.getByTestId("checkbox")).toHaveClass("is-indeterminate");
  });

  it("renders without legend if the 'legend' prop is 'undefined'", () => {
    render(<Checkbox {...defaultProps} />);

    expect(screen.queryByTestId("legend-container")).toBeNull();
  });

  it("renders legend if the 'legend' prop is 'defined'", () => {
    render(<Checkbox {...defaultProps} legend={{ label: "bar" }} />);

    expect(screen.getByText("bar")).toBeDefined();
  });

  it("handles the 'onPress' event correctly", () => {
    const onChangeMock = jest.fn();

    const { rerender } = render(
      <Checkbox {...defaultProps} onChange={onChangeMock} />,
    );
    const checkboxLabel = screen.getByRole("checkbox");

    expect(onChangeMock).toHaveBeenCalledTimes(0);

    fireEvent.click(checkboxLabel);

    expect(onChangeMock).toHaveBeenNthCalledWith(1, {
      id: "id-here",
      checked: true,
    });

    rerender(<Checkbox {...defaultProps} checked onChange={onChangeMock} />);

    fireEvent.click(checkboxLabel);

    expect(onChangeMock).toHaveBeenNthCalledWith(2, {
      id: "id-here",
      checked: false,
    });
  });

  it("renders with the error message if the state evaluates to 'error' and the 'errorMessage' prop is defined", () => {
    render(<Checkbox {...defaultProps} errorMessage="bar" state="error" />);

    expect(screen.getByText("bar")).toBeDefined();
  });

  it("renders with the 'inactive' state expressed", () => {
    const onChangeMock = jest.fn();

    render(
      <Checkbox {...defaultProps} state="inactive" onChange={onChangeMock} />,
    );
    const checkboxElement = screen.getByRole("checkbox");

    fireEvent.click(checkboxElement);

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("renders without helper text if the 'helperText' prop is 'undefined'", () => {
    render(<Checkbox {...defaultProps} helperText={undefined} />);
    expect(screen.queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders without helper text if the 'state' prop evaluates to 'error' and the 'helperText' prop is 'defined'", () => {
    render(<Checkbox {...defaultProps} state="error" helperText="bar" />);
    expect(screen.queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders with helper text if the 'state' prop does not evaluate to 'error' and the 'helperText' prop is 'defined'", () => {
    render(<Checkbox state="default" {...defaultProps} helperText="bar" />);
    expect(screen.getByText("bar")).toBeDefined();
  });

  it("renders the string label inside the Pressable", () => {
    render(
      <Checkbox
        id="checkbox-id"
        label="Checkbox Label"
        onChange={jest.fn()}
        checked={false}
        testID="checkbox-test"
      />,
    );

    const labelElement = screen.getByText("Checkbox Label");

    expect(labelElement).toBeTruthy();
  });

  test("renders the JSX label outside the Pressable", () => {
    render(
      <Checkbox
        id="checkbox-id"
        label={<Paragraph>This is a custom label</Paragraph>}
        onChange={jest.fn()}
        checked={false}
        testID="checkbox-test"
      />,
    );

    const pressableElement = screen.getByRole("checkbox");

    const labelElement = screen.getByText("This is a custom label");

    expect(() =>
      within(pressableElement).getByText("This is a custom label"),
    ).toThrow();
    expect(labelElement).toBeTruthy();
  });

  // Snapshot tests
  describe("Checkbox snapshots", () => {
    it("renders basic checkbox correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-basic"
          label="Basic checkbox"
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders checked checkbox correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-checked"
          label="Checked checkbox"
          checked={true}
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders indeterminate checkbox correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-indeterminate"
          label="Indeterminate checkbox"
          indeterminate={true}
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders error state checkbox correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-error"
          label="Error checkbox"
          state="error"
          errorMessage="This is an error message"
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders inactive state checkbox correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-inactive"
          label="Inactive checkbox"
          state="inactive"
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders checkbox with legend correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-legend"
          label="Checkbox with legend"
          legend={{
            label: "Legend label",
            optionalText: "Optional",
          }}
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders checkbox with helper text correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-helper"
          label="Checkbox with helper text"
          helperText="This is helper text"
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders checkbox with JSX label correctly", () => {
      const { container } = render(
        <Checkbox
          id="checkbox-snapshot-jsx-label"
          label={<Paragraph>This is a JSX label</Paragraph>}
          onChange={jest.fn()}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
