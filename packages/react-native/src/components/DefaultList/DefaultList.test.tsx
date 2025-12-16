import { render } from "_test-utils";
import React from "react";

import { DefaultList } from "./DefaultList";

describe("DefaultList component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <DefaultList>
        <DefaultList.Item>Item 1</DefaultList.Item>
        <DefaultList.Item>Item 2</DefaultList.Item>
      </DefaultList>,
    );
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });

  it('renders icons when variant is set to "Icon"', () => {
    const { getByText } = render(
      <DefaultList variant="icon">
        <DefaultList.Item icon="checkmark">Checkmark Item</DefaultList.Item>
      </DefaultList>,
    );
    expect(getByText("Checkmark Item")).toBeTruthy();
  });

  it('renders icons when variant is set to "Icon"', () => {
    const { getByText } = render(
      <DefaultList variant="icon" inactive>
        <DefaultList.Item icon="checkmark">Inactive</DefaultList.Item>
      </DefaultList>,
    );
    const itemText = getByText("Inactive");
    expect(itemText.props.style[1].color).toBe("#999999");
  });

  it('renders numbers for the "Numbered" variant', () => {
    const { getByText } = render(
      <DefaultList variant="numbered">
        <DefaultList.Item>Numbered Item 1</DefaultList.Item>
        <DefaultList.Item>Numbered Item 2</DefaultList.Item>
      </DefaultList>,
    );
    expect(getByText("1.")).toBeTruthy();
    expect(getByText("2.")).toBeTruthy();
  });

  it("renders styling and size correctly", () => {
    const { getByText } = render(
      <DefaultList color="inverted" size="sm">
        <DefaultList.Item icon="checkmark">Custom Style Item</DefaultList.Item>
      </DefaultList>,
    );

    const itemText = getByText("Custom Style Item");
    expect(itemText.props.style[1].color).toBe("#ffffff");
    expect(itemText.props.style[1].fontSize).toBe(16);
  });
});
