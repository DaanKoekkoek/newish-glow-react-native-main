import { render } from "_test-utils";
import React from "react";

import { Slider } from "./Slider";

describe("<Slider />", () => {
  it("renders default slider", () => {
    const { toJSON } = render(<Slider minValue={0} maxValue={100} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders slider when a value is provided", () => {
    const { toJSON } = render(
      <Slider minValue={0} value={50} maxValue={100} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders slider when position is provided and is the maximum value", () => {
    const { toJSON } = render(
      <Slider minValue={0} value={100} maxValue={100} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
