import { render } from "_test-utils";
import React from "react";

import { Attention } from "./Attention";
import type { AttentionVariant } from "./Attention.types";

const variants: AttentionVariant[] = [
  "information",
  "error",
  "success",
  "warning",
];

describe.each(variants)("%s Attention", (variant) => {
  test("renders a stable snapshot", () => {
    const { toJSON } = render(
      <Attention text="attention!" variant={variant} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
