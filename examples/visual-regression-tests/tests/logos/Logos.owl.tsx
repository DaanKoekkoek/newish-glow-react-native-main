import { press, takeScreenshot } from "react-native-owl";

describe("Logos", () => {
  it("Default Logos", async () => {
    await press("LogosDefault");
    const screen = await takeScreenshot("LogosDefault");
    expect(screen).toMatchBaseline();
  });

  it("Inverted Logos", async () => {
    await press("LogosInverted");
    const screen = await takeScreenshot("LogosInverted");
    expect(screen).toMatchBaseline();
  });
});
