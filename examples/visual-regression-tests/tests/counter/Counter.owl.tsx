import { press, takeScreenshot } from "react-native-owl";

describe("Counter", () => {
  it("Default Counter", async () => {
    await press("CounterDefault");
    const screen = await takeScreenshot("CounterDefault");
    expect(screen).toMatchBaseline();
  });

  it("Hourly Counter", async () => {
    await press("CounterHours");
    const screen = await takeScreenshot("CounterHours");
    expect(screen).toMatchBaseline();
  });
});
