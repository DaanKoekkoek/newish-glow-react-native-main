import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("<Stack />", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(
      <Stack>
        <span>Content 1</span>
        <span>Content 2</span>
      </Stack>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies default props", () => {
    render(<Stack />);
    const stack = screen.getByTestId("stack");

    expect(stack).toHaveClass("stack");
    expect(stack).toHaveClass("direction-column");
    expect(stack).toHaveClass("align-flex-start");
    expect(stack).toHaveClass("justify-flex-start");
    expect(stack).toHaveClass("wrap-nowrap");
    expect(stack).toHaveClass("grow");
    expect(stack).toHaveClass("shrink");
    expect(stack).toHaveClass("gap-default");
  });

  it("renders children correctly", () => {
    render(
      <Stack>
        <span>Item 1</span>
        <span>Item 2</span>
      </Stack>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies custom direction, alignment, and justification", () => {
    render(
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      />,
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("direction-row");
    expect(stack).toHaveClass("align-center");
    expect(stack).toHaveClass("justify-space-between");
  });

  it("applies column size as number", () => {
    render(<Stack columnSize={6} />);
    const stack = screen.getByTestId("stack");

    expect(stack).toHaveClass("stack-column-6");
  });

  it("applies responsive column sizes", () => {
    render(<Stack columnSize={{ mobileSmall: 12, tablet: 6, desktop: 4 }} />);

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("stack-column-12");
    expect(stack).toHaveClass("stack-column-6-tablet");
    expect(stack).toHaveClass("stack-column-4-desktop");
  });

  it("applies a custom gap size", () => {
    render(<Stack gap="lg" />);
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("gap-lg");
  });
});
