import type { Meta, StoryObj } from "@storybook/react";
import { Placeholder } from "_internals/Placeholder";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { gradientVariants } from "foundations/GlowGradient/GlowGradient.constants";
import { ratios } from "foundations/Image/Image.constants";
import IMAGES from "foundations/Image/Image.mock";
import { Stack, Paragraph, Image } from "foundations/index";
import React from "react";

import { Modal } from "./index";
import { DefaultList, Button } from "../index";

const meta: Meta<typeof Modal.CustomHeader> = {
  title: "DesignSystem/Components/Overlay/Modal/Modal/CustomHeader",
  component: Modal.CustomHeader,
  args: {
    children: <Placeholder />,
    variant: "default",
    palette: "default",
    verticalPadding: true,
    ratio: "1/1",
    fixedWidth: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "emphasised"],
    },
    fixedWidth: {
      description:
        "Sets the child's width to a fixed width, or scale it to the modal heading's container width. If fixedWidth is set to `true`, property `ratio` will be applied to the children.",
    },
    ratio: {
      control: "select",
      options: [undefined, ...ratios],
    },
    palette: {
      control: "select",
      options: [...odidoPaletteKeys],
      description:
        "Set the colour palette of modal header background. Requires `headerComponent`.",
    },
    glow: {
      control: "select",
      options: gradientVariants,
      description:
        "Glow background color of the modal header. Requires `image` and `headerComponent`.",
    },
  },
  render: (args) => {
    return (
      <Modal
        title="Modal title"
        headerRatio="3/1"
        trigger={<Button>Open custom modal</Button>}
        customHeader={<Modal.CustomHeader {...args} />}
      >
        <Stack>
          <Paragraph>This modal has the following props:</Paragraph>
          <DefaultList>
            <DefaultList.Item>title: Modal title</DefaultList.Item>
            <DefaultList.Item>headerRatio: 3/1</DefaultList.Item>
            <DefaultList.Item>trigger: Button</DefaultList.Item>
            <DefaultList.Item>
              customHeader: Modal.CustomHeader (width: 100%)
            </DefaultList.Item>
          </DefaultList>
        </Stack>
      </Modal>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithRatio3To1: Story = {};

export const WithRatio2To1: Story = {
  render: (args) => {
    return (
      <Modal
        title="Modal title"
        headerRatio="2/1"
        trigger={<Button>Open custom modal</Button>}
        customHeader={<Modal.CustomHeader {...args} />}
      >
        <Stack>
          <Paragraph>This modal has the following props:</Paragraph>
          <DefaultList>
            <DefaultList.Item>title: Modal title</DefaultList.Item>
            <DefaultList.Item>headerRatio: 2/1</DefaultList.Item>
            <DefaultList.Item>trigger: Button</DefaultList.Item>
            <DefaultList.Item>
              customHeader: Modal.CustomHeader (width: 100%)
            </DefaultList.Item>
          </DefaultList>
        </Stack>
      </Modal>
    );
  },
};

export const WithRatio16To9: Story = {
  render: (args) => {
    return (
      <Modal
        title="Modal title"
        headerRatio="16/9"
        trigger={<Button>Open custom modal</Button>}
        customHeader={<Modal.CustomHeader {...args} />}
      >
        <Stack>
          <Paragraph>This modal has the following props:</Paragraph>
          <DefaultList>
            <DefaultList.Item>title: Modal title</DefaultList.Item>
            <DefaultList.Item>headerRatio: 16/9</DefaultList.Item>
            <DefaultList.Item>trigger: Button</DefaultList.Item>
            <DefaultList.Item>
              customHeader: Modal.CustomHeader (width: 100%)
            </DefaultList.Item>
          </DefaultList>
        </Stack>
      </Modal>
    );
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <Image
        resizeMode="contain"
        src="https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp"
        localSrc={IMAGES["tophero-app-only-deal"]}
        alt="alt text"
      />
    ),
  },
};
