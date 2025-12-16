import { press, takeScreenshot } from "react-native-owl";

describe("FeatureCard.tsx", () => {
  it("presses FeatureCardText & takes a screenshot", async () => {
    await press("FeatureCardText");
    const screen = await takeScreenshot("FeatureCardText");
    expect(screen).toMatchBaseline();
  });

  it("presses FeatureCardImage & takes a screenshot", async () => {
    await press("FeatureCardImage");
    const screen = await takeScreenshot("FeatureCardImage");
    expect(screen).toMatchBaseline();
  });

  it("presses FeatureCardBackground & takes a screenshot", async () => {
    await press("FeatureCardBackground");
    const screen = await takeScreenshot("FeatureCardBackground");
    expect(screen).toMatchBaseline();
  });

  it("presses FeatureCardOdidoPalette & takes a screenshot", async () => {
    await press("FeatureCardOdidoPalette");
    const screen = await takeScreenshot("FeatureCardOdidoPalette");
    expect(screen).toMatchBaseline();
  });
});
