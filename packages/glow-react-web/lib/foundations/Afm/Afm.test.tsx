import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import meta, { Basic } from "./Afm.stories";

const AfmStory = composeStory(Basic, meta);

describe("<AFM />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(<AfmStory {...AfmStory.args} />);
    expect(container).toMatchSnapshot();
  });
});
