import { press, takeScreenshot } from "react-native-owl";

describe("Display.tsx", () => {
  it("presses a button & takes a screenshot", async () => {
    await press("Display");

    const screen = await takeScreenshot("Display");

    expect(screen).toMatchBaseline();
  });
});
