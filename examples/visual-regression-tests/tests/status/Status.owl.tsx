import { press, takeScreenshot } from "react-native-owl";

describe("Status.tsx", () => {
  it("baseline matches Status component screen", async () => {
    await press("Status");
    const screen = await takeScreenshot("Status");
    expect(screen).toMatchBaseline();
  });
});
