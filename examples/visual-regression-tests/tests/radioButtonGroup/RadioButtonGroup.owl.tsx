import { press, takeScreenshot } from "react-native-owl";

describe("RadioButtonGroup.tsx", () => {
  it("presses a button & takes a screenshot", async () => {
    await press("RadioButtonGroup");

    const screen = await takeScreenshot("RadioButtonGroup");

    expect(screen).toMatchBaseline();
  });
});
