import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Default } from "./Footer.stories";

const FooterStory = composeStory(Default, meta);

describe("<Footer />", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(<FooterStory {...FooterStory.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Footer", () => {
    render(<FooterStory {...FooterStory.args} />);
    expect(screen.getByTestId("footer-bottom")).toBeTruthy();
  });

  it("renders Footer Top", () => {
    render(<FooterStory {...FooterStory.args} />);
    expect(screen.getByTestId("footer-top")).toBeTruthy();
  });

  it("renders column title", () => {
    render(<FooterStory {...FooterStory.args} />);
    expect(screen.getAllByText("Column title 1").length).toBeTruthy();
  });

  it("renders Footer top column links", () => {
    render(<FooterStory {...FooterStory.args} />);
    expect(screen.getAllByTestId("footer-column-link").length).toBeTruthy();
  });

  it("renders Footer assorted link", () => {
    render(<FooterStory {...FooterStory.args} />);
    expect(screen.getAllByTestId("assorted-link").length).toBeTruthy();
  });

  it("renders copyright", () => {
    render(<FooterStory {...FooterStory.args} />);
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});
