import { render } from "_test-utils";
import React from "react";

import { Status } from "./Status";
import type { StatusType } from "./Status.types";

describe.each([
  ["success", "Success"],
  ["warning", "Warning"],
  ["error", "Error"],
])("%s <Status />", (statusType, statusText) => {
  test("renders a stable snapshot", () => {
    const { toJSON } = render(
      <Status type={statusType as StatusType} statusText={statusText} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
