import { press, takeScreenshot } from "react-native-owl";

describe("AttentionText.tsx", () => {
  it("takes a screenshot", async () => {
    await press("AttentionText");
    const screen = await takeScreenshot("AttentionText");
    expect(screen).toMatchBaseline();
  });
});
