import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { SummaryList } from "./SummaryList";

const meta: Meta<typeof SummaryList.Item> = {
  title: "DesignSystem/Components/Lists/SummaryList/Item",
  component: SummaryList.Item,
  argTypes: {
    heading: {
      description: "Renders heading. Is `required`.",
    },
    children: {
      type: "string",
      description: "Accepts either a `string` | `React.ReactElement`.",
    },
    state: {
      control: "select",
      options: ["default", "inactive"],
      description: "Set the state for the `<SummaryList.Item />`.",
    },
    status: {
      description: "Accepts properties of `<Status />`.",
    },
    list: {
      description:
        "Accepts a `<SummaryList.List />` component, which accepts `<SummaryList.List.Item />` as children. Uses `DefaultList` properties. Is `required`.",
    },
    image: {
      description:
        "Accepts properties coming from `<Addon />` or `src` and `alt`. Renders an `<Addon />` when `name` is passed. Renders an image when both `src` and `alt` are set.",
    },
    price: {
      description:
        "Accepts a `<SummaryList.Price />` component, accepts every property, with the exception of `size` and `state`.",
    },
    actions: {
      description:
        "Accepts a `<SummaryList.Button />`, `<SummaryList.NumberInput />` and/or `<SummaryList.ActionButton />` component. Can be combined.",
    },
  },
  args: {
    heading: "Heading",
    subheading: "Subheading",
    promotionText: "Promotion",
    image: {
      src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
      alt: "alt text",
    },
    status: { statusText: "Status", type: "success" },
    price: <SummaryList.Price value="300" />,
    actions: [
      <SummaryList.Button key="button" onPress={() => {}}>
        <SummaryList.Button.Icon name="edit" />
        Wijzig
      </SummaryList.Button>,
      <SummaryList.ActionButton
        onPress={() => {}}
        icon="trashcan"
        key="action-button-2"
      />,
    ],
    list: (
      <SummaryList.List variant="iconColored">
        <SummaryList.List.Item icon="checkmark">
          List item 1 (colored variant)
        </SummaryList.List.Item>
        <SummaryList.List.Item icon="checkmark">
          List item 2 (colored variant)
        </SummaryList.List.Item>
      </SummaryList.List>
    ),
    children: "Extra content",
  },
  decorators: [
    (Story) => (
      <SummaryList>
        <Story />
      </SummaryList>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
