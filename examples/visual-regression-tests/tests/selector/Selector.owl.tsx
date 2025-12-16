import { press, takeScreenshot } from "react-native-owl";

describe("Selectors", () => {
  it("selector", async () => {
    await press("Selector");
    const screen = await takeScreenshot("Selector");
    expect(screen).toMatchBaseline();
  });
});
