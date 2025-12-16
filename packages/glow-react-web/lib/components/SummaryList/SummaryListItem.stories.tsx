import type { Meta, StoryObj } from "@storybook/react";

import { SummaryListAction, SummaryListItem } from "./SummaryList";

const meta: Meta<typeof SummaryListItem> = {
  title: "DesignSystem/Components/Lists/SummaryList/Item",
  component: SummaryListItem,
  args: {
    heading: "heading",
    subheading: "subheading",
    supportText: "supportText",
    image: {
      name: "Apple One",
    },
    status: { type: "success", statusText: "statusText" },
    price: {
      value: "0,00",
      showFrequency: true,
      showAsterisk: true,
      showVAT: true,
      beforeText: "Van",
      fromValue: "10,00",
    },
    promotionText: "promotionText",
    list: {
      variant: "icon",
      items: [
        { text: "List item 1" },
        { text: "List item 2" },
        { text: "List item 3" },
      ],
    },
    actions: [
      <SummaryListAction icon="edit">Wijzig</SummaryListAction>,
      <SummaryListAction icon="plus" />,
      <SummaryListAction icon="trashcan" />,
    ],
    children: "Additional content",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
