import { press, takeScreenshot } from "react-native-owl";

describe("Addons", () => {
  it("baseline matches AFM component", async () => {
    await press("AFM");
    const screen = await takeScreenshot("AFM");
    expect(screen).toMatchBaseline();
  });
});
