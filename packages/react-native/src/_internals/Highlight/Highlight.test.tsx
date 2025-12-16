import { render } from "_test-utils";

import { Highlight } from "./Highlight";

describe("Highlight component", () => {
  it("renders the Highlight component with default props", () => {
    const { getByText } = render(<Highlight>Test Highlight</Highlight>);

    expect(getByText("Test Highlight")).toBeTruthy();
  });
});
