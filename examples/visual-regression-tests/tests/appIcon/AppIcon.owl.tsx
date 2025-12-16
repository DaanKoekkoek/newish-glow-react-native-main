import { press, takeScreenshot } from "react-native-owl";

describe("AppIcons", () => {
  it("baseline matches AppIcons page", async () => {
    await press("AppIcon");
    const screen = await takeScreenshot("AppIcon");
    expect(screen).toMatchBaseline();
  });
});
