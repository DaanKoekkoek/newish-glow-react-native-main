import { Meta, StoryObj } from "@storybook/react";
import { ShopSection } from "./ShopSection";
import { glowGradientVariants } from "foundations/GlowGradient/GlowGradient.constants";
import { Box } from "components/Box";
import { Main, Paragraph } from "foundations/index";

export const MockBox = (amount = 1, variant = "Main") => {
  let i = 0;
  const boxes = [];

  while (i < amount) {
    boxes.push(
      <Box key={i} prominence={i % 2 === 1 ? "outline" : "color"} size="sm">
        <Paragraph>{variant} content</Paragraph>
      </Box>,
    );
    i++;
  }

  return boxes;
};

const meta: Meta<typeof ShopSection> = {
  title: "DesignSystem/Foundations/Layout/Section/ShopSection",
  component: ShopSection,
  excludeStories: ["MockBox"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "emphasised", "image"],
      description: "Background variant",
    },
    above: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    testID: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    palette: {
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
      control: "select",
      description: "Set the colour palette of the `<ShopSection />`.",
    },
    glow: {
      control: "select",
      options: glowGradientVariants,
      description: "Glow background color.",
    },
    image: {
      description:
        "Apply a background image to the `<ShopSection />`. Sets the background with sizing property `cover`.",
      table: {
        disable: true,
      },
    },
    paddingBottom: {
      description: "Sets the bottom padding of `<ShopSection />`.",
      options: ["large", "default"],
      control: "select",
    },
    paddingTop: {
      description: "Sets the top padding of `<ShopSection />`.",
      options: ["default", "none", "lg"],
      control: "select",
    },
    children: {
      control: false,
      description:
        "Accepts a `<ShopSectionMain />` and/or `<ShopSectionAside />` component. Automatically generates a grid structure tailored for the shop.",
    },
    brand: {
      table: {
        disable: true,
      },
    },
    theme: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: [MockBox(10)],
    aside: [MockBox(3, "Sidebar")],
    variant: "default",
    palette: "blue",
  },
  decorators: [
    (Story) => (
      <Main>
        <Story />
      </Main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Image: Story = {
  args: {
    variant: "image",
    image: {
      src: "https://assets.odido.nl/e66aa70743/mid-hero-2023_06_b2c_55_g1g3.WebP",
      alt: "Alt",
    },
  },
};

export const Emphasised: Story = {
  args: {
    variant: "emphasised",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    palette: "purple",
  },
};
