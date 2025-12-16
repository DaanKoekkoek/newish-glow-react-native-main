import { composeStory } from "@storybook/react";
import { fireEvent, render, screen, within } from "_test-utils";
import { Icon } from "foundations/Icon";
import React from "react";
import { Text, View } from "react-native";

import meta, { Basic } from "./StickyBar.stories";

const StickyBar = composeStory(Basic, meta);

describe("<StickyBar />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<StickyBar {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders button and click works", () => {
    const mockOnPressHandler = jest.fn();
    const { getByTestId } = render(
      <StickyBar
        {...Basic.args}
        button={{
          text: "Checkout",
          onPress: mockOnPressHandler,
        }}
      />,
    );

    const buttonWrapper = getByTestId("stickybar-button-wrapper");
    const button = within(buttonWrapper).getByRole("button");

    expect(button).toBeDefined();
    expect(mockOnPressHandler).not.toHaveBeenCalled();
    fireEvent.press(button);
    expect(mockOnPressHandler).toHaveBeenCalled();
  });

  it("renders content childcomponent", () => {
    const { getByText } = render(<StickyBar {...Basic.args} />);
    expect(getByText("Replace me")).toBeDefined();
  });

  it("check if modal works", () => {
    render(<StickyBar {...Basic.args} />);
    const openModalButton = screen.getAllByTestId("button")[0];

    expect(screen.queryByText("Extra's")).toBeNull();
    fireEvent.press(openModalButton);
    expect(screen.getByText("Extra's")).toBeDefined();

    const backdrop = screen.getByTestId("backdrop");
    fireEvent.press(backdrop);
    expect(screen.queryByText("Extra's")).toBeNull();
  });

  it("renders correct icon when bottom positioned", () => {
    const { getAllByTestId } = render(<StickyBar {...Basic.args} />);

    const openModalButton = getAllByTestId("button")[0];
    const icon = openModalButton.findByType(Icon);
    expect(icon.props.name).toMatch("chevron-up");
  });

  it("renders correct icon when top positioned", () => {
    const { getAllByTestId } = render(
      <StickyBar {...Basic.args} position="top" />,
    );

    const openModalButton = getAllByTestId("button")[0];
    const icon = openModalButton.findByType(Icon);
    expect(icon.props.name).toMatch("chevron-down");
  });

  it("renders content full width if; width == default", () => {
    const { getByTestId } = render(<StickyBar {...Basic.args} />);

    const contentElement = getByTestId("stickybar-content-wrapper");

    expect(contentElement.props.style[0].flexGrow).toBe(1);
  });

  it("renders content as contained as possible if; width == narrow", () => {
    const { getByTestId } = render(
      <StickyBar {...Basic.args} width="narrow" />,
    );

    const contentElement = getByTestId("stickybar-content-wrapper");

    expect(contentElement.props.style[0].flexGrow).toBe(1);
  });

  it("renders button next to content if; layout === default", () => {
    const { getByTestId } = render(<StickyBar {...Basic.args} />);

    const contentElement = getByTestId("stickybar-content-layout");

    expect(contentElement.props.style[0].flexDirection).toBe("row");
  });

  it("renders button below content if; layout === stacked", () => {
    const { getByTestId } = render(
      <StickyBar {...Basic.args} layout="stacked" />,
    );

    const contentElement = getByTestId("stickybar-content-layout");

    expect(contentElement.props.style[0].flexDirection).toBe("column");
  });

  it("renders modal, button, and children if they are provided via the props", () => {
    const { queryByTestId } = render(
      <StickyBar
        {...Basic.args}
        button={{
          text: "Button",
          onPress: () => {
            alert("Button pressed");
          },
        }}
        modal={{
          title: "Cart title",
          children: <Text>Modal children</Text>,
        }}
        layout="stacked"
      >
        <View testID="children">
          <Text>children</Text>
        </View>
      </StickyBar>,
    );

    expect(queryByTestId("stickybar-button-wrapper")).toBeTruthy();
    expect(queryByTestId("stickybar-modal-wrapper")).toBeTruthy();
    expect(queryByTestId("stickybar-children")).toBeTruthy();
  });
});
