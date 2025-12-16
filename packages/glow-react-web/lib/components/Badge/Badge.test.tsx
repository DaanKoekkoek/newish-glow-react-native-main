import { composeStory } from "@storybook/react";

import meta, { Basic } from "./Badge.stories";
import { render } from "@testing-library/react";

const Badge = composeStory(Basic, meta);

describe("<Badge />", () => {
  it("renders correctly basic badge default", () => {
    const { asFragment } = render(<Badge prominence="default" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly subtle badge subtle", () => {
    const { asFragment } = render(<Badge prominence="subtle" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly outlined badge outline", () => {
    const { asFragment } = render(<Badge prominence="outline" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly basic badge inactive default", () => {
    const { asFragment } = render(
      <Badge prominence="default" state="inactive" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly subtle badge inactive subtle", () => {
    const { asFragment } = render(
      <Badge prominence="subtle" state="inactive" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly outlined badge inactive outline", () => {
    const { asFragment } = render(
      <Badge prominence="outline" state="inactive" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
