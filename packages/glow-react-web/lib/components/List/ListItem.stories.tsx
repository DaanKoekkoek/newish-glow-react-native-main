import type { Meta } from "@storybook/react";
import { List, ListItem } from "./List";
import {
  ComplexOption,
  createComplexControl,
} from "@storybook/utils/complexOptions";
import { ListItemProps } from "./List.types";
import IMAGES from "foundations/Image/Image.mock";

const leadingContentOptions: ComplexOption<ListItemProps["leadingContent"]>[] =
  [
    {
      label: "Media - Icon - XS",
      value: { icon: "energy", mediaContentSize: "xs" },
    },
    {
      label: "Media - Icon - SM",
      value: { icon: "energy", mediaContentSize: "sm" },
    },
    {
      label: "Media - Icon - Default",
      value: { icon: "energy", mediaContentSize: "default" },
    },
    {
      label: "Media - Icon - LG",
      value: { icon: "energy", mediaContentSize: "lg" },
    },
    {
      label: "Media - Image - XS",
      value: {
        image: {
          resizeMode: "cover",
          localSrc: IMAGES["mid-hero"],
          alt: "",
        },
        mediaContentSize: "xs",
      },
    },
    {
      label: "Media - Image - SM",
      value: {
        image: {
          resizeMode: "cover",
          localSrc: IMAGES["mid-hero"],
          alt: "",
        },
        mediaContentSize: "sm",
      },
    },
    {
      label: "Media - Image - Default",
      value: {
        image: {
          resizeMode: "cover",
          localSrc: IMAGES["mid-hero"],
          alt: "",
        },
        mediaContentSize: "default",
      },
    },
    {
      label: "Media - Image - LG",
      value: {
        image: {
          resizeMode: "cover",
          localSrc: IMAGES["mid-hero"],
          alt: "",
        },
        mediaContentSize: "lg",
      },
    },
  ];

const meta: Meta<typeof ListItem> = {
  title: "DesignSystem/Components/Lists/List/ListItem",
  component: ListItem,
  argTypes: {
    onClick: {
      description: "Function to execute when the item is clicked.",
    },
    leadingContent: {
      ...createComplexControl(leadingContentOptions),
      description: "Renders a visual. You can pass in `ImageProps`.",
    },
  },
  args: {
    text: "Lorem ipsum dolor sit amet",
    description1: "Description 1, lorem ipsum dolor sit amet",
    description2: "Description 2, Lorem ipsum dolor sit amet",
    attention: {
      text: "Attenttion text",
      variant: "information",
    },
    clickable: true,
    iconRight: "chevron-right",
    notification: 999,
    detail: "Detail",
    onClick: () => {},
  },
  render: (args) => {
    return (
      <List background="default">
        <ListItem {...args} />
      </List>
    );
  },
};

export default meta;

type Story = typeof meta;

export const Default: Story = {};
