import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label", () => {
  it("renders the label with provided children", () => {
    render(<Label>Test Label</Label>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies the correct class names", () => {
    render(<Label>Test Label</Label>);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveClass("base-paragraph label");
  });

  it("sets the correct htmlFor attribute when an id is provided", () => {
    render(<Label id="test-input">Test Label</Label>);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveAttribute("for", "test-input");
  });
});
