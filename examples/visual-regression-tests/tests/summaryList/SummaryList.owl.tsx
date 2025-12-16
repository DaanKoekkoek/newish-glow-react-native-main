import { press, takeScreenshot } from "react-native-owl";

describe("SummaryList", () => {
  it(`baseline matches SummaryList component screen`, async () => {
    await press("SummaryList");

    const screen = await takeScreenshot("SummaryList");
    expect(screen).toMatchBaseline();
  });
});
