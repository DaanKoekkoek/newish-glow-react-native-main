import { press, takeScreenshot } from "react-native-owl";

describe("Heading.tsx", () => {
  it("presses a button & takes a screenshot", async () => {
    await press("Heading");

    const screen = await takeScreenshot("Heading");

    expect(screen).toMatchBaseline();
  });
});
