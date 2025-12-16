import { press, takeScreenshot } from "react-native-owl";

describe("LargeSticker.tsx", () => {
  it("takes a screenshot", async () => {
    await press("LargeSticker");

    const screen = await takeScreenshot("LargeSticker");

    expect(screen).toMatchBaseline();
  });
});
