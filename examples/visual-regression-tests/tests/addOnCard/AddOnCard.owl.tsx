import { press, takeScreenshot, toExist } from "react-native-owl";

describe("AddOnCard.tsx", () => {
  it.each(["AddonCardVertical", "AddonCardHorizontal"])("%i", async (name) => {
    await press(name);
    await toExist("add-on-card");

    const screen = await takeScreenshot(name);
    expect(screen).toMatchBaseline();
  });
});
