import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Accordion, AccordionPanel } from "./Accordion";
import userEvent from "@testing-library/user-event";

jest.useFakeTimers();

let user: ReturnType<typeof userEvent.setup>;

beforeAll(() => {
  user = userEvent.setup();
});

beforeEach(() => {
  jest.useRealTimers(); // Reset timers before each test
});

const renderAccordion = (props?: { multiple?: boolean }) =>
  render(
    <Accordion {...props}>
      <AccordionPanel title="Panel 1">Content 1</AccordionPanel>
      <AccordionPanel title="Panel 2">Content 2</AccordionPanel>
    </Accordion>,
  );

describe("Accordion Component", () => {
  it("renders the accordion with panels", () => {
    renderAccordion();
    expect(screen.getByText("Panel 1")).toBeInTheDocument();
    expect(screen.getByText("Panel 2")).toBeInTheDocument();
  });

  it("toggles panel content visibility on click", async () => {
    renderAccordion();
    const button = screen.getByRole("button", { name: /panel 1/i });

    // Initially collapsed
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Expand panel
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Collapse panel
    await user.click(button);
    await act(async () => jest.runAllTimers());

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("delays unmounting content after collapsing", async () => {
    renderAccordion();
    const button = screen.getByRole("button", { name: /panel 1/i });

    // Expand panel
    await user.click(button);
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    // Collapse panel
    await user.click(button);
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    await act(async () => jest.runAllTimers());

    await waitFor(() => {
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  it("supports multiple panels being open simultaneously", async () => {
    renderAccordion({ multiple: true });

    const button1 = screen.getByRole("button", { name: /panel 1/i });
    const button2 = screen.getByRole("button", { name: /panel 2/i });

    await user.click(button1);
    await user.click(button2);

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("supports single panel mode (multiple=false)", async () => {
    renderAccordion({ multiple: false });

    const button1 = screen.getByRole("button", { name: /panel 1/i });
    const button2 = screen.getByRole("button", { name: /panel 2/i });

    // Open first panel
    await user.click(button1);
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    // Open second panel, first one should close
    await user.click(button2);
    expect(screen.getByText("Content 2")).toBeInTheDocument();

    await act(async () => jest.runAllTimers());

    await waitFor(() => {
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  it("has correct accessibility attributes", () => {
    renderAccordion();
    const button = screen.getByRole("button", { name: /panel 1/i });

    expect(button).toHaveAttribute(
      "aria-controls",
      expect.stringContaining("panel-"),
    );
  });
});
