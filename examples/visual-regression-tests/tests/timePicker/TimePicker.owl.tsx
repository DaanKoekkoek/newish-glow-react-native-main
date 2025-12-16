import { press, takeScreenshot } from "react-native-owl";

describe("<TimePicker />", () => {
  it("takes a screenshot", async () => {
    await press("TimePicker");

    const screen = await takeScreenshot("TimePicker");

    expect(screen).toMatchBaseline();
  });
});
