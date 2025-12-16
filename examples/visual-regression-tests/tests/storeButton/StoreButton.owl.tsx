import { press, takeScreenshot } from "react-native-owl";

describe("<StoreButton />", () => {
  it("baseline matches StoreButton", async () => {
    await press("StoreButton");
    const screen = await takeScreenshot("StoreButton");
    expect(screen).toMatchBaseline();
  });
});
