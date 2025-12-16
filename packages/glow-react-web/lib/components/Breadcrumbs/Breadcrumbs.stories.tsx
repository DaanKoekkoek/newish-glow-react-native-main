import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Breadcrumbs } from "./Breadcrumbs";
import { createDuplicatedComplexControl } from "@storybook/utils/complexOptions";

const { options: hrefItemsOptions, control: hrefItemsControl } =
  createDuplicatedComplexControl(
    5,
    (optionIndex) => optionIndex + 1,
    () => {
      return {
        name: "Breadcrumb",
        href: "#",
      };
    },
    "select",
  );

const { options: onClickItemsOptions, control: onClickItemsControl } =
  createDuplicatedComplexControl(
    5,
    (optionIndex) => optionIndex + 1,
    () => {
      return {
        name: "Breadcrumb (onClick)",
        onClick: action("items.onClick"),
      };
    },
    "select",
  );

const meta: Meta<typeof Breadcrumbs> = {
  title: "DesignSystem/Components/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    items: {
      ...hrefItemsControl,
      description:
        "Accepts an array of objects with a `text` for the list item content and an optional `icon` for the list item prefix. If variant is set to `icon`, and there is no icon provided in items props, the default icon will be `checkmark`.",
    },
  },
  args: {
    items: hrefItemsOptions[0].value,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithOnClick: Story = {
  argTypes: {
    items: {
      ...onClickItemsControl,
    },
  },
  args: {
    items: onClickItemsOptions[0].value,
  },
};
