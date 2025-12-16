import { press, takeScreenshot } from "react-native-owl";

describe("DefaultList.tsx", () => {
  it("takes a screenshot", async () => {
    await press("DefaultList");

    const screen = await takeScreenshot("DefaultList");

    expect(screen).toMatchBaseline();
  });
});
