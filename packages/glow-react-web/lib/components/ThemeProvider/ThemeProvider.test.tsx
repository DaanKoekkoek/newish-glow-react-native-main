import { ThemeProvider } from "components/ThemeProvider/ThemeProvider.tsx";
import { render, screen, waitFor } from "@testing-library/react";
import { useTheme } from "components/ThemeProvider";

describe("ThemeProvider", () => {
  it("should add light thema attrs by default", async () => {
    render(
      <ThemeProvider brand="odido">
        <div>test</div>
      </ThemeProvider>,
    );

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute(
        "data-theme",
        "odido-light",
      ),
    );
  });

  it("should add dark thema attrs if provided", async () => {
    render(
      <ThemeProvider brand="odido" theme="dark">
        <div>test</div>
      </ThemeProvider>,
    );

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute(
        "data-theme",
        "odido-dark",
      ),
    );
  });

  it("should map other brand if provided if provided", async () => {
    render(
      <ThemeProvider brand="odido" theme="dark">
        <div>test</div>
      </ThemeProvider>,
    );

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute(
        "data-theme",
        "odido-dark",
      ),
    );
  });

  it("consumes provided brand and theme", () => {
    const ThemeConsumer = () => {
      const { brand, theme } = useTheme();

      return (
        <div>
          <p>Brand: {brand}</p>
          <p>Theme: {theme}</p>
        </div>
      );
    };

    render(
      <ThemeProvider brand="odido" theme="dark">
        <div>
          <ThemeConsumer />
        </div>
      </ThemeProvider>,
    );

    expect(screen.getByText("Brand: odido")).toBeInTheDocument();
    expect(screen.getByText("Theme: dark")).toBeInTheDocument();
  });
});
