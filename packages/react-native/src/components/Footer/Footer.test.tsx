import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Default } from "./Footer.stories";

const FooterStory = composeStory(Default, meta);

describe("<Footer />", () => {
  it("renders a stable snapshot", () => {
    const { toJSON } = render(<FooterStory {...FooterStory.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders Footer.Bottom", () => {
    const { getByTestId } = render(<FooterStory {...FooterStory.args} />);
    expect(getByTestId("footer-bottom")).toBeTruthy();
  });

  it("renders Footer.Top", () => {
    const { getByTestId } = render(<FooterStory {...FooterStory.args} />);
    expect(getByTestId("footer-top")).toBeTruthy();
  });

  it("creates collapsible columns", () => {
    const { getAllByTestId } = render(<FooterStory {...FooterStory.args} />);
    expect(getAllByTestId("footer-column-collapsible").length).toBeTruthy();
  });

  it("renders column title", () => {
    const { getByText } = render(<FooterStory {...FooterStory.args} />);
    expect(getByText("Column title 1")).toBeTruthy();
  });

  it("renders Footer.Link", () => {
    const { getAllByTestId } = render(<FooterStory {...FooterStory.args} />);
    expect(getAllByTestId("link-text").length).toBeTruthy();
  });

  it("renders copyright", () => {
    const { getByText } = render(<FooterStory {...FooterStory.args} />);
    expect(getByText("© Copyright text")).toBeTruthy();
  });
});
