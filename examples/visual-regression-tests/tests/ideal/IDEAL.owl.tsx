import { press, takeScreenshot } from "react-native-owl";

describe("IDEAL", () => {
  it("baseline matches IDEAL component", async () => {
    await press("IDEAL");
    const screen = await takeScreenshot("IDEAL");
    expect(screen).toMatchBaseline();
  });
});
