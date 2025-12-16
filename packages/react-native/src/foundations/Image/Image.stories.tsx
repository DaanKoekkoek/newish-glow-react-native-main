import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Image } from "./Image";
import IMAGES from "./Image.mock";
import { Paragraph } from "../Paragraph";

const meta: Meta<typeof Image> = {
  title: "DesignSystem/Foundations/Assets/Image",
  component: Image,
  args: {
    src: "",
    localSrc: IMAGES["tophero-app-only-deal"],
    alt: "Alt text",
    children: <Paragraph>Additional child content</Paragraph>,
  },
  argTypes: {
    resizeMode: {
      control: {
        type: "select",
      },
    },
    type: {
      description:
        "If set to `background`, children will be shown on top of the image. If it's set to `image`, children will be shown to the bottom of the image.",
      control: {
        type: "select",
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
