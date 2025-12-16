import { render, screen } from "@testing-library/react";

import { ErrorMessage } from "./ErrorMessage";

describe("<ErrorMessage />", () => {
  it("does not render when the 'children' evaluates to 'undefined'", () => {
    render(<ErrorMessage />);

    expect(screen.queryByTestId("error-message-container")).toBeFalsy();
  });

  it("renders when the 'children' prop is provided", () => {
    render(<ErrorMessage>Error message here</ErrorMessage>);

    expect(screen.getByTestId("error-message-container")).toBeTruthy();
    expect(screen.getByTestId("status-alert")).toBeTruthy();
    expect(screen.getByText("Error message here")).toBeTruthy();
  });
});
