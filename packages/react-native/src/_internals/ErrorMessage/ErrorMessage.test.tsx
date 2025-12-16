import { render } from "_test-utils";
import React from "react";

import { ErrorMessage } from "./ErrorMessage";

describe("<ErrorMessage />", () => {
  it("does not render when the 'text' evaluates to 'undefined'", () => {
    const { queryByTestId } = render(<ErrorMessage text={undefined} />);

    expect(queryByTestId("error-message-container")).toBeFalsy();
  });

  it("renders when the 'text' prop is provided", () => {
    const { getByTestId, getByText } = render(
      <ErrorMessage text="Error message here" />,
    );

    expect(getByTestId("error-message-container")).toBeTruthy();
    expect(getByTestId("status-alert")).toBeTruthy();
    expect(getByText("Error message here")).toBeTruthy();
  });
});
