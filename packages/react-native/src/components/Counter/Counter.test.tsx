import { composeStory } from "@storybook/react";
import { render, act, within } from "_test-utils";
import React from "react";

import meta, { Basic } from "./Counter.stories";

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

  it("renders correctly basic Counter default", async () => {
    const { toJSON } = render(
      <Counter
        targetDate={targetDate.toISOString()}
        prominence="default"
        size="default"
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly basic Counter hours variant sublte", async () => {
    const { toJSON } = render(
      <Counter
        targetDate={targetDate.toISOString()}
        variant="hoursOnly"
        prominence="subtle"
        size="large"
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with default variant and correct countdown values", async () => {
    const { getByTestId } = render(
      <Counter
        targetDate={targetDate.toISOString()}
        variant="default"
        digits={4}
      />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const daysUnit = getByTestId("counter_unit_days");
    expect(daysUnit).toBeDefined();

    const headings = within(daysUnit).getAllByTestId("heading");
    expect(within(headings[0]).getByText("0")).toBeTruthy();
    expect(within(headings[1]).getByText("2")).toBeTruthy();
    expect(within(daysUnit).getByText("Dagen")).toBeTruthy();

    const hoursUnit = getByTestId("counter_unit_hours");
    expect(hoursUnit).toBeDefined();
    const hoursCounters = within(hoursUnit).getAllByTestId("heading");
    expect(within(hoursCounters[0]).getByText("2")).toBeTruthy();
    expect(within(hoursCounters[1]).getByText("3")).toBeTruthy();
    expect(within(hoursUnit).getByText("Uur")).toBeTruthy();

    const minutesUnit = getByTestId("counter_unit_minutes");
    expect(minutesUnit).toBeDefined();
    const minutesCounters = within(minutesUnit).getAllByTestId("heading");
    expect(within(minutesCounters[0]).getByText("5")).toBeTruthy();
    expect(within(minutesCounters[1]).getByText("9")).toBeTruthy();
    expect(within(minutesUnit).getByText("Min.")).toBeTruthy();

    const secondsUnit = getByTestId("counter_unit_seconds");
    expect(secondsUnit).toBeDefined();
    const secondsCounters = within(secondsUnit).getAllByTestId("heading");
    expect(within(secondsCounters[0]).getByText("5")).toBeTruthy();
    expect(within(secondsCounters[1]).getByText("9")).toBeTruthy();
    expect(within(secondsUnit).getByText("Sec.")).toBeTruthy();
  });

  it("renders correctly with Hours variant and correct countdown values", async () => {
    const { getByTestId } = render(
      <Counter targetDate={hoursDate.toISOString()} variant="hoursOnly" />,
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const hoursUnit = getByTestId("counter_unit_hours");
    expect(hoursUnit).toBeDefined();
    const hoursCounters = within(hoursUnit).getAllByTestId("heading");
    expect(within(hoursCounters[0]).getByText("2")).toBeTruthy();
    expect(within(hoursCounters[1]).getByText("3")).toBeTruthy();

    const minutesUnit = getByTestId("counter_unit_minutes");
    expect(minutesUnit).toBeDefined();
    const minutesCounters = within(minutesUnit).getAllByTestId("heading");
    expect(within(minutesCounters[0]).getByText("5")).toBeTruthy();
    expect(within(minutesCounters[1]).getByText("9")).toBeTruthy();

    const CounterContainer = getByTestId("counter");
    const labelText = within(CounterContainer).getByTestId("paragraph");
    expect(within(labelText).getByText("Uur over")).toBeTruthy();
  });
});
