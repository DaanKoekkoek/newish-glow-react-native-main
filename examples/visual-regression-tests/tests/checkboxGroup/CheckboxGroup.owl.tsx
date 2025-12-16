import { press, takeScreenshot } from "react-native-owl";

describe("CheckboxGroup.tsx", () => {
  it("presses a button & takes a screenshot", async () => {
    await press("CheckboxGroup");

    const screen = await takeScreenshot("CheckboxGroup");

    expect(screen).toMatchBaseline();
  });
});
