import { render, screen } from "@testing-library/react";
import { Callout } from "./Callout";
import {
  CalloutProminence,
  CalloutStatus,
  CalloutTipPosition,
} from "./Callout.types";
import { Button } from "../Button";

describe("<Callout />", () => {
  it("renders with title, description, testID, classname", () => {
    render(
      <Callout
        title="foo"
        description="bar"
        testID="foobar"
        className="foo-class"
      />,
    );

    const callout = screen.getByTestId("foobar") as HTMLElement;

    expect(callout).toBeInTheDocument();
    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(callout.classList.contains("foo-class")).toBe(true);
  });

  it("renders children if 'content' prop evaluates to 'alternate'", () => {
    render(
      <Callout title="foo" children={<span>bar</span>} content="alternate" />,
    );

    expect(screen.getByText("bar")).toBeInTheDocument();
  });

  it.each(["default", "success", "warning", "error"])(
    "renders with provided status: %s",
    (i) => {
      render(<Callout title="foo" status={i as CalloutStatus} />);

      const callout = screen.getByTestId("callout") as HTMLElement;
      const iconName = `status-${i === "default" ? "info" : i}`;
      const getByTestId = screen.getByTestId(`${iconName}-icon`) as HTMLElement;

      expect(callout.classList.contains(iconName)).toBe(true);
      expect(getByTestId).toBeInTheDocument();
    },
  );

  it("renders with callToAction and the right prominence order", () => {
    render(
      <Callout
        title="foo"
        buttonPrimary={<Button>Primary button</Button>}
        buttonSecondary={
          <Button prominence="secondary">Secondary button</Button>
        }
      />,
    );

    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];

    expect(buttons).toHaveLength(4);
  });

  it.each(["default", "subtle"])("renders with 'prominence': %s", (i) => {
    render(<Callout title="foo" prominence={i as CalloutProminence} />);

    const callout = screen.getByTestId("callout") as HTMLElement;

    expect(callout.classList).toContain(`prominence-${i}`);
  });

  it.each(["default", "top"])("renders the provided 'topPosition': %s", (i) => {
    render(<Callout title="foo" tipPosition={i as CalloutTipPosition} />);

    const callout = screen.getByTestId("callout") as HTMLElement;

    expect(callout.classList).toContain(`tip-position-${i}`);
  });
});
