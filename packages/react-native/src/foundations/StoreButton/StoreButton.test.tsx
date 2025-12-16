import { render } from "_test-utils";
import React from "react";

import { StoreButton } from "./StoreButton";
import type {
  StoreBrand,
  StoreButtonProminence,
  StoreButtonVariant,
} from "./StoreButton.types";

describe.each([
  ["Apple", "secondary", "inverted"],
  ["Google", "secondary", "inverted"],
])("StoreButton with brand %s", (brand, prominence, variant) => {
  test(`renders correctly with brand ${brand}`, () => {
    const { toJSON } = render(
      <StoreButton
        brand={brand as StoreBrand}
        prominence={prominence as StoreButtonProminence}
        variant={variant as StoreButtonVariant}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
