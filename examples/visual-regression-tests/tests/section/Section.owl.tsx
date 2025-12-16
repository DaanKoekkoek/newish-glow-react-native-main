import { press, takeScreenshot } from "react-native-owl";

describe("Section.tsx", () => {
  it("Section", async () => {
    await press("Section");
    const screen = await takeScreenshot("Section");
    expect(screen).toMatchBaseline();
  });
  it("MySection", async () => {
    await press("MySection");
    const screen = await takeScreenshot("MySection");
    expect(screen).toMatchBaseline();
  });
});
