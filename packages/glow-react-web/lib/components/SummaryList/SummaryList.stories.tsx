import type { Meta, StoryObj } from "@storybook/react";

import { SummaryList, SummaryListItem, SummaryListAction } from "./SummaryList";
import IMAGES from "foundations/Image/Image.mock.ts";

const meta: Meta<typeof SummaryList> = {
  title: "DesignSystem/Components/Lists/SummaryList",
  component: SummaryList,
  args: {
    children: [
      <SummaryListItem
        heading="Heading 1"
        image={{ name: "Amazon Prime" }}
        subheading="subheading"
        supportText="SupportText"
        promotionText="Promotion"
        status={{ type: "success", statusText: "Status" }}
        list={{
          variant: "icon",
          items: [
            { text: "List item 1" },
            { text: "List item 2" },
            { text: "List item 3" },
          ],
        }}
        price={{
          value: "0,00",
        }}
        actions={[
          <SummaryListAction icon="edit" onClick={() => {}} key="action-1">
            Wijzig
          </SummaryListAction>,
          <SummaryListAction icon="plus" onClick={() => {}} key="action-2" />,
          <SummaryListAction
            icon="trashcan"
            onClick={() => {}}
            key="action-3"
          />,
        ]}
        key="item 1"
      >
        Additional content
      </SummaryListItem>,
      <SummaryListItem
        heading="Heading 2"
        image={{ localSrc: IMAGES["phone"], alt: "alt" }}
        subheading="subheading"
        promotionText="Promotion"
        status={{ type: "success", statusText: "Status" }}
        supportText="SupportText"
        list={{
          variant: "icon",
          items: [
            { text: "List item 1" },
            { text: "List item 2" },
            { text: "List item 3" },
          ],
        }}
        price={{
          value: "0,00",
        }}
        actions={[
          <SummaryListAction icon="edit" onClick={() => {}} key="action-1">
            Wijzig
          </SummaryListAction>,
          <SummaryListAction icon="plus" onClick={() => {}} key="action-2" />,
          <SummaryListAction
            icon="trashcan"
            onClick={() => {}}
            key="action-3"
          />,
        ]}
        key="item 2"
      >
        Additional content
      </SummaryListItem>,
    ],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
