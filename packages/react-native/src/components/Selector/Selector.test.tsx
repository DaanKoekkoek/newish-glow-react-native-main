import "@testing-library/jest-dom";
import "@testing-library/react-native/extend-expect";
import { fireEvent, render, screen } from "_test-utils";
import React from "react";
import { Text } from "react-native";

import { Selector } from "./Selector";
import { DefaultList } from "../DefaultList";

test("renders most default selector", () => {
  const { toJSON } = render(
    <Selector
      onPress={() => console.log("test")}
      title="Test Selector"
      state="default"
      variant="default"
      type="radio"
    />,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("renders selector with all boolean options", () => {
  const { toJSON } = render(
    <Selector
      onPress={() => console.log("test")}
      title="Test Selector"
      state="inactive"
      selected
      type="checkbox"
      variant="default"
    />,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("renders selector with badge and promotion", () => {
  const badge = <Text>Badge</Text>;
  const { toJSON } = render(
    <Selector
      onPress={() => console.log("test")}
      title="Test Selector"
      state="default"
      variant="default"
      badge={badge}
      promotion="Special Offer"
    />,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("renders extended variant with list", () => {
  const price = <Text>Price</Text>;
  const list = <Text>List Item</Text>;
  const { toJSON } = render(
    <Selector
      onPress={() => console.log("test")}
      title="Test Selector"
      state="default"
      variant="extended"
      price={price}
      list={list}
    />,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("renders compact variant", () => {
  const { toJSON } = render(
    <Selector
      onPress={() => console.log("test")}
      title="Test Selector"
      state="default"
      variant="compact"
    />,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("calls onPress when selector is pressed", () => {
  const mockOnPress = jest.fn();
  render(
    <Selector
      onPress={mockOnPress}
      title="Test Selector"
      state="default"
      variant="default"
    />,
  );
  const selector = screen.getByTestId("selector");
  fireEvent.press(selector);
  expect(mockOnPress).toHaveBeenCalled();
});

test("renders promotion text if provided", () => {
  render(
    <Selector
      onPress={() => {}}
      title="Test Selector"
      state="default"
      promotion="Special Offer"
      variant="default"
    />,
  );
  expect(screen.getByText("Special Offer")).toBeTruthy();
});

test("renders checkbox if type is checkbox", () => {
  render(
    <Selector
      onPress={() => {}}
      title="Test Selector"
      state="default"
      type="checkbox"
      variant="default"
    />,
  );
  expect(screen.getByTestId("checkbox")).toBeTruthy();
});

test("renders badge if provided and variant is not compact", () => {
  const badge = <Text>Badge</Text>;
  render(
    <Selector
      onPress={() => {}}
      title="Test Selector"
      state="default"
      variant="default"
      badge={badge}
    />,
  );
  expect(screen.getByText("Badge")).toBeTruthy();
});

test("renders price if provided and variant is not compact", () => {
  const price = <Text>Price</Text>;
  render(
    <Selector
      onPress={() => {}}
      title="Test Selector"
      state="default"
      variant="default"
      price={price}
    />,
  );
  expect(screen.getByText("Price")).toBeTruthy();
});

test("renders secondary action if provided and variant is not compact", () => {
  const secondaryAction = <Text>Secondary Action</Text>;
  render(
    <Selector
      onPress={() => {}}
      title="Test Selector"
      state="default"
      variant="default"
      secondaryAction={secondaryAction}
    />,
  );
  expect(screen.getByText("Secondary Action")).toBeTruthy();
});

test("renders titleStrikethrough if provided", () => {
  render(
    <Selector
      onPress={() => {}}
      title="Test Selector"
      titleStrikethrough="Old Title"
      state="default"
      variant="extended"
      list={
        <DefaultList variant="icon">
          <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
          <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
          <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        </DefaultList>
      }
    />,
  );
  expect(screen.getByText("Old Title")).toBeTruthy();
});
