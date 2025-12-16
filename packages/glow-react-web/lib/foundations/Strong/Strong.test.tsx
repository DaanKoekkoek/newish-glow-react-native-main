import { render } from "@testing-library/react";
import { Strong } from "./Strong";

describe("Strong component", () => {
  test("should match the snapshot", async () => {
    const { asFragment } = render(<Strong>Testing font</Strong>);

    expect(asFragment()).toMatchSnapshot();
  });
});
