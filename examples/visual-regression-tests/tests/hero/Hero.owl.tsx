import { press, takeScreenshot } from "react-native-owl";

describe("Heroes", () => {
  it("baseline matches hero subscription component screen", async () => {
    await press("SubscriptionHero");
    const screen = await takeScreenshot("SubscriptionHero");
    expect(screen).toMatchBaseline();
  });
});
