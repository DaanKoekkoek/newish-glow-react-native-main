import { press, takeScreenshot } from "react-native-owl";

describe("Callouts", () => {
  it("baseline matches callout component screen", async () => {
    await press("Callout");
    const screen = await takeScreenshot("Callout");
    expect(screen).toMatchBaseline();
  });
});
