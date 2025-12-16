import { press, takeScreenshot } from "react-native-owl";

describe("ShopSection.tsx", () => {
  it("takes a screenshot", async () => {
    await press("ShopSection");
    const screen = await takeScreenshot("ShopSection");
    expect(screen).toMatchBaseline();
  });
});
