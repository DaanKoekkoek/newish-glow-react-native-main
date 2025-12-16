import { press, takeScreenshot } from "react-native-owl";

describe("Checkbox.tsx", () => {
  it("presses a button & takes a screenshot", async () => {
    await press("Checkbox");

    const screen = await takeScreenshot("Checkbox");

    expect(screen).toMatchBaseline();
  });
});
