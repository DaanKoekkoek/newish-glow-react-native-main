import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys, switchPaletteKeys } from "_theming/tokenLoader";
import React from "react";
import { View } from "react-native";

import { LocalNavigation } from "./LocalNavigation";
import type {
  CompactLocalNavigationProps,
  DefaultLocalNavigationProps,
  LocalNavigationProps,
} from "./LocalNavigation.types";

const meta: Meta<LocalNavigationProps> = {
  title: "DesignSystem/Components/Navigation/LocalNavigation",
  component: LocalNavigation,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys, ...switchPaletteKeys],
      description:
        "Set the colour palette of the icon. The default value will be `default`.",
    },
  },
  args: {
    title: "Title",
    titleSize: "lg",
    paragraph: "Paragraph",
    variant: "default",
  },
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: "#383838", padding: 40 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Default: StoryObj<LocalNavigationProps> = {
  args: {
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onPress: () => {},
    },
    variant: "default",
    rightAction: {
      title: "Action right",
      icon: "add",
      onPress: () => {},
    },
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
  },
};

export const Compact: StoryObj<CompactLocalNavigationProps> = {
  args: {
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onPress: () => {},
    },
    variant: "compact",
    rightAction: {
      title: "Action right",
      icon: "add",
      onPress: () => {},
    },
  },
  parameters: {
    controls: {
      exclude: ["paragraph", "variant"],
    },
  },
};

export const Emphasised: StoryObj<CompactLocalNavigationProps> = {
  args: {
    prominence: "emphasised",
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onPress: () => {},
    },
    variant: "compact",
    rightAction: {
      title: "Action right",
      icon: "add",
      onPress: () => {},
    },
  },
  parameters: {
    controls: {
      exclude: ["paragraph", "prominence"],
    },
  },
};

export const WithLeftAction: StoryObj<DefaultLocalNavigationProps> = {
  args: {
    leftAction: {
      title: "Terug",
      icon: "chevron-left",
      onPress: () => {},
    },
  },
};

export const WithRightAction: StoryObj<DefaultLocalNavigationProps> = {
  args: {
    rightAction: {
      title: "Action right",
      icon: "add",
      onPress: () => {},
    },
  },
};

export const WithRightActionCompact: StoryObj<CompactLocalNavigationProps> = {
  args: {
    variant: "compact",
    rightAction: {
      title: "Action right",
      icon: "add",
      onPress: () => {},
    },
  },
};
