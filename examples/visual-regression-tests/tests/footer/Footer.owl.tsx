import { press, takeScreenshot } from "react-native-owl";

describe("<Footer />", () => {
  it("baseline matches Footer component screen", async () => {
    await press("Footer");
    const screen = await takeScreenshot("Footer");
    expect(screen).toMatchBaseline();
  });
});
