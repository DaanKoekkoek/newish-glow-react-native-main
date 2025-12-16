import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import metaList, { Basic as BasicList } from "./SummaryList.stories";
import type { SummaryListItemProps } from "./SummaryList.types";
import metaListItem, {
  Basic as BasicListItem,
} from "./SummaryListItem.stories";

const SummaryList = composeStory(BasicList, metaList);
const SummaryListItem = composeStory(BasicListItem, metaListItem);

describe("<SummaryList />", () => {
  it("renders a summary list", () => {
    const { toJSON } = render(<SummaryList {...BasicList.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders multiple SummaryList.Item components", () => {
    const { getAllByTestId } = render(<SummaryList {...BasicList.args} />);

    expect(getAllByTestId(/summary-list-item-\d+/).length).toBe(2);
    expect(getAllByTestId("divider").length).toBe(1);
  });
});

describe("<SummaryList.Item />", () => {
  const setupListItem = (args?: Omit<SummaryListItemProps, "heading">) =>
    render(<SummaryListItem {...BasicListItem.args} {...args} />);

  it("renders correctly", () => {
    const { toJSON } = setupListItem();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders actions when state is set to `default`", () => {
    const { getByTestId } = setupListItem();
    expect(getByTestId("summary-list-actions")).toBeDefined();
  });

  // it("doesn't render actions when state is set to `inactive`", () => {
  //   const { queryByTestId } = setupListItem({
  //     state: "inactive",
  //     image: { src: "/path/to-image", alt: "alt text", name: "Amazon Prime" },
  //   });
  //   expect(queryByTestId("summary-list-actions")).toBe(null);
  // });

  it("renders subheader", () => {
    const { getByText } = setupListItem();
    expect(getByText("Subheading")).toBeDefined();
  });

  it("doesn't render subheader when prop is empty", () => {
    const { queryByText } = setupListItem({
      subheading: "",
      image: { src: "/path/to-image", alt: "alt text", name: "Amazon Prime" },
    });
    expect(queryByText("Subheading")).toBe(null);
  });

  it("renders price", () => {
    const { getByText } = setupListItem();
    expect(getByText("300")).toBeDefined();
  });

  it("doesn't render price when prop is empty", () => {
    const { queryByText } = setupListItem({
      price: undefined,
      image: { src: "/path/to-image", alt: "alt text", name: "Amazon Prime" },
    });
    expect(queryByText("300")).toBe(null);
  });

  it("renders children", () => {
    const { getByText } = setupListItem();
    expect(getByText("Extra content")).toBeDefined();
  });

  it("renders image", () => {
    const { getByTestId } = setupListItem();
    expect(getByTestId("image")).toBeDefined();
  });

  it("renders addon instead of image", () => {
    const { getByTestId } = setupListItem({
      image: { src: "/path/to-image", alt: "alt text", name: "Amazon Prime" },
    });
    expect(getByTestId("addon")).toBeDefined();
  });
});
