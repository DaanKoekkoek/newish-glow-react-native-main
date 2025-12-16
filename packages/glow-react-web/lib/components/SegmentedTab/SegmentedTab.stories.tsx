import type { Meta } from "@storybook/react";
import { SegmentedTabButtons } from "./SegmentedTabButtons";
import { SegmentedTabPanels } from "./SegmentedTabPanels";
import { TabOptionArray } from "./SegmentedTab.types";

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
        "Array each tab's information including unique id, label, and optional icon for each Tab button, and the panel with the content to be displayed per Tab",
    },
    backgroundPalette: {
      control: { type: "select" },
      options: [
        undefined,
        "blue",
        "default",
        "green",
        "orange",
        "pink",
        "purple",
        "red",
        "yellow",
      ],
      description: "Set the colour palette of the segmented tab's background.",
    },
    shadowPalette: {
      control: { type: "select" },
      options: [
        undefined,
        "blue",
        "default",
        "green",
        "orange",
        "pink",
        "purple",
        "red",
        "yellow",
      ],
      description:
        "Set the colour palette of the segmented tab's selector shadow.",
    },
    uuid: {
      control: { type: "text" },
      description: "Unique identifier for the segmented tab.",
    },
  },
};

export default meta;
type Story = typeof meta;

export const WithIcon: Story = {
  args: {
    options: [
      {
        id: 0,
        tab: {
          label: "Home",
          icon: "home" as const,
        },
      },
      {
        id: 1,
        tab: {
          label: "Profile",
          icon: "profile" as const,
        },
      },
      {
        id: 2,
        tab: {
          label: "Settings",
          icon: "settings" as const,
        },
      },
    ],
    variant: "default",
    state: "default",
    backgroundPalette: "default",
    shadowPalette: "default",
    uuid: "WITH_ICON",
  },
  render: function Render({ ...args }) {
    const tabOptions: TabOptionArray = [
      { id: 0, panel: "Welcome to the Home tab!" },
      { id: 1, panel: "Welcome to the Profile tab!" },
      { id: 2, panel: "Welcome to the Settings tab!" },
    ];

    return (
      <>
        <SegmentedTabButtons {...args} />
        <SegmentedTabPanels uuid="WITH_ICON" options={tabOptions} />
      </>
    );
  },
};

export const WithoutIcon: Story = {
  args: {
    options: [
      {
        id: 0,
        tab: {
          label: "Home",
        },
      },
      {
        id: 1,
        tab: {
          label: "Profile",
        },
      },
      {
        id: 2,
        tab: {
          label: "Settings",
        },
      },
    ],
    variant: "default",
    state: "default",
    backgroundPalette: "default",
    shadowPalette: "default",
  },

  render: function Render({ ...args }) {
    const tabOptions: TabOptionArray = [
      { id: 0, panel: "Welcome to the Home tab!" },
      { id: 1, panel: "Welcome to the Profile tab!" },
      { id: 2, panel: "Welcome to the Settings tab!" },
    ];

    return (
      <>
        <SegmentedTabButtons {...args} />
        <SegmentedTabPanels uuid="WITHOUT_ICON" options={tabOptions} />
      </>
    );
  },
};
