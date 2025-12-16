import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import meta, { Ideal, Idin } from "./Pay.stories";

const IdealStory = composeStory(Ideal, meta);
const IdinStory = composeStory(Idin, meta);

describe("<Pay />", () => {
  it("renders a stable snapshot for iDeal", () => {
    const { container } = render(<IdealStory {...IdealStory.args} />);
    expect(container).toMatchSnapshot();
  });

  it("renders a stable snapshot for iDin", () => {
    const { container } = render(<IdinStory {...IdinStory.args} />);
    expect(container).toMatchSnapshot();
  });
});
