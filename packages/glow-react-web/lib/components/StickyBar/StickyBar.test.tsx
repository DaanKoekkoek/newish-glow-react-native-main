import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StickyBar, StickyBarActionButton } from "./StickyBar";
import { Button } from "../Button";

describe("StickyBar", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(
      <StickyBar
        modal={{
          title: "title",
          trigger: (
            <StickyBarActionButton position="bottom" onClick={() => {}} />
          ),
        }}
        callToAction={[<Button>Trigger button</Button>]}
      >
        Content
      </StickyBar>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with default props", () => {
    render(<StickyBar callToAction={[]}>Test Content</StickyBar>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies position class based on props", () => {
    render(
      <StickyBar callToAction={[]} position="bottom">
        Test Content
      </StickyBar>,
    );
    const stickyBarElement = screen.getByTestId("sticky-bar");
    expect(stickyBarElement).toHaveClass(
      "sticky-bar",
      "sticky-bar-position-bottom",
    );
  });

  it("renders children inside the content wrapper", () => {
    render(<StickyBar callToAction={[]}>Child Element</StickyBar>);
    const content = screen.getByText("Child Element");
    expect(content).toBeInTheDocument();
  });

  it("fires onClick when trigger is clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <StickyBar callToAction={<Button onClick={onClick}>Trigger</Button>} />,
    );
    await user.click(screen.getByText("Trigger"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("StickyBarActionButton", () => {
  it("renders ActionButtonIcon with icon based on context position bottom", () => {
    render(<StickyBarActionButton position="bottom" onClick={() => {}} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-icon", "chevron-up");
  });

  it("renders ActionButtonIcon with icon based on context position top", () => {
    render(<StickyBarActionButton position="top" onClick={() => {}} />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("data-icon", "chevron-down");
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<StickyBarActionButton position="bottom" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("toggles icon on click from up to down for position bottom", async () => {
    const user = userEvent.setup();
    render(<StickyBarActionButton position="bottom" onClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "data-icon",
      "chevron-up",
    );
    await user.click(button);
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "data-icon",
      "chevron-down",
    );
  });

  it("toggles icon on click from down to up for position top", async () => {
    const user = userEvent.setup();
    render(<StickyBarActionButton position="top" onClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "data-icon",
      "chevron-down",
    );
    await user.click(button);
    expect(screen.getByTestId("icon")).toHaveAttribute(
      "data-icon",
      "chevron-up",
    );
  });
});
