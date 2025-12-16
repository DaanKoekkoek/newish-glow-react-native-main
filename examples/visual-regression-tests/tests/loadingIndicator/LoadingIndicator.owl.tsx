import { press, takeScreenshot } from "react-native-owl";

describe("Spinner.tsx", () => {
  it("takes a screenshot", async () => {
    await press("Spinner");
    const screen = await takeScreenshot("Spinner");
    expect(screen).toMatchBaseline();
  });
});
