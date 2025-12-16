import { render } from "@testing-library/react";
import { Highlight } from "./Highlight";

describe("Highlight component", () => {
  it("renders stable snapshot", () => {
    const { asFragment } = render(<Highlight>Test Highlight</Highlight>);
    expect(asFragment()).toMatchSnapshot();
  });
});
