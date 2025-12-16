import { press, takeScreenshot } from "react-native-owl";

describe("TextLink.tsx", () => {
  it("takes a screenshot", async () => {
    await press("TextLink");
    const screen = await takeScreenshot("TextLink");
    expect(screen).toMatchBaseline();
  });
});
