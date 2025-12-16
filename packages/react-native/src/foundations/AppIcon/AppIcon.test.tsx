import { render } from "_test-utils";
import React from "react";

import { AppIcon } from "./AppIcon";
import type { AppName } from "./AppIcon.types";

describe.each([
  ["Klik & Klaar"],
  ["TV"],
  ["TV Anywhere"],
  ["Thuis Veilig Online"],
  ["Overal Veilig Online"],
  ["Hosted Voice"],
  ["Essential"],
  ["Klantkampioen"],
] as AppName[][])("AppIcon component for %s", (appName: AppName) => {
  // Test for the non-disabled state
  test(`renders correctly for ${appName} when not disabled`, () => {
    const { toJSON } = render(
      <AppIcon brand="Odido" app={appName} disabled={false} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  // Test for the disabled state
  test(`renders correctly for ${appName} when disabled`, () => {
    const { toJSON } = render(<AppIcon brand="Odido" app={appName} disabled />);
    expect(toJSON()).toMatchSnapshot();
  });
});
