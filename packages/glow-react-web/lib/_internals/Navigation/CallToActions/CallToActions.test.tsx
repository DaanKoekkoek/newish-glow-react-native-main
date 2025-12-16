import { render, screen } from "@testing-library/react";
import { CallToActions } from "./CallToActions";

describe("CallToActions", () => {
  it("renders the CallToActions component", () => {
    render(
      <CallToActions>
        <button>Click me</button>
      </CallToActions>,
    );
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <CallToActions>
        <button>Button 1</button>
        <button>Button 2</button>
      </CallToActions>,
    );
    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 2")).toBeInTheDocument();
  });

  it("does not add 'has-textlink' class when no TextLink is present", () => {
    render(
      <CallToActions>
        <button>Button</button>
      </CallToActions>,
    );

    const callToAction = screen.getByTestId("call-to-actions");
    expect(callToAction).not.toHaveClass("has-textlink");
  });

  it("adds 'has-one-trigger' class when only one child is present", () => {
    render(
      <CallToActions>
        <button>Only Button</button>
      </CallToActions>,
    );

    const callToAction = screen.getByTestId("call-to-actions");
    expect(callToAction).toHaveClass("has-one-trigger");
  });

  it("does not add 'has-one-trigger' class when multiple children exist", () => {
    render(
      <CallToActions>
        <button>Button 1</button>
        <button>Button 2</button>
      </CallToActions>,
    );

    const callToAction = screen.getByTestId("call-to-actions");
    expect(callToAction).not.toHaveClass("has-one-trigger");
  });
});
