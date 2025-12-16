import { press, takeScreenshot } from "react-native-owl";

describe("Toggle.tsx", () => {
  it("takes a screenshot", async () => {
    await press("Toggle");

    const screen = await takeScreenshot("Toggle");

    expect(screen).toMatchBaseline();
  });
});
