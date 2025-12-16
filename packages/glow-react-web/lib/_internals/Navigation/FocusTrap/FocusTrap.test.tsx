import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FocusTrap } from "./FocusTrap";

describe("FocusTrap", () => {
  test("should trap focus within the component when active", async () => {
    render(
      <FocusTrap active focus="mount">
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </FocusTrap>,
    );

    const button1 = screen.getByText("Button 1");
    const button2 = screen.getByText("Button 2");
    const button3 = screen.getByText("Button 3");

    // On mount, Button 1 should already have focus
    await waitFor(() => expect(button1).toHaveFocus());

    // Tab once -> Button 2
    await userEvent.tab();
    expect(button2).toHaveFocus();

    // Tab again -> Button 3
    await userEvent.tab();
    expect(button3).toHaveFocus();

    // Tab again -> cycles back to Button 1 (FocusTrap behavior)
    await userEvent.tab();
    expect(button1).toHaveFocus();

    // Shift+Tab -> cycles backwards to Button 3
    await userEvent.tab({ shift: true });
    expect(button3).toHaveFocus();
  });

  test("should deactivate on click outside when clickOutsideDeactivates is true", async () => {
    const handleDeactivate = jest.fn();

    render(
      <div>
        <FocusTrap
          active={true}
          clickOutsideDeactivates={true}
          onDeactivate={handleDeactivate}
        >
          <button>Inside FocusTrap</button>
        </FocusTrap>
        <button>Outside FocusTrap</button>
      </div>,
    );

    // Click outside the FocusTrap
    const outsideButton = screen.getByText("Outside FocusTrap");
    await userEvent.click(outsideButton);

    // The deactivate handler should be called
    expect(handleDeactivate).toHaveBeenCalledTimes(1);
  });

  test("should not deactivate on click outside when clickOutsideDeactivates is false", async () => {
    const handleDeactivate = jest.fn();

    render(
      <div>
        <FocusTrap
          active={true}
          clickOutsideDeactivates={false}
          onDeactivate={handleDeactivate}
        >
          <button>Inside FocusTrap</button>
        </FocusTrap>
        <button>Outside FocusTrap</button>
      </div>,
    );

    // Click outside the FocusTrap
    const outsideButton = screen.getByText("Outside FocusTrap");
    await userEvent.click(outsideButton);

    // The deactivate handler should not be called
    expect(handleDeactivate).not.toHaveBeenCalled();
  });

  test("should render children when active or inactive", async () => {
    const { rerender } = render(
      <FocusTrap active={true}>
        <button>Active FocusTrap</button>
      </FocusTrap>,
    );

    expect(screen.getByText("Active FocusTrap")).toBeInTheDocument();

    rerender(
      <FocusTrap active={false}>
        <button>Inactive FocusTrap</button>
      </FocusTrap>,
    );

    expect(screen.getByText("Inactive FocusTrap")).toBeInTheDocument();
  });
});
