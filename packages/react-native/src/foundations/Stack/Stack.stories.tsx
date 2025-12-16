import type { Meta, StoryObj } from "@storybook/react";
import { TextLink } from "components/TextLink";
import { Box, Button, Divider } from "components/index";
import React from "react";
import { View } from "react-native";

import { Display, Heading, Paragraph } from "../index";
import { Stack } from "./Stack";

const meta: Meta = {
  title: "DesignSystem/Foundations/Layout/Stack",
  component: Stack,
  argTypes: {
    children: {
      description: "Accepts `React.ReactNode`.",
    },
    gap: {
      options: ["default", "lg", "sm", { mobileSmall: 10, tablet: 50 }],
      control: {
        type: "select",
      },
      description:
        "Picking `sm`, `default` or `lg` will have preconfigured values for each breakpoint. Numeric values can be used per breakpoint. Available options: \n\n `0 | 50 | 100 | 150 | 20` \n\n ` | 300 | 400 | 500 | 600 | 800 | 1000` \n\n `| sm | default | lg`.",
    },
    direction: {
      options: [
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        { mobileSmall: "column", tablet: "row" },
      ],
      control: {
        type: "select",
      },
    },
    alignItems: {
      options: [
        "center",
        "flex-start",
        "flex-end",
        "stretch",
        "baseline",
        { mobileSmall: "center", tablet: "flex-start" },
      ],
      control: {
        type: "select",
      },
    },
    justifyContent: {
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        { mobileSmall: "center", tablet: "flex-start" },
      ],
      control: {
        type: "select",
      },
    },
    shrink: {
      options: [true, false, { mobileSmall: false, tablet: true }],
      control: {
        type: "select",
      },
    },
    grow: {
      options: [true, false, { mobileSmall: false, tablet: true }],
      control: {
        type: "select",
      },
    },
    wrap: {
      options: [
        "wrap",
        "nowrap",
        "wrap-reverse",
        { mobileSmall: "wrap", tablet: "nowrap", desktop: "wrap-reverse" },
      ],
      control: {
        type: "select",
      },
    },
  },
  args: {
    alignItems: "center",
    children: [
      <Display alignment="center" key="display">
        Display (center)
      </Display>,
      <Heading size="xl" as="h4" alignment="center" key="heading">
        Heading (center)
      </Heading>,
      <Paragraph alignment="center" key="paragraph">
        Paragraph text. A palindrome is a word, number, phrase, or other
        sequence of symbols
      </Paragraph>,
      <Box size="sm" prominence="color" grow={false} key="box-1">
        <Paragraph size="sm">
          1. Box - grow: false. A palindrome is a word, number, phrase, or other
          sequence of symbols
        </Paragraph>
      </Box>,
      <Box size="sm" prominence="emphasised" grow={false} key="box-2">
        <Paragraph size="sm">
          2. Box - grow: false. A palindrome is a word, number, phrase, or other
          sequence of symbols
        </Paragraph>
      </Box>,
      <Box size="sm" prominence="color" grow={false} key="box-3">
        <Paragraph size="sm">3. Box - grow: false. Short form text</Paragraph>
      </Box>,
      <Button onPress={() => {}} fill key="button">
        Button (fill)
      </Button>,
      <TextLink href="#" target="blank">
        Link
      </TextLink>,
      <TextLink onPress={() => {}}>Button link</TextLink>,
    ],
  },
  decorators: [
    (Story) => (
      <>
        <View>
          <Divider />
        </View>
        <View style={{ minHeight: 800 }}>
          <Story />
        </View>
        <View>
          <Divider />
        </View>
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const DirectionVertical: Story = {
  args: {
    direction: "column",
  },
};

export const DirectionHorizontal: Story = {
  args: {
    direction: "row",
  },
};

export const AlignCenter: Story = {
  args: {
    alignItems: "center",
  },
};

export const AlignEnd: Story = {
  args: {
    alignItems: "flex-end",
  },
};

export const JustifyCenter: Story = {
  args: {
    justifyContent: "center",
    grow: true,
  },
};

export const JustifyEnd: Story = {
  args: {
    justifyContent: "flex-end",
    grow: true,
  },
};
