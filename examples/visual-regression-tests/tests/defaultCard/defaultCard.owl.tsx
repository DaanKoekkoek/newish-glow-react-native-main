import { press, takeScreenshot } from "react-native-owl";

describe("DefaultCard.tsx", () => {
  it("takes a screenshot", async () => {
    await press("DefaultCard");
    const screen = await takeScreenshot("DefaultCard");
    expect(screen).toMatchBaseline();
  });
});
