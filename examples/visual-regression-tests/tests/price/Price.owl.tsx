import { press, takeScreenshot } from "react-native-owl";

describe("Price.tsx", () => {
  it("takes a screenshot", async () => {
    await press("Price");
    const screen = await takeScreenshot("Price");
    expect(screen).toMatchBaseline();
  });
});
