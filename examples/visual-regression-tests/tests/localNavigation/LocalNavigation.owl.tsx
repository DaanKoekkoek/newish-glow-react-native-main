import { press, takeScreenshot } from "react-native-owl";

describe("<LocalNavigation />", () => {
  it("baseline matches LocalNavigation component screen", async () => {
    await press("LocalNavigation");
    const screen = await takeScreenshot("LocalNavigation");
    expect(screen).toMatchBaseline();
  });
});
