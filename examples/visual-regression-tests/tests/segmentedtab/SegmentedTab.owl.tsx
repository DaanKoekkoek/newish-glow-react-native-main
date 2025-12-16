import { press, takeScreenshot } from "react-native-owl";

describe("SegmentedTab.tsx", () => {
  it("baseline matches SegmentedTab component screen", async () => {
    await press("SegmentedTab");
    const screen = await takeScreenshot("SegmentedTab");

    expect(screen).toMatchBaseline();
  });
});
