import { press, takeScreenshot } from "react-native-owl";

describe("Slider", () => {
  it("Slider", async () => {
    await press("Slider");
    const screen = await takeScreenshot("Slider");
    expect(screen).toMatchBaseline();
  });
});
