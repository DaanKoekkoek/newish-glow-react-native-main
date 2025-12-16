import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Default } from "./DefinitionList.stories";
import { DefinitionList } from "./DefinitionList";

const DefinitionListStory = composeStory(Default, meta);

describe("<DefinitionList />", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(
      <DefinitionListStory {...DefinitionListStory.args} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("applies the default color class when no color is provided", () => {
    render(
      <DefinitionList title="Test Title">Test Description</DefinitionList>,
    );
    const textElement = screen.getByText("Test Description");
    expect(textElement).toHaveClass("definition-list-text");
    expect(textElement).not.toHaveClass("inverted");
  });

  it("applies the inverted color class when color is set to 'inverted'", () => {
    render(
      <DefinitionList title="Test Title" color="inverted">
        Test Description
      </DefinitionList>,
    );
    const textElement = screen.getByText("Test Description");
    expect(textElement).toHaveClass("inverted");
  });
});
