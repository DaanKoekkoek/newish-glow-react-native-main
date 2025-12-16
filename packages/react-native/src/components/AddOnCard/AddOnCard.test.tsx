import { fireEvent, render } from "_test-utils";
import React from "react";

import { AddOnCard } from "./AddOnCard";
import type { AddOnCardProps } from "./AddOnCard.types";

describe("AddOnCard", () => {
  const mockOnPress = jest.fn();

  const mockDefaultProps: AddOnCardProps = {
    id: "1",
    onPress: mockOnPress,
    title: "Title",
    description: "Description",
    promotion: "Promotion",
    button: { selected: { text: "Modify" }, unselected: { text: "Add" } },
    highlight: "Highlight",
    addon: "Netflix",
    direction: "vertical",
    selected: false,
    state: "default",
    price: {
      showFrequency: true,
      beforeText: "from",
      value: "10,00",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with required: 'title', 'visualVariant', 'button' and without optional: 'description', 'promotion', 'highLight', 'price'", () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <AddOnCard
        id="1"
        title="title"
        onPress={() => {}}
        state="default"
        addon="Netflix"
      />,
    );

    // In view
    expect(getByText("title")).toBeTruthy();
    expect(getByTestId("add-on-card-visual_addon")).toBeTruthy();
    expect(getByTestId("add-on-card-button")).toBeTruthy();

    // Not in view
    expect(queryByTestId("add-on-card-description")).toBeNull();
    expect(queryByTestId("add-on-card-promotion")).toBeNull();
    expect(queryByTestId("add-on-card-price_price")).toBeNull();
    expect(queryByTestId("add-on-card-highlight")).toBeFalsy();
  });

  it("renders with button icon, only when provided via the props and toggles icon and button text on 'selected' state", () => {
    const { getByText, queryAllByTestId, getAllByTestId, rerender } = render(
      <AddOnCard {...mockDefaultProps} />,
    );

    expect(queryAllByTestId("button-icon")).toHaveLength(0);
    expect(getByText("Add")).toBeDefined();

    // Unselected with icon
    rerender(
      <AddOnCard
        {...mockDefaultProps}
        button={{
          selected: { text: "Modify", icon: { name: "edit" } },
          unselected: { text: "Add", icon: { name: "add" } },
        }}
      />,
    );

    expect(getAllByTestId("base-button-icon")).toHaveLength(1);

    // Selected with icon
    rerender(
      <AddOnCard
        {...mockDefaultProps}
        button={{
          selected: { text: "Modify", icon: { name: "edit" } },
          unselected: { text: "Add", icon: { name: "add" } },
        }}
        selected
      />,
    );

    expect(getByText("Modify")).toBeDefined();
    expect(getAllByTestId("base-button-icon")).toHaveLength(1);
  });

  it("renders with optional ui elements when provided via the props: 'description', 'promotion', 'buttonText', 'highLight', 'price'", () => {
    const { getByText, getByTestId } = render(
      <AddOnCard {...mockDefaultProps} />,
    );

    // In view
    expect(getByText("Description")).toBeTruthy();
    expect(getByText("Promotion")).toBeTruthy();
    expect(getByText("Add")).toBeTruthy();
    expect(getByText("10,00 per maand")).toBeTruthy();
    expect(getByTestId("add-on-card-highlight")).toBeTruthy();
  });

  it("handles the onPress event and call the function with the id as argument", () => {
    const { getByText } = render(<AddOnCard {...mockDefaultProps} />);

    expect(mockOnPress).not.toHaveBeenCalled();

    fireEvent.press(getByText("Add"));

    expect(mockOnPress).toHaveBeenNthCalledWith(1, "1");

    fireEvent.press(getByText("Add"));

    expect(mockOnPress).toHaveBeenNthCalledWith(2, "1");
  });

  it("handles the onPress event and call the function with the id as argument", () => {
    const { getByText } = render(<AddOnCard {...mockDefaultProps} />);

    expect(mockOnPress).not.toHaveBeenCalled();

    fireEvent.press(getByText("Add"));

    expect(mockOnPress).toHaveBeenNthCalledWith(1, "1");

    fireEvent.press(getByText("Add"));

    expect(mockOnPress).toHaveBeenNthCalledWith(2, "1");
  });

  it("renders the styles related to the 'state' prop", () => {
    const { getByTestId, rerender } = render(
      <AddOnCard {...mockDefaultProps} state="default" />,
    );
    const pressable = getByTestId("add-on-card-pressable");

    expect(pressable.props.accessibilityState.disabled).toBe(false);

    rerender(<AddOnCard {...mockDefaultProps} state="inactive" />);

    expect(pressable.props.accessibilityState.disabled).toBe(true);
  });

  it("renders the styles related to the 'direction' prop", () => {
    const { getByTestId, rerender } = render(
      <AddOnCard {...mockDefaultProps} />,
    );
    const card = getByTestId("add-on-card-jsx");

    expect(card.props.style.flexDirection).toBe("column");

    rerender(<AddOnCard {...mockDefaultProps} direction="horizontal" />);

    expect(card.props.style.flexDirection).toBe("row");
  });

  it("renders the styles related to the 'selected' prop", () => {
    const { getByTestId, rerender } = render(
      <AddOnCard {...mockDefaultProps} />,
    );
    const pressable = getByTestId("add-on-card-pressable");

    expect(pressable.props.accessibilityState.checked).toBe(false);

    rerender(<AddOnCard {...mockDefaultProps} selected />);

    expect(pressable.props.accessibilityState.checked).toBe(true);
  });
});
