import { press, takeScreenshot } from "react-native-owl";

describe("StepperHorizontal", () => {
  it(`presses a Stepper & takes a screenshot`, async () => {
    await press("StepperHorizontal");

    const screen = await takeScreenshot("StepperHorizontal");
    expect(screen).toMatchBaseline();
  });
});

describe("StepperVertical", () => {
  it(`presses a Stepper`, async () => {
    await press("StepperVertical");

    const screen = await takeScreenshot("StepperVertical");
    expect(screen).toMatchBaseline();
  });
});

describe("StepperScreenVerticalCollapse", () => {
  it(`presses a Stepper`, async () => {
    await press("StepperVerticalCollapse");

    await press("stepper-step-3");

    const screen = await takeScreenshot("StepperVerticalCollapse");
    expect(screen).toMatchBaseline();
  });
});

describe("StepperInpage", () => {
  it(`presses a Stepper & takes a screenshot`, async () => {
    await press("StepperInPage");

    const screen = await takeScreenshot("StepperInpage");
    expect(screen).toMatchBaseline();
  });
});
