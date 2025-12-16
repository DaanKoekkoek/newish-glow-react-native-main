import { render } from "_test-utils";
import { Button, TextLink } from "components/index";
import React from "react";

import { CallToAction } from "./CallToAction";

test("displays a single button if one is passed as a prop", () => {
  const { getAllByRole } = render(
    <CallToAction primaryAction={<Button>Button</Button>} />,
  );

  expect(getAllByRole("button").length).toEqual(1);
});

test("displays two buttons if they are passed as props", () => {
  const { getAllByRole } = render(
    <CallToAction
      primaryAction={<Button>Button</Button>}
      secondaryAction={<Button>Button 2</Button>}
    />,
  );

  expect(getAllByRole("button").length).toEqual(2);
});

test("displays a button and a text link if they are passed as props", () => {
  const { toJSON, getAllByRole } = render(
    <CallToAction
      primaryAction={<Button>Button</Button>}
      secondaryAction={<TextLink onPress={() => {}}>Text link</TextLink>}
    />,
  );

  expect(toJSON()).toMatchSnapshot();
  expect(getAllByRole("button").length).toEqual(2);
});
