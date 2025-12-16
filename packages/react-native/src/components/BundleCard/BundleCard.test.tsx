import { render } from "_test-utils";
import React from "react";

import { BundleCard } from "./BundleCard";

const mockOnPres = jest.fn();

describe("<BundleCard />", () => {
  it("renders stable snapshot", () => {
    const { toJSON } = render(
      <BundleCard
        variant="default"
        topLabel="Product name"
        bottomLabel="Bundle name"
        onPressButton={mockOnPres}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
