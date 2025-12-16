import { render } from "_test-utils";
import React from "react";

import { HelperText } from "./HelperText";

describe("<HelperText />", () => {
  it("does not render when the 'text' evaluates to 'undefined'", () => {
    const { queryByTestId } = render(<HelperText text={undefined} />);

    expect(queryByTestId("helper-text")).toBeFalsy();
  });

  it("renders when the 'text' prop is provided", () => {
    const { getByText } = render(<HelperText text="Helper text here" />);

    expect(getByText("Helper text here")).toBeTruthy();
  });
});
