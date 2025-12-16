import { composeStory } from "@storybook/react";

import meta, { Basic } from "./Counter.stories";
import { act, render, screen, within } from "@testing-library/react";

const Counter = composeStory(Basic, meta);

describe("Counter component", () => {
  let fixedDate;
  let targetDate: Date;
  let hoursDate: Date;

  beforeEach(() => {
    jest.useFakeTimers();

    fixedDate = new Date();
    fixedDate.setUTCDate(fixedDate.getDate() + 1);
    jest.setSystemTime(fixedDate);

    targetDate = new Date(fixedDate);
    targetDate.setUTCDate(targetDate.getDate() + 3);
    hoursDate = new Date(fixedDate);
    hoursDate.setUTCDate(hoursDate.getDate() + 1);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders basic Counter default", async () => {
    const { asFragment } = render(
      <Counter
        targetDate={targetDate.toISOString()}
        prominence="default"
        size="default"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders basic Counter hours variant sublte", async () => {
    const { asFragment } = render(
      <Counter
        targetDate={targetDate.toISOString()}
        variant="hoursOnly"
        prominence="subtle"
        size="lg"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with default variant and correct countdown values", async () => {
    render(
      <Counter
        targetDate={targetDate.toISOString()}
        variant="default"
        digits={4}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const daysUnit = screen.getByTestId("counter-unit-days");
    expect(daysUnit).toBeDefined();

    const headings = within(daysUnit).getAllByTestId("counter-digit");
    expect(within(headings[0]).getByText("0")).toBeTruthy();
    expect(within(headings[1]).getByText("2")).toBeTruthy();
    expect(within(daysUnit).getByText("Dagen")).toBeTruthy();

    const hoursUnit = screen.getByTestId("counter-unit-hours");
    expect(hoursUnit).toBeDefined();
    const hoursCounters = within(hoursUnit).getAllByTestId("counter-digit");
    expect(within(hoursCounters[0]).getByText("2")).toBeTruthy();
    expect(within(hoursCounters[1]).getByText("3")).toBeTruthy();
    expect(within(hoursUnit).getByText("Uur")).toBeTruthy();

    const minutesUnit = screen.getByTestId("counter-unit-minutes");
    expect(minutesUnit).toBeDefined();
    const minutesCounters = within(minutesUnit).getAllByTestId("counter-digit");
    expect(within(minutesCounters[0]).getByText("5")).toBeTruthy();
    expect(within(minutesCounters[1]).getByText("9")).toBeTruthy();
    expect(within(minutesUnit).getByText("Min.")).toBeTruthy();

    const secondsUnit = screen.getByTestId("counter-unit-seconds");
    expect(secondsUnit).toBeDefined();
    const secondsCounters = within(secondsUnit).getAllByTestId("counter-digit");
    expect(within(secondsCounters[0]).getByText("5")).toBeTruthy();
    expect(within(secondsCounters[1]).getByText("9")).toBeTruthy();
    expect(within(secondsUnit).getByText("Sec.")).toBeTruthy();
  });

  it("renders with Hours variant and countdown values", async () => {
    render(
      <Counter targetDate={hoursDate.toISOString()} variant="hoursOnly" />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const hoursUnit = screen.getByTestId("counter-unit-hours");
    expect(hoursUnit).toBeDefined();
    const hoursCounters = within(hoursUnit).getAllByTestId("counter-digit");
    expect(within(hoursCounters[0]).getByText("2")).toBeTruthy();
    expect(within(hoursCounters[1]).getByText("3")).toBeTruthy();

    const minutesUnit = screen.getByTestId("counter-unit-minutes");
    expect(minutesUnit).toBeDefined();
    const minutesCounters = within(minutesUnit).getAllByTestId("counter-digit");
    expect(within(minutesCounters[0]).getByText("5")).toBeTruthy();
    expect(within(minutesCounters[1]).getByText("9")).toBeTruthy();

    const CounterContainer = screen.getByTestId("counter");
    const labelText = within(CounterContainer).getByTestId(
      "counter-label-hoursonly",
    );
    expect(within(labelText).getByText("Uur over")).toBeTruthy();
  });
});
