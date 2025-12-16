import type { Meta } from "@storybook/react";
import React from "react";

import { SummaryList } from "./SummaryList";
import type { SummaryListProps } from "./SummaryList.types";

const meta: Meta<typeof SummaryList> = {
  title: "DesignSystem/Components/Lists/SummaryList",
  component: SummaryList,

  argTypes: {
    children: {
      description:
        "Accepts `React.ReactElement` or \n\n `React.ReactElement[]`.",
    },
    state: {
      control: "select",
      options: ["default", "inactive"],
      description: "Set the state for all `<SummaryList.Item />`.",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: (args: SummaryListProps) => {
    return (
      <SummaryList>
        <SummaryList.Item
          key="summary-list-1"
          heading="Heading"
          subheading="Subheading"
          image={{
            name: "Amazon Prime",
          }}
          promotionText="Promotion text"
          status={{
            type: "success",
            statusText: "Status",
          }}
          actions={[
            <SummaryList.Button
              key="button"
              state={args.state === "inactive" ? "disabled" : undefined}
              onPress={() => {}}
            >
              <SummaryList.Button.Icon name="edit" />
              Wijzig
            </SummaryList.Button>,
            <SummaryList.ActionButton
              state={args.state === "inactive" ? "disabled" : undefined}
              key="action-button"
              icon="trashcan"
              onPress={() => {}}
            />,
          ]}
          list={
            <SummaryList.List>
              <SummaryList.List.Item>List item 1</SummaryList.List.Item>
              <SummaryList.List.Item>List item 2</SummaryList.List.Item>
            </SummaryList.List>
          }
          price={<SummaryList.Price value="300" />}
        >
          Extra content
        </SummaryList.Item>
        <SummaryList.Item
          key="summary-list-2"
          heading="Heading"
          subheading="Subheading"
          promotionText="Promotion text"
          image={{
            src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
            alt: "alt text",
          }}
          status={{
            type: "success",
            statusText: "Status",
          }}
          actions={[
            <SummaryList.NumberInput
              key="number-input"
              state={args.state === "inactive" ? "disabled" : "default"}
            />,
            <SummaryList.ActionButton
              onPress={() => {}}
              icon="edit"
              key="action-button-1"
              state={args.state === "inactive" ? "disabled" : undefined}
            />,
            <SummaryList.ActionButton
              onPress={() => {}}
              icon="trashcan"
              key="action-button-2"
              state={args.state === "inactive" ? "disabled" : undefined}
            />,
          ]}
          list={
            <SummaryList.List variant="icon">
              <SummaryList.List.Item icon="checkmark">
                List item 1
              </SummaryList.List.Item>
              <SummaryList.List.Item icon="checkmark">
                List item 2
              </SummaryList.List.Item>
            </SummaryList.List>
          }
          price={
            <SummaryList.Price
              value="300"
              showAsterisk
              beforeText="van"
              fromValue="10"
              showVAT
            />
          }
        >
          Extra content
        </SummaryList.Item>
      </SummaryList>
    );
  },
};
