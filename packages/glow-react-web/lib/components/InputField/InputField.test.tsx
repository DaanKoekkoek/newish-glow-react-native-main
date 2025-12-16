import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import meta, { Basic } from "./InputField.stories";
import { InputField } from "./InputField";

const Story = composeStory(Basic, meta);

describe("<InputField />", () => {
  it("renders correctly empty", () => {
    const { container } = render(<Story {...Story.args} />);

    expect(container).toMatchSnapshot();
  });

  it("renders correctly with value", () => {
    const testID = "inputField";
    const value = "test value";

    render(<Story {...Story.args} testID={testID} value={value} />);

    const inputField = screen.getByTestId(testID);

    expect(inputField).toHaveDisplayValue(value);
  });

  it("onChange callback is called", async () => {
    const testID = "inputField";
    const mockOnChange = jest.fn();

    render(
      <InputField id="input-field" testID={testID} onChange={mockOnChange} />,
    );

    const inputField = screen.getByTestId(testID);

    expect(mockOnChange).not.toHaveBeenCalled();

    await userEvent.type(inputField, "change");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("onFocus callback is called", async () => {
    const testID = "inputField";
    const mockOnFocus = jest.fn();

    render(
      <InputField id="input-field" testID={testID} onFocus={mockOnFocus} />,
    );

    const inputField = screen.getByTestId(testID);

    expect(mockOnFocus).not.toHaveBeenCalled();

    await userEvent.click(inputField);

    expect(mockOnFocus).toHaveBeenCalled();
  });

  it("onBlur callback is called", async () => {
    const testID = "inputField";
    const mockOnBlur = jest.fn();

    render(<InputField id="input-field" testID={testID} onBlur={mockOnBlur} />);

    const inputField = screen.getByTestId(testID);

    expect(mockOnBlur).not.toHaveBeenCalled();

    await userEvent.type(inputField, "blur[Tab]");

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("displays the correct error state", () => {
    render(
      <InputField
        id="input-field"
        value="test"
        validated={{ valid: false, message: "failed" }}
        onChange={() => {}}
      />,
    );

    expect(screen.getByTestId("error-text"));
  });

  it("displays the correct valid state", () => {
    render(<Story {...Story.args} validated={{ valid: true }} />);

    expect(screen.getByTestId("icon-valid"));
  });

  it("toggles password visibility", async () => {
    const testID = "inputField";
    const { container } = render(
      <Story {...Story.args} testID={testID} type="password" />,
    );

    const inputField = screen.getByTestId(testID);
    const toggle = screen.getByTestId("input-field-affix-password-toggle");

    await userEvent.type(inputField, "blur[Tab]");
    await userEvent.click(toggle);

    expect(container).toMatchSnapshot();
  });

  it("displays the correct helper text", () => {
    render(
      <InputField
        id="input-id"
        value="test"
        validated={{ valid: true }}
        helperText={"custom helper text"}
      />,
    );

    expect(screen.getByText("custom helper text"));
  });

  it("renders correctly for file input type", () => {
    const { container } = render(
      <InputField
        id="input-file"
        type="file"
        legend={{ label: "Upload File" }}
        helperText="Allowed file types: .jpg, .png, .pdf"
        accept="image/png, image/jpeg, application/pdf"
        multiple
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
