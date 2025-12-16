import { press, takeScreenshot } from "react-native-owl";

describe("Pin.tsx", () => {
  it("navigates to screen & takes a screenshot", async () => {
    await press("Pin");

    const screen = await takeScreenshot("Pin");

    expect(screen).toMatchBaseline();
  });
});
