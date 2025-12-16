// import { screen } from "@testing-library/react-native";
import { press, takeScreenshot } from "react-native-owl";

describe("InputFieldSearch.tsx", () => {
  it("InputFieldSearch", async () => {
    // const { findByTestId } = screen;
    await press("InputFieldSearch");

    const screenshot = await takeScreenshot("InputFieldSearch");

    expect(screenshot).toMatchBaseline();

    // const element = await findByTestId("input-dropdown-suggestion-input");

    // element.blur();
  });
});
