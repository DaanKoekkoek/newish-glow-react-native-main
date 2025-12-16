import type { Meta } from "@storybook/react";
import { odidoPaletteKeys, switchPaletteKeys } from "_theming/tokenLoader";
import { Paragraph } from "foundations/Paragraph";
import React from "react";
import { View } from "react-native";

import { SegmentedTab } from "./SegmentedTab";
import { SegmentedTabButtons } from "./SegmentedTab.Buttons";

const meta: Meta<typeof SegmentedTabButtons> = {
  title: "DesignSystem/Components/Tabs/SegmentedTab",
  component: SegmentedTabButtons,
  argTypes: {
    active: { control: { type: "number" } },
    state: {
      options: ["default", "inactive"],
      control: { type: "select" },
      description: "Whether the component is active or inactive.",
    },
    variant: {
      options: ["default", "subtle"],
      control: { type: "select" },
      description: "Whether the default or subtle styling is used.",
    },
    options: {
      control: { type: "array" },
      description:
        "Array each tab's information including, label, optional icon and optional child",
    },
    backgroundPalette: {
      control: { type: "select" },
      options: [undefined, ...odidoPaletteKeys],
      description: "Set the colour palette of the segmented tab's background.",
    },
    shadowPalette: {
      control: { type: "select" },
      options: [undefined, ...odidoPaletteKeys],
      description:
        "Set the colour palette of the segmented tab's selector shadow.",
    },
  },
  decorators: [
    (Story, context) => {
      // Get the current brand from globals
      const currentBrand = context.globals.theme || "odido";

      // shadowPalette options based on the current brand.
      if (context.argTypes?.shadowPalette) {
        switch (currentBrand) {
          case "switch":
            context.argTypes.shadowPalette.options = [
              undefined,
              ...switchPaletteKeys,
            ];
            break;
          case "odido":
          default:
            context.argTypes.shadowPalette.options = [
              undefined,
              ...odidoPaletteKeys,
            ];
            break;
        }
      }
      return <Story />;
    },
  ],
};

export default meta;

type Story = typeof meta;

export const WithIcon: Story = {
  args: {
    options: [
      {
        label: "Label",
        icon: "mobile-phone",
      },
      {
        label: "Label 2",
        icon: "mobile-phone",
      },
      {
        label: "Label 3",
        icon: "mobile-phone",
      },
    ],
    variant: "default",
    state: "default",
  },

  render: function Render({ ...args }) {
    const child1 = (
      <View>
        <Paragraph>Tab 1 Content</Paragraph>
      </View>
    );
    const child2 = (
      <View>
        <Paragraph>Tab 2 Content</Paragraph>
      </View>
    );
    const child3 = (
      <View>
        <Paragraph>Tab 3 Content</Paragraph>
      </View>
    );
    const tabChange = (activeTab: number) => {
      console.log("Tab changed to index:", activeTab);
    };

    return (
      <SegmentedTab onTabChange={tabChange}>
        <SegmentedTab.Buttons {...args} />
        <SegmentedTab.Panel child={child1} index={0} />
        <SegmentedTab.Panel child={child2} index={1} />
        <SegmentedTab.Panel child={child3} index={2} />
      </SegmentedTab>
    );
  },
};

export const WithoutIcon: Story = {
  args: {
    options: [{ label: "Label 1" }, { label: "Label 2" }],
    variant: "default",
    state: "default",
  },

  render: function Render({ ...args }) {
    const child1 = (
      <View>
        <Paragraph>Tab 1 Content</Paragraph>
      </View>
    );
    const child2 = (
      <View>
        <Paragraph>Tab 2 Content</Paragraph>
      </View>
    );

    const tabChange = (activeTab: number) => {
      console.log("index", activeTab);
    };

    return (
      <SegmentedTab onTabChange={tabChange}>
        <SegmentedTab.Buttons {...args} />
        <SegmentedTab.Panel child={child1} index={0} />
        <SegmentedTab.Panel child={child2} index={1} />
      </SegmentedTab>
    );
  },
};
