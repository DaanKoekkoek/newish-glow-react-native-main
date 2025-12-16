import { press, takeScreenshot } from "react-native-owl";

describe("Pill component", () => {
  it("Render all variants correctly", async () => {
    await press("Pill");

    await press("pillId1");
    await press("pillId2");
    await press("disableButton");

    const screen = await takeScreenshot("Pill");
    expect(screen).toMatchBaseline();
  }, 15000);
});
