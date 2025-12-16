import { press, takeScreenshot } from "react-native-owl";

describe("ProductHero.tsx", () => {
  it("takes a screenshot", async () => {
    await press("ProductHero");

    const screen = await takeScreenshot("ProductHero");

    expect(screen).toMatchBaseline();
  });
});
