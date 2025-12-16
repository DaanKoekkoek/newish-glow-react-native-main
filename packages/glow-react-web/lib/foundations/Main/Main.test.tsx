import { composeStory } from "@storybook/react";

import meta, { Basic, WithHeaderAndFooter } from "./Main.stories";
import { render } from "@testing-library/react";

const Main = composeStory(Basic, meta);

describe("<Main/>", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(<Main {...Main.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders stable snapshot with header and footer", () => {
    const { asFragment } = render(<Main {...WithHeaderAndFooter.args} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
