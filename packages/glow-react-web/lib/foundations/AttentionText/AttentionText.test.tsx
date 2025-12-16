import { render, screen } from "@testing-library/react";
import { AttentionText } from "./AttentionText";

describe("AttentionText component", () => {
  it("should match the snapshot", () => {
    const { asFragment } = render(<AttentionText>Snapshot Test</AttentionText>);
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders the AttentionText component with default props", () => {
    render(<AttentionText>Test Message</AttentionText>);
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("renders the AttentionText component with a custom size", () => {
    render(<AttentionText size="sm">Small Text</AttentionText>);
    expect(screen.getByText("Small Text")).toHaveClass("paragraph-size-sm");
  });

  it("renders the AttentionText component with an icon", () => {
    render(<AttentionText icon="lock">Text with Icon</AttentionText>);
    expect(screen.getByText("Text with Icon")).toBeInTheDocument();
  });

  it("renders the AttentionText component with a custom variant", () => {
    render(<AttentionText variant="error">Error Text</AttentionText>);
    expect(screen.getByText("Error Text")).toHaveClass("message-variant-error");
  });

  it("renders the AttentionText component with a testID", () => {
    render(<AttentionText testID="attention-text">Test ID Text</AttentionText>);
    expect(screen.getByTestId("attention-text")).toBeInTheDocument();
  });
});
