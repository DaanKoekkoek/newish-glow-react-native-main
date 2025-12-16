import { press, takeScreenshot } from "react-native-owl";

describe("Divider.tsx", () => {
  it("presses divider & takes a screenshot", async () => {
    await press("Divider");

    const screen = await takeScreenshot("Divider");
    expect(screen).toMatchBaseline();
  });
});
