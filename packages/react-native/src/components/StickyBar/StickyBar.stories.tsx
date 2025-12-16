import type { Meta } from "@storybook/react";
import { Placeholder } from "_internals/Placeholder";
import {
  type MainProps,
  type SectionProps,
  Grid,
  Main,
  Paragraph,
  Section,
} from "foundations/index";
import React from "react";

import { StickyBar } from "./StickyBar";
import type { StickyBarProps } from "./StickyBar.types";

import { stickybarDummyData } from ".examples/StickyBar/mockedData";

const mainConfig = (isSticky: boolean = false): Omit<MainProps, "children"> => {
  return {
    headerComponent: (
      <Grid
        containerStyle={{ backgroundColor: "lightgray", paddingVertical: 16 }}
      >
        <Grid.Column>
          <Paragraph>Header</Paragraph>
        </Grid.Column>
      </Grid>
    ),
    hasStickyHeader: isSticky,
    hasStickybar: true,
  };
};

const sectionConfig = (): Omit<SectionProps, "children"> => {
  return {
    variant: "subtle",
  };
};

const meta: Meta<StickyBarProps> = {
  title: "DesignSystem/Components/Overlay/StickyBar",
  component: StickyBar,
  argTypes: {
    position: {
      options: ["top", "bottom"],
      control: {
        type: "select",
      },
    },
    width: {
      options: ["default", "narrow"],
      control: {
        type: "select",
      },
    },
    layout: {
      description:
        "Changes the layout of the `StickyBar` content. Can also be applied per breakpoint. `LayoutType | LayoutTypePerBreakpoin`.",
      options: ["default", "stacked"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    position: "bottom",
    width: "default",
    layout: "default",
    button: {
      text: "Button",
      onPress: () => {
        alert("Button pressed");
      },
    },
    modal: {
      title: "Cart title",
      children: stickybarDummyData().modal,
    },
    children: <Placeholder />,
  },
};
export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: ({ ...args }) => (
    <Main {...mainConfig()}>
      <Section {...sectionConfig()}>
        <Grid>
          <Grid.Column>
            <Paragraph>Grid paragraph</Paragraph>
            <StickyBar {...args} />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  ),
};

export const WithoutModal: Story = {
  args: {
    modal: undefined,
  },
  render: ({ ...args }) => (
    <Main {...mainConfig()}>
      <Section {...sectionConfig()}>
        <Grid>
          <Grid.Column>
            <Paragraph>Grid paragraph</Paragraph>
            <StickyBar {...args} />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  ),
};

export const WithStickyHeader: Story = {
  decorators: [
    (Story, args) => (
      <Main {...mainConfig(true)}>
        <Section {...sectionConfig()}>
          <Grid>
            <Grid.Column>
              <Paragraph>Grid paragraph</Paragraph>
              <Story {...args} />
            </Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};
