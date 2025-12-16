import { press, takeScreenshot } from "react-native-owl";

describe("Paragraph.tsx", () => {
  it("presses a button & takes a screenshot", async () => {
    await press("Paragraph");

    const screen = await takeScreenshot("Paragraph");

    expect(screen).toMatchBaseline();
  });
});
