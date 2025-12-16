import { render, screen } from "@testing-library/react";
import { PriceContext, type PriceContextProps } from "./PriceContext";

describe("PriceContext", () => {
  const defaultProps: PriceContextProps = {
    value: "100",
    description: "This is a test description.",
    disclaimer: "This is a test disclaimer.",
  };

  it("renders the PriceContext component", () => {
    render(<PriceContext {...defaultProps} />);
    expect(screen.getByTestId("price-context")).toBeInTheDocument();
  });

  it("displays the price component with correct props", () => {
    render(<PriceContext {...defaultProps} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders the description if provided", () => {
    render(<PriceContext {...defaultProps} />);
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
  });

  it("renders the disclaimer if provided", () => {
    render(<PriceContext {...defaultProps} />);
    expect(screen.getByText("This is a test disclaimer.")).toBeInTheDocument();
  });

  it("renders the moreInfo element if provided", () => {
    render(
      <PriceContext
        {...defaultProps}
        moreInfo={<span data-testid="more-info">More Info</span>}
      />,
    );
    expect(screen.getByTestId("more-info")).toBeInTheDocument();
  });
});
