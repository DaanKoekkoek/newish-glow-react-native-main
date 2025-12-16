import { press, takeScreenshot } from "react-native-owl";

describe("BundleCard", () => {
  it("Default BundleCard", async () => {
    await press("BundleCardDefault");
    const screen = await takeScreenshot("BundleCardDefault");
    expect(screen).toMatchBaseline();
  });
});
