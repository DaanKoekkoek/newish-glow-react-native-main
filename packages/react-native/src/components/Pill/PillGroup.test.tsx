import { render } from "_test-utils";
import React from "react";

import { Pill } from "./Pill";
import { PillGroup } from "./PillGroup";

describe("Given <PillGroup /> component", () => {
  it("renders correctly when disabled", () => {
    const { toJSON } = render(
      <PillGroup disabled>
        <Pill title="one" value="one" disabled />
        <Pill title="two" value="two" />
      </PillGroup>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly when not disabled", () => {
    const { toJSON } = render(
      <PillGroup>
        <Pill title="one" value="one" disabled />
        <Pill title="two" value="two" />
      </PillGroup>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly when no children provided", () => {
    const { toJSON } = render(<PillGroup />);
    expect(toJSON()).toMatchSnapshot();
  });
});
