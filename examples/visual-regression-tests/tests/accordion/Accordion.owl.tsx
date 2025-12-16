import { press, takeScreenshot } from "react-native-owl";

describe("Accordion.tsx", () => {
  it("presses a accordion & takes a screenshot", async () => {
    await press("Accordion");

    const screen = await takeScreenshot("Accordion");
    expect(screen).toMatchBaseline();
  });
});
