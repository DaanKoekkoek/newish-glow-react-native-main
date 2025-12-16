import { press, takeScreenshot } from "react-native-owl";

describe("SkeletonLoader", () => {
  it("skeletonLoader", async () => {
    await press("SkeletonLoader");
    const screen = await takeScreenshot("SkeletonLoader");
    expect(screen).toMatchBaseline();
  });
});
