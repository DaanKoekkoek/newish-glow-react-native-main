import { render } from "_test-utils";
import React from "react";

import { IDEAL } from "./IDEAL";

describe("iDEAL Component", () => {
  it("should render the correctly", () => {
    const { toJSON } = render(<IDEAL />);
    expect(toJSON()).toMatchSnapshot();
  });
});
