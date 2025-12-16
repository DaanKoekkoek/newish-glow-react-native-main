import type { Meta } from "@storybook/react";
import React from "react";

import { Selector } from "./Selector";
import { Badge } from "../Badge";
import { DefaultList } from "../DefaultList";
import { Price } from "../Price";
import { TextLink } from "../TextLink";

const meta: Meta<typeof Selector> = {
  title: "DesignSystem/Components/Selector/Selector",
  component: Selector,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "extended", "compact"],
    },
    selected: { control: { type: "boolean" } },
    state: { control: { type: "select", options: ["default", "inactive"] } },
    price: {
      control: "select",
      options: [false, <Price value="10,49" />],
    },
    badge: {
      control: "select",
      options: [false, <Badge text="Badge" />],
    },
    secondaryAction: {
      control: "select",
      options: [
        false,
        <TextLink
          children={[<TextLink.Icon name="add" />, "Text link"]}
          href="#"
        />,
      ],
    },
    list: {
      control: false,
      defaultValue: (
        <DefaultList variant="icon">
          <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
          <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
          <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        </DefaultList>
      ),
      table: { disable: true },
    },
    onPress: { action: "onPress" },
    promotion: { control: "text" },
    description: { control: "text" },
    highlight: { control: "text" },
  },
  decorators: [(Story) => <Story />],
  render: function Render({ onPress, ...args }) {
    const [selected, setSelected] = React.useState(false);

    const handlePress = () => {
      setSelected(!selected);
    };

    return (
      <Selector {...args} onPress={() => handlePress()} selected={selected} />
    );
  },
};

export default meta;

type Story = typeof meta;

export const Default: Story = {
  parameters: {
    controls: {
      exclude: ["titleStrikethrough"],
    },
  },
  args: {
    variant: "default",
    price: <Price value="10,49" />,
    title: "Title",
    selected: false,
    type: "radio",
    state: "default",
    badge: <Badge text="Badge" />,
    promotion: "Promotion",
    description: "Description",
    secondaryAction: (
      <TextLink
        children={[<TextLink.Icon name="add" />, "Text link"]}
        href="#"
      />
    ),
    highlight: "Highlight",
  },
};

export const Extended: Story = {
  args: {
    variant: "extended",
    price: <Price value="10,49" />,
    title: "Title",
    selected: false,
    type: "radio",
    state: "default",
    badge: <Badge text="Badge" />,
    promotion: "Promotion",
    secondaryAction: (
      <TextLink
        children={[<TextLink.Icon name="add" />, "Text link"]}
        href="#"
      />
    ),
    titleStrikethrough: "old",
    list: (
      <DefaultList variant="icon">
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
        <DefaultList.Item icon="checkmark">List item</DefaultList.Item>
      </DefaultList>
    ),
    highlight: "Highlight",
  },
};

export const Compact: Story = {
  parameters: {
    controls: {
      exclude: [
        "price",
        "badge",
        "promotion",
        "description",
        "secondaryAction",
        "titleStrikethrough",
        "list",
      ],
    },
  },
  args: {
    variant: "compact",
    title: "Title",
    state: "default",
    highlight: "",
  },
};
