import { press, takeScreenshot } from "react-native-owl";

describe("InputDatePicker", () => {
  it("takes a screenshot", async () => {
    await press("InputDatePicker");
    await press("glow-input-field-affix-date-picker");

    const screen = await takeScreenshot("InputDatePicker");
    await press("glow-date-picker-modal-close_button");
    expect(screen).toMatchBaseline();
  });
});
