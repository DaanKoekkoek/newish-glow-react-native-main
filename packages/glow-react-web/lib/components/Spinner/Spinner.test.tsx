import { screen, render } from "@testing-library/react";
import { Spinner } from "./Spinner";
import styles from "./Spinner.module.css";

describe("Spinner", () => {
  it("renders a stable snapshot", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("applies default size and color", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner-icon");

    expect(spinner).toHaveClass(styles["spinner-icon"]);
    expect(spinner).toHaveClass(styles["spinner-icon-size-default"]);
    expect(spinner).toHaveClass(styles["spinner-icon-color-default"]);
  });

  it("applies custom size and color", () => {
    render(<Spinner size="sm" color="inverted" />);
    const spinner = screen.getByTestId("spinner-icon");

    expect(spinner).toHaveClass(styles["spinner-icon"]);
    expect(spinner).toHaveClass(styles["spinner-icon-size-sm"]);
    expect(spinner).toHaveClass(styles["spinner-icon-color-inverted"]);
  });

  it("applies custom style", () => {
    const customStyle = { backgroundColor: "red" };
    render(<Spinner style={customStyle} />);
    const spinner = screen.getByTestId("spinner-icon");

    expect(spinner).toHaveStyle(customStyle);
  });
});
