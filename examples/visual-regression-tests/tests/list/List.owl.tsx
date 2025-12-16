import { press, takeScreenshot } from "react-native-owl";

describe("List.tsx", () => {
  it("takes a screenshot", async () => {
    await press("List");

    const screen = await takeScreenshot("List");

    expect(screen).toMatchBaseline();
  });
});
