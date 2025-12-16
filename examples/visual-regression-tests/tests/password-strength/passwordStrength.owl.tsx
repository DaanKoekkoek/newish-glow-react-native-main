import { press, takeScreenshot } from "react-native-owl";

describe("<PasswordStrength />", () => {
  it("takes a screenshot", async () => {
    await press("PasswordStrength");

    const screen = await takeScreenshot("PasswordStrength");

    expect(screen).toMatchBaseline();
  });
});
