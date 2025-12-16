import { press, takeScreenshot } from "react-native-owl";

describe("Addons", () => {
  it("baseline matches AddOns page", async () => {
    await press("Addon");
    const screen = await takeScreenshot("Addon");
    expect(screen).toMatchBaseline();
  });
});
