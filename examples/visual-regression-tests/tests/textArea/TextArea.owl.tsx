import { press, takeScreenshot } from "react-native-owl";

describe("TextArea.tsx", () => {
  it("takes a screenshot", async () => {
    await press("TextArea");
    const screen = await takeScreenshot("TextArea");
    expect(screen).toMatchBaseline();
  });
});
