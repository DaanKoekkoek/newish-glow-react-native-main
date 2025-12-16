import { press, takeScreenshot } from "react-native-owl";

describe("Grid.tsx", () => {
  it("presses a row & takes a screenshot", async () => {
    await press("Grid");

    const screen = await takeScreenshot("Grid");
    expect(screen).toMatchBaseline();
  });

  it("presses a rowColumn & takes a screenshot", async () => {
    await press("GridColumn");

    const screen = await takeScreenshot("GridColumn");
    expect(screen).toMatchBaseline();
  });
});
