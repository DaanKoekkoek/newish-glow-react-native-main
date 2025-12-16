import { press, takeScreenshot, toExist } from "react-native-owl";

describe("Snackbar.tsx", () => {
  it.each([
    "SnackbarLoading",
    "SnackbarError",
    "SnackbarSuccess",
    "SnackbarDefault",
  ])("%i", async (name) => {
    await press(name);
    await toExist("snackbar");

    const screen = await takeScreenshot(name);
    expect(screen).toMatchBaseline();
  });
});
