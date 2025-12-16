import { render, screen } from "@testing-library/react";
import { Visible } from "./Visible";
import styles from "./Visibility.module.scss";

describe("<Visible />", () => {
  it("applies the correct class for `above` prop", () => {
    render(<Visible above="tablet">Visible Content</Visible>);
    const element = screen.getByText("Visible Content");
    expect(element).toHaveClass(styles["visible-above-tablet"]);
  });

  it("applies the correct class for `below` prop", () => {
    render(<Visible below="tablet">Visible Content</Visible>);
    const element = screen.getByText("Visible Content");
    expect(element).toHaveClass(styles["visible-below-tablet"]);
  });

  it("applies the correct class for `only` prop", () => {
    render(<Visible only="tablet">Visible Content</Visible>);
    const element = screen.getByText("Visible Content");
    expect(element).toHaveClass(styles["visible-only-tablet"]);
  });

  it("renders children", () => {
    render(<Visible above="mobile">Visible Text</Visible>);
    expect(screen.getByText("Visible Text")).toBeInTheDocument();
  });
});
