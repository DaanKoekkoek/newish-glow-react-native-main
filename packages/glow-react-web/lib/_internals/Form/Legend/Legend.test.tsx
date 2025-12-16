import { render, screen, fireEvent } from "@testing-library/react";
import { Legend } from "./Legend";

describe("Legend Component", () => {
  it("renders label when provided", () => {
    render(<Legend label="Test Label" id="test-id" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders optional text when provided", () => {
    render(<Legend optionalText="Optional" />);
    expect(screen.getByText("Optional")).toBeInTheDocument();
  });

  it("renders info text when provided", () => {
    render(<Legend info="Info Text" />);
    expect(screen.getByText("Info Text")).toBeInTheDocument();
  });

  it("renders the info icon when info is a function", () => {
    const mockInfo = jest.fn();
    render(<Legend info={mockInfo} />);
    expect(screen.getByTestId("info-icon")).toBeInTheDocument();
  });

  it("calls info function when clicking the info button", () => {
    const mockInfo = jest.fn();
    render(<Legend info={mockInfo} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockInfo).toHaveBeenCalledTimes(1);
  });

  it("does not render if no props are provided", () => {
    render(<Legend />);
    expect(screen.queryByTestId("legend-container")).toBeNull();
  });

  it("uses the correct tag when specified", () => {
    render(
      <Legend
        label="Test Label"
        as="label"
        id="test-id"
        testID="test-legend"
      />,
    );
    const element = screen.getByTestId("test-legend");
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe("label");
    expect(element).toHaveAttribute("for", "test-id");
  });
});
