import { press, takeScreenshot } from "react-native-owl";

describe("<PhoneBrand />", () => {
  it("takes a screenshot", async () => {
    await press("PhoneBrand");

    const screen = await takeScreenshot("PhoneBrand");

    expect(screen).toMatchBaseline();
  });
});
