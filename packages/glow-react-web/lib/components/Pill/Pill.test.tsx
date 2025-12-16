import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import meta, { Default } from "./Pill.stories";

const PillStory = composeStory(Default, meta);

describe("<Pill /> Default story (snapshot)", () => {
  it("matches the snapshot", () => {
    const { container } = render(<PillStory {...PillStory.args} />);
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when checked", () => {
    const { container } = render(
      <PillStory {...PillStory.args} checked={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when disabled", () => {
    const { container } = render(
      <PillStory {...PillStory.args} state="inactive" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when logo variant", () => {
    const { container } = render(
      <PillStory {...PillStory.args} variant="logo" brand="Apple" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when logo variant and disabled", () => {
    const { container } = render(
      <PillStory
        {...PillStory.args}
        variant="logo"
        brand="Apple"
        state="inactive"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches the snapshot when logo variant and checked", () => {
    const { container } = render(
      <PillStory {...PillStory.args} variant="logo" brand="Apple" checked />,
    );
    expect(container).toMatchSnapshot();
  });
});
