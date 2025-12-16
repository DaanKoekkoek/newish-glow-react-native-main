import type { Meta, StoryObj } from "@storybook/react";
import { NavIcon, type NavIconProps } from "./NavIcon";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

// variant?: BadgeStatusVariant;
//   count?: number;
//   size?: BadgeStatusSize;
//   testID?: string;
//   type?: BadgeStatusType;
//   className?: string;
//   icon?: IconNames;

const badgeStatusOptions: ComplexOption<NavIconProps["badgeStatus"]>[] = [
  {
    label: "default",
    value: {
      variant: "default",
    },
  },
  {
    label: "success",
    value: {
      variant: "success",
    },
  },
  {
    label: "error",
    value: {
      variant: "error",
    },
  },
  {
    label: "different icon",
    value: {
      icon: "plus",
    },
  },
];

const meta: Meta<typeof NavIcon> = {
  title: "DesignSystem/_internals/Navigation/NavIcon",
  component: NavIcon,
  argTypes: {
    type: {
      option: ["user", "cart"],
      description:
        "Setting the `type` to `user` will automatically apply the type of `icon` to the `<BadgeStatus />`",
    },
    badgeStatus: {
      ...createComplexControl(badgeStatusOptions),
      description:
        "Accepts `BadgeStatusProps`. The properties `size`, `type` and `className` are set internally.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
