import { press, takeScreenshot } from "react-native-owl";

describe("<Select />", () => {
  it("takes a screenshot", async () => {
    await press("Select");
    const screen = await takeScreenshot("Select");
    expect(screen).toMatchBaseline();
  });
});
