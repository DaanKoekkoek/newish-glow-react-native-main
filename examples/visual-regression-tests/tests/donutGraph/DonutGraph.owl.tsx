import { press, takeScreenshot } from "react-native-owl";

describe("DonutGraph", () => {
  it("Donut Graph default", async () => {
    await press("DonutGraphDefault");
    const screen = await takeScreenshot("DonutGraphDefault");
    expect(screen).toMatchBaseline();
  });

  it("Donut Graph large", async () => {
    await press("DonutGraphLarge");
    const screen = await takeScreenshot("DonutGraphLarge");
    expect(screen).toMatchBaseline();
  });
});
