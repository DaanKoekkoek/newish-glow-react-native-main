import { render, screen, fireEvent } from "@testing-library/react";
import { InputIcon } from "./InputIcon";

describe("InputIcon", () => {
  test('should render PrefixIcon when position is "prefix" and type is "search"', () => {
    render(<InputIcon position="prefix" type="search" />);

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  test('should render SuccessIcon when type is "search" and onClick is not provided', () => {
    render(<InputIcon position="suffix" variant="valid" type="search" />);

    const successIcon = screen.getByTestId("icon-valid");
    expect(successIcon).toBeInTheDocument();
    expect(successIcon).toHaveClass("input-icon-valid");
  });

  test('should render PasswordIconGroup when type is "password"', () => {
    const mockState = { isPasswordHidden: true, isDatePickerVisible: true };
    const mockDispatch = jest.fn();

    render(
      <InputIcon
        position="suffix"
        type="password"
        state={mockState}
        dispatch={mockDispatch}
      />,
    );

    const passwordToggleButton = screen.getByTestId(
      "input-field-affix-password-toggle",
    );
    expect(passwordToggleButton).toBeInTheDocument();
    fireEvent.click(passwordToggleButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggle-password-visibility",
    });
  });

  test('should not render ClearIcon if variant is "disabled"', () => {
    const handleClick = jest.fn();
    render(
      <InputIcon
        position="suffix"
        type="search"
        onClick={handleClick}
        variant="inactive"
      />,
    );

    const clearButton = screen.queryByTestId("input-search-clear-button");
    expect(clearButton).not.toBeInTheDocument();
  });

  test('should render success icon when variant is "success"', () => {
    render(<InputIcon position="suffix" type="text" variant="valid" />);

    const successIcon = screen.getByTestId("icon-valid");
    expect(successIcon).toBeInTheDocument();
  });

  test("should toggle password visibility icon on click", () => {
    const mockState = { isPasswordHidden: true, isDatePickerVisible: true };
    const mockDispatch = jest.fn();

    render(
      <InputIcon
        position="suffix"
        type="password"
        state={mockState}
        dispatch={mockDispatch}
      />,
    );

    const passwordToggleButton = screen.getByTestId(
      "input-field-affix-password-toggle",
    );
    expect(passwordToggleButton).toBeInTheDocument();

    fireEvent.click(passwordToggleButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test("should render correct icon based on type and variant", () => {
    const mockDispatch = jest.fn();
    render(
      <InputIcon
        position="suffix"
        type="password"
        state={{ isPasswordHidden: false, isDatePickerVisible: true }}
        dispatch={mockDispatch}
        variant="valid"
      />,
    );

    const successIcon = screen.getByTestId("icon-valid");
    expect(successIcon).toBeInTheDocument();
    expect(successIcon).toHaveClass("input-icon-valid");
  });
});
