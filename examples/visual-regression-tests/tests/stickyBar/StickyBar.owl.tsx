import { press, takeScreenshot } from "react-native-owl";

describe("StickyBar", () => {
  it(`presses a StickyBarTop & takes a screenshot`, async () => {
    await press("StickyBarTop");
    const screen = await takeScreenshot("StickyBarTop");
    expect(screen).toMatchBaseline();
  });

  it(`presses a StickyBarBottom & takes a screenshot`, async () => {
    await press("StickyBarBottom");
    const screen = await takeScreenshot("StickyBarBottom");
    expect(screen).toMatchBaseline();
  });
});
