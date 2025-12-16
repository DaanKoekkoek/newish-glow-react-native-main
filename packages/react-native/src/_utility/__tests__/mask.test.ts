import { maskDate } from "../utils";

describe("Utils - Mask Date", () => {
  const PATTERN = "dd-mm-yyyy";

  it("can mask the text by given format", () => {
    const input = "10011994"; // 10-01-1994
    const caret = input.length; // assumes user typed the input now caret is at EOL.

    const masked = maskDate(input, caret, PATTERN);
    expect(masked).toBe("10-01-1994");
  });

  it("can mask the text if caret is not at the EOL", () => {
    const input = "10-01-1994"; // inserting 10 at the start
    const caret = 1; // assumes user typed the input now caret is at EOL.

    const masked = maskDate(input, caret, PATTERN);
    expect(masked).toBe("10-01-1994");
  });
});
