import { press, takeScreenshot } from "react-native-owl";

describe("NumberInput.tsx", () => {
  it("takes a screenshot", async () => {
    await press("NumberInput");

    const screen = await takeScreenshot("NumberInput");

    expect(screen).toMatchBaseline();
  });
});
