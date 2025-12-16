import { render, screen } from "@testing-library/react";
import { BadgeStatus } from ".";

describe("BadgeStatus", () => {
  it("renders with default props", () => {
    render(<BadgeStatus variant="default" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the count correctly for the default variant", () => {
    render(<BadgeStatus variant="default" count={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders '99+' when count is greater than 99", () => {
    render(<BadgeStatus variant="default" count={120} />);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("renders the success icon when variant is 'success'", () => {
    render(<BadgeStatus variant="success" type="icon" />);
    expect(screen.getByTestId("badge-status-icon")).toBeInTheDocument();
  });

  it("renders the error icon when variant is 'error' with number as type", () => {
    render(<BadgeStatus variant="error" />);
    expect(screen.getByTestId("badge-status-number")).toBeInTheDocument();
  });

  it("renders the error icon when variant is 'error' with type icon", () => {
    render(<BadgeStatus variant="error" type="icon" />);
    expect(screen.getByTestId("badge-status-icon")).toBeInTheDocument();
  });

  it("applies the testID", () => {
    render(<BadgeStatus variant="default" testID="badge-status" />);
    expect(screen.getByTestId("badge-status")).toBeInTheDocument();
  });
});
