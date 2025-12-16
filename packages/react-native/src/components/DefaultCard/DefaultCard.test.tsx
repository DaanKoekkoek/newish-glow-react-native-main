import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { WithoutCallToAction } from "./DefaultCard.stories";

const CardWithoutCallToAction = composeStory(WithoutCallToAction, meta);

test("displays badge, highlight and price if supplied as props", () => {
  const { getByTestId } = render(
    <CardWithoutCallToAction {...CardWithoutCallToAction.args} />,
  );

  expect(getByTestId("badge")).toBeTruthy();
  expect(getByTestId("highlight")).toBeTruthy();
  expect(getByTestId("price-context_price")).toBeTruthy();
});
