import { press, takeScreenshot } from "react-native-owl";

describe.skip("TopNavigation.tsx", () => {
  it("Default TopNavigation", async () => {
    await press("TopNavigationDefault");
    const screen = await takeScreenshot("TopNavigationDefault");
    expect(screen).toMatchBaseline();
  });

  it("Mirrored Color TopNavigation", async () => {
    await press("TopNavigationMirrorColor");
    const screen = await takeScreenshot("TopNavigationMirrorColor");
    expect(screen).toMatchBaseline();
  });
});
