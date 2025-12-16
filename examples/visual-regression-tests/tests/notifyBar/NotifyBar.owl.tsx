import { press, takeScreenshot } from "react-native-owl";

describe("NotifyBar.tsx", () => {
  it("takes a screenshot", async () => {
    await press("NotifyBar");

    const screen = await takeScreenshot("NotifyBar");

    expect(screen).toMatchBaseline();
  });
});
