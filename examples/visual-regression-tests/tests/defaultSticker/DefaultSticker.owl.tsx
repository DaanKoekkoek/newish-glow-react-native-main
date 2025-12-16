import { press, takeScreenshot } from "react-native-owl";

describe("<DefaultSticker />", () => {
  it("baseline matches DefaultSticker component screen", async () => {
    await press("DefaultSticker");
    const screen = await takeScreenshot("DefaultSticker");
    expect(screen).toMatchBaseline();
  });
});
