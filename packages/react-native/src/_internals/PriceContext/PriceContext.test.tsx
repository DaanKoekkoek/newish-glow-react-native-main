import { render } from "_test-utils";
import React from "react";

import { PriceContext } from "./PriceContext";

const propsMock = {
  value: "10",
};

test("displays a price", () => {
  const { getByTestId } = render(<PriceContext priceProps={propsMock} />);
  expect(getByTestId("price-context_price")).toBeTruthy();
});

test("displays a description", () => {
  const { getByText } = render(
    <PriceContext description="Description text" priceProps={propsMock} />,
  );
  expect(getByText("Description text")).toBeTruthy();
});

test("displays a disclaimer", () => {
  const { getByText } = render(
    <PriceContext disclaimer="Disclaimer text" priceProps={propsMock} />,
  );
  expect(getByText("Disclaimer text")).toBeTruthy();
});
