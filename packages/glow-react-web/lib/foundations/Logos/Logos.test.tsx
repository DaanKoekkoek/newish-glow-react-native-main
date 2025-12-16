import { render, screen } from "@testing-library/react";
import { Logos } from "./Logos";
import { useTheme } from "components/ThemeProvider";

jest.mock("components/ThemeProvider", () => ({
  useTheme: jest.fn(),
}));

describe("<Logos />", () => {
  it("renders the default logo when no brand is provided", () => {
    (useTheme as jest.Mock).mockReturnValue({ brand: "odido" });

    render(<Logos testID="logos" />);
    expect(screen.getByTestId("logos")).toBeInTheDocument();
  });

  it("renders the correct logo when brand is provided", () => {
    render(<Logos brand="ben" testID="logos-ben" />);
    expect(screen.getByTestId("logos-ben")).toBeInTheDocument();
  });

  it("applies the inverted class when variant is 'inverted'", () => {
    render(<Logos variant="inverted" testID="logos-inverted" />);
    const element = screen.getByTestId("logos-inverted");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("is-inverted");
  });

  it("applies the correct size class based on the size prop", () => {
    render(<Logos size="lg" testID="logos-large" />);
    const element = screen.getByTestId("logos-large");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("logo-size-lg");
  });

  it("falls back to the theme provider's brand when no brand is provided", () => {
    (useTheme as jest.Mock).mockReturnValue({ brand: "simpel" });

    render(<Logos testID="logos-theme-fallback" />);
    expect(screen.getByTestId("logos-theme-fallback")).toBeInTheDocument();
  });
});
