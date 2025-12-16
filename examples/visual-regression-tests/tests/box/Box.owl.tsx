import { press, takeScreenshot } from "react-native-owl";

describe("Box.tsx", () => {
  it("takes a screenshot", async () => {
    await press("Box");

    const screen = await takeScreenshot("Box");

    expect(screen).toMatchBaseline();
  });
});
