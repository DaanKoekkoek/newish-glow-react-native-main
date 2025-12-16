import { press, takeScreenshot } from "react-native-owl";

describe("InputField.tsx", () => {
  it("takes a screenshot", async () => {
    await press("InputField");

    const screen = await takeScreenshot("InputField");

    expect(screen).toMatchBaseline();
  });
});
