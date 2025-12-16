import { fireEvent, render, screen } from "_test-utils";
import React from "react";
import type { GestureResponderEvent } from "react-native";

import { List } from "./List";
import { Button } from "../Button";

describe("<List/>", () => {
  it("renders a basic list", () => {
    const { toJSON } = render(
      <List>
        <List.Item title="Item 2" />
        <List.Item title="Item 3" />
      </List>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders Default background variant", () => {
    const { getByTestId } = render(
      <List>
        <List.Item title="Item 1" />
        <List.Item title="Item 2" />
      </List>,
    );

    expect(getByTestId("list").props["style"].backgroundColor).toBe("#ecf2ff");
  });
});

describe("<ListItem/>", () => {
  it("renders detail and action when both are provided", () => {
    const { getByText } = render(
      <List.Item
        title="Item"
        detail="Details"
        action={<Button>Action</Button>}
      />,
    );

    expect(getByText("Details")).toBeTruthy();
    expect(getByText("Action")).toBeTruthy();
  });

  it("renders multiple listItems", () => {
    const { getAllByTestId } = render(
      <List>
        <List.Item title="Item 1" />
        <List.Item title="Item 2" />
        <List.Item title="Item 3" />
      </List>,
    );

    expect(getAllByTestId("list-item").length).toBe(3);
    expect(getAllByTestId("divider").length).toBe(2);
  });

  it("fires onPress when the ListItem is pressed", () => {
    const onPressMock = jest.fn();
    render(<List.Item title="Clickable Item" onPress={() => onPressMock()} />);

    fireEvent.press(screen.getByRole("button")); // Assuming the ListItem is the only button/pressable
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("passes event to onPress handler when the ListItem is pressed", () => {
    const onPressMock = jest.fn();
    const mockEvent = { type: "event" } as GestureResponderEvent;
    render(
      <List.Item title="Clickable Item" onPress={(e) => onPressMock(e)} />,
    );

    fireEvent.press(screen.getByRole("button"), mockEvent); // Assuming the ListItem is the only button/pressable
    expect(onPressMock).toHaveBeenCalledWith(mockEvent);
  });

  it("renders descriptions when provided", () => {
    const { getByText } = render(
      <List.Item
        title="Item"
        description1="First Description"
        description2="Second Description"
      />,
    );

    expect(getByText("Item")).toBeTruthy();
    expect(getByText("First Description")).toBeTruthy();
    expect(getByText("Second Description")).toBeTruthy();
  });

  it("renders attention text when provided", () => {
    const { getByText } = render(
      <List.Item
        title="Attention Item"
        attention={{ text: "Attention Text" }}
      />,
    );

    expect(getByText("Attention Text")).toBeTruthy();
  });
});
