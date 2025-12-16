import { press, takeScreenshot } from "react-native-owl";

describe("Badges", () => {
  it("Default badge", async () => {
    await press("Badge");
    const screen = await takeScreenshot("Badge");
    expect(screen).toMatchBaseline();
  });

  it("Status badge", async () => {
    await press("BadgeStatus");
    const screen = await takeScreenshot("StatusBadge");
    expect(screen).toMatchBaseline();
  });
});
