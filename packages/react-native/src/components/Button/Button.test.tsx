import "@testing-library/jest-dom";
import "@testing-library/react-native/extend-expect";
import { fireEvent, render } from "_test-utils";
import React from "react";
import { Text } from "react-native";

import { Button } from "./Button";
import { ButtonForLink } from "./ButtonForLink";

//Default button tests
test("renders most default button", () => {
  const { toJSON } = render(
    <Button
      onPress={() => {
        console.log("test");
      }}
    >
      Test
    </Button>,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("renders all boolean functions on button", () => {
  const { toJSON } = render(
    <Button
      fill
      inverted
      state="disabled"
      onPress={() => {
        console.log("test");
      }}
    >
      Test
    </Button>,
  );
  expect(toJSON()).toMatchSnapshot();
});

//Emphasised button tests
test("renders emphasised large button", () => {
  const { toJSON } = render(
    <Button
      prominence="emphasised"
      size="lg"
      onPress={() => {
        console.log("test");
      }}
    >
      Test
    </Button>,
  );
  expect(toJSON()).toMatchSnapshot();
});

//Secondary button tests
test("renders secondary small button", () => {
  const { toJSON } = render(
    <Button
      prominence="secondary"
      size="sm"
      onPress={() => {
        console.log("test");
      }}
    >
      Test
    </Button>,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("click button to check if callback works", () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(<Button onPress={onPressMock}>Test</Button>);
  fireEvent(getByTestId("button"), "click");
  expect(onPressMock).toHaveBeenCalled();
});

test("click outside of stretched button to check if callback works", () => {
  const onPressMock = jest.fn();
  const { getByTestId } = render(
    <Button stretched onPress={onPressMock}>
      <Text>Stretched button</Text>
    </Button>,
  );
  fireEvent(getByTestId("button"), "click");
  expect(onPressMock).toHaveBeenCalled();
});

test("renders as text-elements when provided asText", () => {
  const { toJSON } = render(<ButtonForLink>Button as text</ButtonForLink>);
  // @ts-ignore
  expect(toJSON().type!).toBe("Text");
});

test("ButtonForLink wrapped in anchor tag triggers event handler", () => {
  const mockOnPress = jest.fn();
  const { getByTestId } = render(
    <a href="#" onClick={mockOnPress}>
      <ButtonForLink>Button as text</ButtonForLink>
    </a>,
  );
  const button = getByTestId("button");
  fireEvent(button, "click");
  expect(mockOnPress).toHaveBeenCalled();
});

test("renders Button with Button.Icon", () => {
  const { toJSON } = render(
    <Button
      onPress={() => {
        console.log("test");
      }}
    >
      <Button.Icon name="airplane" />
      Test
    </Button>,
  );
  expect(toJSON()).toMatchSnapshot();
});

test("renders loading spinner if the state is loading", () => {
  const { getByTestId } = render(<Button state="loading">Test</Button>);

  expect(getByTestId("loading-icon")).toBeTruthy();
});
