import { render } from "_test-utils";
import React from "react";

import { DefinitionList, DefinitionListItem } from "./DefinitionList";

describe("DefinitionList component", () => {
  it("renders correctly with multiple items", () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <DefinitionList>
        <DefinitionListItem title="Term 1" description="Description 1" />
        <DefinitionListItem title="Term 2" description="Description 2" />
      </DefinitionList>,
    );

    expect(getByTestId("def-list")).toBeTruthy();
    expect(getAllByTestId("def-list-item").length).toBe(2);
    expect(getByText("Term 1")).toBeTruthy();
    expect(getByText("Description 1")).toBeTruthy();
    expect(getByText("Term 2")).toBeTruthy();
    expect(getByText("Description 2")).toBeTruthy();

    // TODO: we should replace this with more robust functional tests
    expect(Object.assign({}, ...getByText("Term 2").props.style).color).toBe(
      "#000000",
    );
    expect(
      Object.assign({}, ...getByText("Description 2").props.style).color,
    ).toBe("#000000");
  });

  it("applies custom color", () => {
    const { getByText } = render(
      <DefinitionList color="inverted">
        <DefinitionList.Item
          title="Custom Color Term"
          description="Custom Color Description"
        />
      </DefinitionList>,
    );

    const titleElement = getByText("Custom Color Term");
    const descriptionElement = getByText("Custom Color Description");
    expect(Object.assign({}, ...titleElement.props.style).color).toBe(
      "#ffffff",
    );
    expect(Object.assign({}, ...descriptionElement.props.style).color).toBe(
      "#ffffff",
    );
  });
});
