import type { Meta, StoryObj } from "@storybook/react";
import { LocalNavigation } from "./LocalNavigation";

const meta: Meta<typeof LocalNavigation> = {
  title: "DesignSystem/Components/Navigation/LocalNavigation",
  component: LocalNavigation,
  argTypes: {},
  args: {
    prominence: "default",
    title: "Title",
    titleSize: "lg",
    variant: "default",
  },
};

export default meta;

export const Default: StoryObj<typeof LocalNavigation> = {
  args: {
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onClick: () => {},
    },
    variant: "default",
    rightAction: {
      title: "Action right",
      icon: "add",
      onClick: () => {},
    },
  },
};

export const Compact: StoryObj<typeof LocalNavigation> = {
  args: {
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onClick: () => {},
    },
    variant: "compact",
    rightAction: {
      title: "Action right",
      icon: "add",
      onClick: () => {},
    },
  },
  parameters: {
    controls: {
      exclude: ["paragraph", "variant"],
    },
  },
};

export const Emphasised: StoryObj<typeof LocalNavigation> = {
  args: {
    prominence: "emphasised",
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onClick: () => {},
    },
    variant: "compact",
    rightAction: {
      title: "Action right",
      icon: "add",
      onClick: () => {},
    },
  },
  parameters: {
    controls: {
      exclude: ["paragraph", "prominence"],
    },
  },
};

export const WithLeftAction: StoryObj<typeof LocalNavigation> = {
  args: {
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onClick: () => {},
    },
  },
};

export const OnlyLeftActionCompact: StoryObj<typeof LocalNavigation> = {
  args: {
    title: undefined,
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onClick: () => {},
    },
  },
};

export const WithRightAction: StoryObj<typeof LocalNavigation> = {
  args: {
    rightAction: {
      title: "Action right",
      icon: "add",
      onClick: () => {},
    },
  },
};

export const WithRightActionCompact: StoryObj<typeof LocalNavigation> = {
  args: {
    variant: "compact",
    rightAction: {
      title: "Action right",
      icon: "add",
      onClick: () => {},
    },
  },
};
