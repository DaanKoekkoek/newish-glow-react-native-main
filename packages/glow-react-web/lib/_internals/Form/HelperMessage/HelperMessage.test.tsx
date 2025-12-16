import { render, screen } from "@testing-library/react";

import { HelperMessage } from "./HelperMessage";

describe("<HelperMessage />", () => {
  it("does not render when the 'children' evaluates to 'undefined'", () => {
    render(<HelperMessage />);

    expect(screen.queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders when the 'children' prop is provided", () => {
    render(<HelperMessage>Helper text here</HelperMessage>);

    expect(screen.getByText("Helper text here")).toBeTruthy();
  });
});
