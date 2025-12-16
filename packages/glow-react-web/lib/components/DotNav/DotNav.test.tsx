import { composeStory } from "@storybook/react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import meta, { Default } from "./DotNav.stories";

jest.useFakeTimers();

const user = userEvent.setup({
  advanceTimers: jest.advanceTimersByTime,
});

const DotNavStory = composeStory(Default, meta);

describe("<DotNav />", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should not have any accessibility violations", async () => {
    jest.useRealTimers();
    const { container } = render(<DotNavStory {...DotNavStory.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    jest.useFakeTimers();
  });

  it("renders a stable snapshot", () => {
    jest.useRealTimers();
    const { container } = render(<DotNavStory {...DotNavStory.args} />);
    expect(container).toMatchSnapshot();
    jest.useFakeTimers();
  });

  it("renders the number of dots based on count property", () => {
    render(<DotNavStory {...DotNavStory.args} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(DotNavStory.args.count ?? 5);
  });

  it("sets the active dot initially", () => {
    render(<DotNavStory {...DotNavStory.args} />);
    const buttons = screen.getAllByRole("button");
    const activeIndex = DotNavStory.args.activeIndex ?? 0;
    expect(buttons[activeIndex]).toHaveClass("is-active");
  });

  it("calls onDotClick when a dot is clicked", async () => {
    const onDotClick = jest.fn();
    render(<DotNavStory {...DotNavStory.args} onDotClick={onDotClick} />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);
    expect(onDotClick).toHaveBeenCalledWith(0);
  });

  it("auto-advances to the next dot after timerDuration", () => {
    const onNext = jest.fn();
    const timerDuration = 1000;

    render(
      <DotNavStory
        {...DotNavStory.args}
        timerDuration={timerDuration}
        onNext={onNext}
      />,
    );

    const activeIndex = DotNavStory.args.activeIndex ?? 0;

    // Advance the timers inside act, then flush all pending updates
    act(() => {
      jest.advanceTimersByTime(timerDuration);
      jest.runOnlyPendingTimers(); // ensure timeout callback fires
    });

    // Force a re-render by querying fresh elements
    const buttons = screen.getAllByRole("button");
    const nextIndex = (activeIndex + 1) % (DotNavStory.args.count ?? 5);

    expect(buttons[nextIndex]).toHaveClass("is-active");
    expect(buttons[activeIndex]).not.toHaveClass("is-active");
    expect(onNext).toHaveBeenCalledWith(nextIndex);
  });

  it("calls onDotClick when a dot is clicked", async () => {
    const onDotClick = jest.fn();
    render(<DotNavStory {...DotNavStory.args} onDotClick={onDotClick} />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[0]);

    expect(onDotClick).toHaveBeenCalledWith(0);
  });
});
