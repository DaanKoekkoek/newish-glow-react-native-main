import type { Meta } from "@storybook/react";
import { MySection, MySectionGrid } from "./MySection";
import { Box } from "components/Box";
import { Main, Paragraph } from "foundations/index";
import IMAGES from "foundations/Image/Image.mock";
import { MockBox } from "foundations/ShopSection/ShopSection.stories";

const meta: Meta<typeof MySection> = {
  title: "DesignSystem/Foundations/Layout/Section/MySection",
  component: MySection,
  args: {
    palette: "default",
    title: {
      text: "Title XL",
      size: "xl",
    },
    paddingTop: true,
    variant: "default",
    children: [
      <MySectionGrid key="grid-1">
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Column 1</Paragraph>
        </Box>
        <Box prominence="color" size="sm">
          <Paragraph alignment="center">Column 2</Paragraph>
        </Box>
        <Box prominence="outline" size="sm">
          <Paragraph alignment="center">Column 3</Paragraph>
        </Box>
      </MySectionGrid>,
    ],
  },
  argTypes: {
    title: {
      description:
        "Accepts an object containing `text: string, size: 'md' | 'lg' | 'xl'`.",
    },
    paddingTop: {
      control: {
        type: "boolean",
      },
    },
    palette: {
      control: {
        type: "select",
        options: [
          "default",
          "blue",
          "green",
          "orange",
          "pink",
          "purple",
          "red",
          "yellow",
        ],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["default", "subtle", "emphasised", "image"],
      },
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const Subtle: Story = {
  args: {
    variant: "subtle",
  },
};

export const Emphasised: Story = {
  args: {
    variant: "emphasised",
  },
};
export const Image: Story = {
  args: {
    variant: "image",
    palette: "orange",
    image: {
      localSrc: IMAGES["tophero-app-only-deal"],
      alt: "Image",
    },
  },
};

export const Multiple: Story = {
  render: () => (
    <Main>
      <MySection title={{ text: "Title XL", size: "xl" }}>
        <MySectionGrid>{MockBox(3)}</MySectionGrid>
      </MySection>
      <MySection title={{ text: "Title LG", size: "lg" }}>
        <MySectionGrid>{MockBox(3)}</MySectionGrid>
      </MySection>
      <MySection title={{ text: "Title MD", size: "md" }}>
        <MySectionGrid>{MockBox(3)}</MySectionGrid>
      </MySection>
    </Main>
  ),
};
