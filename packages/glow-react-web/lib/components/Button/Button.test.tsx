import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./Button";

describe("<Button />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { asFragment } = render(<Button>Content</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it.each(["default", "inactive", "loading"] as const)(
    "applies the correct class for state=%s",
    (state) => {
      render(<Button state={state}>Click me</Button>);
      const button = screen.getByRole("button");

      expect(button).toBeDefined();

      if (state === "inactive" || state === "loading") {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
      }
    },
  );

  it("fires the onClick event when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire the onClick event when inactive", () => {
    const onClick = jest.fn();
    render(
      <Button state="inactive" onClick={onClick}>
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire the onClick event when loading", () => {
    const onClick = jest.fn();
    render(
      <Button state="loading" onClick={onClick}>
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("displays the loading spinner when in loading state", () => {
    render(
      <Button state="loading" size="sm">
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");
    const spinner = screen.getByTestId("spinner-icon");

    expect(button).toContainElement(spinner);
    expect(spinner).toHaveClass("button-loading-icon");
    expect(spinner).toHaveClass("spinner-icon-size-sm");
  });

  it("renders the button with correct text content", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Click me");
  });

  it("renders the button with icon if provided", () => {
    render(<Button icon={{ name: "24h" }}>Click me</Button>);
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("button-icon-left");

    expect(button).toContainElement(icon);
  });

  it("renders the button with icon from right if provided", () => {
    render(<Button icon={{ name: "24h", position: "right" }}>Click me</Button>);
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("button-icon-right");

    expect(button).toContainElement(icon);
  });

  it("is focusable by keyboard", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    button.focus();
    expect(button).toHaveFocus();
  });

  it("should have the correct aria-label when passed", () => {
    render(<Button aria-label="Submit form">Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-label", "Submit form");
  });

  it("should match the default snapshot when no props are passed", () => {
    const { asFragment } = render(<Button>Default Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
