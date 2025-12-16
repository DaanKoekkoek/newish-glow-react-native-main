import { press, takeScreenshot } from "react-native-owl";

describe("Buttons", () => {
  it("Default button", async () => {
    await press("ButtonDefault");
    const screen = await takeScreenshot("ButtonDefault");
    expect(screen).toMatchBaseline();
  });

  it("Emphasised button", async () => {
    await press("ButtonEmphasised");
    const screen = await takeScreenshot("ButtonEmphasised");
    expect(screen).toMatchBaseline();
  });

  it("Secondary button", async () => {
    await press("ButtonSecondary");
    const screen = await takeScreenshot("ButtonSecondary");
    expect(screen).toMatchBaseline();
  });

  it("Loading state button", async () => {
    await press("ButtonLoading");
    const screen = await takeScreenshot("ButtonLoading");
    expect(screen).toMatchBaseline();
  });
});
