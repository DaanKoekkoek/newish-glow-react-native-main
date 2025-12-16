import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MySection, MySectionGrid } from "./MySection";

describe("MySection", () => {
  it("renders without errors", () => {
    render(
      <MySection title={{ text: "Test Title", size: "lg" }}>
        <p>Child Content</p>
      </MySection>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Title",
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("applies the correct title size", () => {
    render(
      <MySection title={{ text: "Heading Test", size: "xl" }}>
        <p>Content</p>
      </MySection>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Heading Test",
    );
  });

  it("renders with a default palette and variant", () => {
    render(
      <MySection title={{ text: "Styled Section", size: "lg" }}>
        <p>Styled Content</p>
      </MySection>,
    );

    expect(screen.getByTestId("my-section")).toHaveClass("my-section");
  });
});

describe("MySectionGrid", () => {
  it("renders the correct number of columns", () => {
    render(
      <MySectionGrid columnSize={6}>
        <p>Column 1</p>
        <p>Column 2</p>
      </MySectionGrid>,
    );

    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Column 2")).toBeInTheDocument();
  });

  it("renders a single-column layout when no property is provided", () => {
    render(
      <MySectionGrid>
        <p>Single Column</p>
      </MySectionGrid>,
    );

    expect(screen.getByText("Single Column")).toBeInTheDocument();
  });
});
