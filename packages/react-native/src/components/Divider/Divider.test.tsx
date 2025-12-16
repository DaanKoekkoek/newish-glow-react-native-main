import { render } from "_test-utils";
import React from "react";

import { Divider } from "./Divider";

describe("<Divider />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with subtle prominence", () => {
    const { toJSON } = render(<Divider prominence="subtle" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
