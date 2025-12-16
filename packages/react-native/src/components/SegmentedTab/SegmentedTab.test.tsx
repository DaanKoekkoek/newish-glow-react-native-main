import { composeStory } from "@storybook/react";
import { waitFor, fireEvent, render } from "_test-utils";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View } from "react-native";
import "@testing-library/jest-dom";

import { SegmentedTab } from "./SegmentedTab";
import meta, { WithIcon, WithoutIcon } from "./SegmentedTab.stories";
import type { Tab } from "./SegmentedTab.types";

const WithIconStory = composeStory(WithIcon, meta);
const WithoutIconStory = composeStory(WithoutIcon, meta);

describe("SegmentedTab Component", () => {
  it("renders a stable snapshot", () => {
    const { toJSON } = render(<WithIconStory {...WithIconStory.args} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("should display an icon if passed into the content", () => {
    const { getByTestId } = render(<WithIconStory {...WithIconStory.args} />);

    const labels = WithIconStory.args.options as Tab[];
    const label = getByTestId(labels[0].label).props["aria-label"];

    expect(label).toEqual(`${labels[0].label}${labels[0].icon}`);
  });

  it("should not display an icon if not passed into the content", () => {
    const { getByTestId } = render(
      <WithoutIconStory {...WithoutIconStory.args} />,
    );

    const labels = WithoutIconStory.args.options as Tab[];
    const label = getByTestId(labels[0].label).props["aria-label"];

    expect(label).toEqual(`${labels[0].label}`);
  });

  it("should display a child component if passed into the content", () => {
    const { queryByTestId } = render(
      <WithoutIconStory {...WithoutIconStory.args} />,
    );

    expect(queryByTestId("segmented-tab-panel-child")).toBeTruthy();
  });

  it("changes the active tab when clicked", async () => {
    const { getByTestId } = render(
      <WithoutIconStory {...WithoutIconStory.args} />,
    );

    const labels = WithoutIconStory.args.options as Tab[];

    const tab2 = getByTestId(labels[1].label).props["aria-selected"];

    expect(tab2).toBe(false);

    fireEvent.press(getByTestId(labels[1].label));

    waitFor(() => {
      const tab1 = getByTestId(labels[0].label).props["aria-selected"];

      expect(tab1).toBe(false);

      const tab2 = getByTestId(labels[1].label).props["aria-selected"];

      expect(tab2).toBe(true);
    });
  });

  it("does not change active tab if the component is in inactive state", () => {
    const { getByTestId } = render(
      <WithoutIconStory {...WithoutIconStory.args} state="inactive" />,
    );

    const labels = WithoutIconStory.args.options as Tab[];

    const tab1 = getByTestId(labels[0].label).props["aria-selected"];

    expect(tab1).toBe(true);

    const tab2 = getByTestId(labels[1].label).props["aria-selected"];

    expect(tab2).toBe(false);

    fireEvent.press(getByTestId(labels[1].label));

    expect(tab1).toBe(true);
    expect(tab2).toBe(false);
  });

  it("sets the active tab if specified in the parameters", () => {
    const { getByTestId } = render(
      <WithoutIconStory {...WithoutIconStory.args} active={1} />,
    );

    const labels = WithoutIconStory.args.options as Tab[];

    const tab1 = getByTestId(labels[0].label).props["aria-selected"];
    const tab2 = getByTestId(labels[1].label).props["aria-selected"];

    expect(tab1).toBe(false);
    expect(tab2).toBe(true);
  });

  it("calls the callback when the selected tab changes", () => {
    const mockTabChange = jest.fn();

    const child1 = (
      <View>
        <Paragraph>Tab 1 Content</Paragraph>
      </View>
    );
    const child2 = (
      <View>
        <Paragraph>Tab 2 Content</Paragraph>
      </View>
    );

    const { getByTestId } = render(
      <SegmentedTab onTabChange={mockTabChange}>
        <SegmentedTab.Buttons
          options={[{ label: "Label 1" }, { label: "Label 2" }]}
        />
        <SegmentedTab.Panel child={child1} index={0} />
        <SegmentedTab.Panel child={child2} index={1} />
      </SegmentedTab>,
    );

    const labels = WithoutIconStory.args.options as Tab[];

    fireEvent.press(getByTestId(labels[1].label));

    waitFor(() => {
      expect(mockTabChange).toHaveBeenCalled();
    });
  });
});
