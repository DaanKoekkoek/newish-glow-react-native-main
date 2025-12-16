import { render } from "_test-utils";
import React from "react";

import { AFM } from "./AFM";

describe("AFM Component", () => {
  it("should render the correctly", () => {
    const { toJSON } = render(<AFM />);
    expect(toJSON()).toMatchSnapshot();
  });
});
