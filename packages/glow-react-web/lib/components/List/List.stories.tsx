import type { Meta } from "@storybook/react";
import { OdidoPalette } from "_internals/Color";
import { Button, Price, Toggle } from "../.";
import { List, ListItem } from "./List";
import { action } from "@storybook/addon-actions";
import IMAGES from "foundations/Image/Image.mock";

const meta: Meta<typeof List> = {
  title: "DesignSystem/Components/Lists/List",
  component: List,
  argTypes: {
    children: {
      description:
        "Accepts `ListItem` React.ReactElement or an array of `ListItem`s.",
    },
    background: {
      control: { type: "select" },
      options: ["default", "subtle", "none"],
      description: "Sets the background color of the List.",
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Sets the color palette of the List.",
    },
  },
  args: {
    background: "default",
    palette: "default",
  },
  render: (args) => {
    return (
      <List {...args}>
        <ListItem
          key={1}
          leadingContent={{ icon: "laptop", mediaContentSize: "lg" }}
          text="Lorem ipsum dolor sit amet"
          onClick={action("listItem.onClick")}
          clickable
        />
        <ListItem
          key={2}
          leadingContent={{ icon: "energy", mediaContentSize: "sm" }}
          text="Item 2"
          action={
            <Button size="sm" onClick={action("listItem.onClick")} stretched>
              Button
            </Button>
          }
        />
        <ListItem
          key={3}
          leadingContent={{ icon: "airplane", mediaContentSize: "sm" }}
          text="Item 3"
          description1="Description 1"
          description2="Description 2"
          attention={{ text: "Attention text", variant: "information" }}
          action={
            <Price
              value="€100"
              beforeText="Van"
              showCurrency
              showVAT
              showFrequency
              size="default"
            />
          }
        />
        <ListItem
          key={4}
          leadingContent={{
            mediaContentSize: "lg",
            image: {
              resizeMode: "cover",
              localSrc: IMAGES["mid-hero"],
              alt: "",
            },
          }}
          text="Item 4"
          attention={{ text: "Attention text", variant: "success" }}
          action={
            <Toggle
              id="uniqueid"
              onChange={(e) => action("listItem.onChange")(e)}
              stretched
            />
          }
        />
        <ListItem
          key={5}
          leadingContent={{
            mediaContentSize: "xs",
            image: {
              resizeMode: "cover",
              localSrc: IMAGES["mid-hero"],
              alt: "",
            },
          }}
          text="Item 5"
          attention={{ text: "Attention text", variant: "warning" }}
          detail="Detail"
          notification={1}
          onClick={action("listItem.onClick")}
          clickable
        />
        <ListItem
          key={6}
          leadingContent={{ icon: "comment" }}
          text="Item 6"
          attention={{ text: "Attention text", variant: "error" }}
          detail="Detail"
          onClick={action("listItem.onClick")}
        />
        <ListItem
          key={7}
          leadingContent={{ icon: "status-alert", mediaContentSize: "sm" }}
          text="Item 7"
          notification={1}
          attention={{ text: "Attention text", variant: "error" }}
        />
        <ListItem key={8} leadingContent={{ icon: "lock" }} text="Item 8" />
      </List>
    );
  },
};

export default meta;

type Story = typeof meta;

export const Default: Story = {};
