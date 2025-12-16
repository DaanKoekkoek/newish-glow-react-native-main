import { press, takeScreenshot } from "react-native-owl";

describe("DottedGraph", () => {
  it("Dotted Graph default", async () => {
    await press("DottedGraphDefault");
    const screen = await takeScreenshot("DottedGraphDefault");
    expect(screen).toMatchBaseline();
  });

  it("Dotted Graph large", async () => {
    await press("DottedGraphLarge");
    const screen = await takeScreenshot("DottedGraphLarge");
    expect(screen).toMatchBaseline();
  });
});
