import { press, takeScreenshot } from "react-native-owl";

describe("ActionButton.tsx", () => {
  it("takes a screenshot of the action button", async () => {
    await press("ActionButtonDefault");
    const screen = await takeScreenshot("ActionButtonDefault");
    expect(screen).toMatchBaseline();
  });
  it("takes a screenshot of the action button icon", async () => {
    await press("ActionButtonIcon");
    const screen = await takeScreenshot("ActionButtonIcon");
    expect(screen).toMatchBaseline();
  });
  it("takes a screenshot of the action button group", async () => {
    await press("ActionButtonGroup");
    const screen = await takeScreenshot("ActionButtonGroup");
    expect(screen).toMatchBaseline();
  });
});
