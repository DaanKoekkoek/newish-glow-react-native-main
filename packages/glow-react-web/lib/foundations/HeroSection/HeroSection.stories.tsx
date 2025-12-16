import type { Meta } from "@storybook/react";
import { HeroSection } from "./HeroSection";
import { Hero } from "components/Hero";
import { Main } from "foundations/index";
import IMAGES from "foundations/Image/Image.mock";
import { Price } from "components/Price";

const meta: Meta<typeof HeroSection> = {
  title: "DesignSystem/Foundations/Layout/Section/HeroSection",
  component: HeroSection,
  argTypes: {
    palette: {
      description:
        "Accepts an `OdidoPalette` or an array of them. Applies palette color(s) to the children.",
    },
    title: {
      description:
        "Displayed at the top of `<HeroSection />`. Supports styling with `[]` and `|`.",
    },
    description: {
      description: "Optional text shown between the title and children.",
    },
    children: {
      description: "Accepts only `<Hero />` components.",
    },
  },
  args: {
    palette: ["red", "purple", "green"],
    title: "Title [highlight]",
    description: "Short description",
    children: [
      <Hero
        key="hero-1"
        heading={{ title: "Title [highlight]", subTitle: "Subtitle" }}
        sticker={{
          type: "default",
          description: "Sticker description",
          price: <Price value="10,00" />,
        }}
        visual={{ src: IMAGES["illustration"], alt: "Alt text" }}
      >
        contents
      </Hero>,
      <Hero
        key="hero-2"
        heading={{ title: "Title [highlight]", subTitle: "Subtitle" }}
        variant="solid"
        layout="uneven"
        sticker={{
          type: "default",
          description: "Sticker description",
          price: <Price value="10,00" />,
        }}
        visual={{
          src: IMAGES["hero_happy_man"],
          position: "bottom",
          alt: "Alt text",
          ratio: { mobileSmall: "4/3", tablet: "1/1" },
        }}
      >
        contents
      </Hero>,
      <Hero
        key="hero-3"
        heading={{ title: "Title [highlight]", subTitle: "Subtitle" }}
        layout="no-padding"
        sticker={{
          type: "default",
          description: "Sticker description",
          price: <Price value="10,00" />,
        }}
        visual={{
          resizeMode: "cover",
          src: IMAGES["hero_happy_man"],
          alt: "Alt text",
          ratio: { mobileSmall: "4/3", tablet: "1/1" },
        }}
        order="inverted"
      >
        contents
      </Hero>,
    ],
  },
  decorators: [
    (Story, args) => {
      return (
        <Main>
          <Story {...args} />
        </Main>
      );
    },
  ],
};

export default meta;

type Story = typeof meta;

export const Default: Story = {};
