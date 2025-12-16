import { press, takeScreenshot } from "react-native-owl";

describe("InputFieldAutoSuggest.tsx", () => {
  it("InputFieldAutoSuggest", async () => {
    // const { findByTestId } = screen;
    await press("InputFieldAutoSuggest");

    const screenshot = await takeScreenshot("InputFieldAutoSuggest");

    expect(screenshot).toMatchBaseline();

    // const element = await findByTestId("input-dropdown-suggestion-input");

    // element.blur();
  });

  it("InputFieldAutoSuggest with category", async () => {
    // const { findByTestId } = screen;

    await press("InputFieldAutoSuggestCategory");

    const screenshot = await takeScreenshot(
      "InputFieldAutoSuggestionsCategory",
    );

    expect(screenshot).toMatchBaseline();

    // const element = await findByTestId("input-dropdown-suggestion-input");

    // element.blur();
  });
});
