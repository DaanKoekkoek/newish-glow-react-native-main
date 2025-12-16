import { press, takeScreenshot } from "react-native-owl";

describe("Tooltip.tsx", () => {
  it("Open tooltip screen", async () => {
    await press("Tooltip");
  });
  it("Press button", async () => {
    await press("Tooltip-1");
  });

  it("Press button", async () => {
    await press("Tooltip-2");
  });

  it("Press button", async () => {
    await press("Tooltip-3");
  });

  it("Press button", async () => {
    await press("Tooltip-4");
  });

  it("takes a screenshot", async () => {
    const screen = await takeScreenshot("Tooltip");
    expect(screen).toMatchBaseline();
  });
});
