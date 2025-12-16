import { press, takeScreenshot } from "react-native-owl";

describe("AddOnList.tsx", () => {
  it("takes a screenshot", async () => {
    await press("AddOnList");

    const screen = await takeScreenshot("AddOnList");

    expect(screen).toMatchBaseline();
  });
});
