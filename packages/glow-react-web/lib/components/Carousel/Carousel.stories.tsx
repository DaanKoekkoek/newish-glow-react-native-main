import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Carousel } from "./Carousel";
import { Main, Icon, Section, Column, Grid, Image } from "foundations/index";
import { HorizontalCard } from "components/index";
import IMAGES from "foundations/Image/Image.mock.ts";

const createHorizontalCard = (
  index: number,
  title: string = "Slide",
  variableSize?: boolean,
) => {
  if (variableSize && index % 2 === 1) {
    return (
      <HorizontalCard
        key={index}
        variant="color"
        icon="4g-for-home"
        title={`${title} ${index + 1} with extra content and linebreak`}
        textLink={{
          size: "sm",
          onClick: action("textLink.onClick"),
          children: ["Link ", <Icon key="icon" name="arrow-right" />],
        }}
      >
        Horizontal card content
      </HorizontalCard>
    );
  }

  return (
    <HorizontalCard
      key={index}
      variant="color"
      icon="helpdesk"
      title={`${title} ${index + 1}`}
      textLink={{
        size: "sm",
        onClick: action("textLink.onClick"),
        children: ["Link ", <Icon key="icon" name="arrow-right" />],
      }}
    >
      Horizontal card content
    </HorizontalCard>
  );
};

const createImage = (index: number) => {
  if (index % 2 === 1) {
    return (
      <Image
        renderType="foreground"
        alt="image"
        key={index}
        ratio="9/16"
        position="top"
        src={IMAGES["phone2"]}
      />
    );
  }

  return (
    <Image
      renderType="foreground"
      alt="image"
      key={index}
      ratio="9/16"
      position="top"
      src={IMAGES["phone"]}
    />
  );
};

const meta: Meta<typeof Carousel> = {
  title: "DesignSystem/Components/Carousel",
  component: Carousel,
  args: {
    children: Array.from({ length: 10 }, (_, i) => createImage(i)),
    onSlideChange: action("onSlideChange"),
    slidesToShow: {
      mobileSmall: 1,
      mobile: 3,
      laptop: 4,
      desktop: 5,
    },
    prevButtonProps: {
      ["aria-label"]: "Vorige slide",
    },
    nextButtonProps: {
      ["aria-label"]: "Volgende slide",
    },
  },
  argTypes: {
    hideControls: {
      control: { type: "boolean" },
      description: "Hide the carousel navigation controls (Storybook only)",
      table: {
        category: "Storybook Controls",
      },
    },
    scrollBySlideCount: {
      description:
        "When `true`, the carousel will scroll by the number of slides defined in `slidesToShow` (i.e., one full page at a time). When `false`, it scrolls one slide at a time. Has no effect if `centerSlide` is enabled.",
      control: { type: "boolean" },
      defaultValue: true,
    },
    children: {
      description:
        "The slides within the carousel. Ideally, each slide should be a component with a defined `width`.",
    },
    onSlideChange: {
      description:
        "Callback function that receives the index of the active slide after a change.",
    },
    slidesToShow: {
      description:
        "Number of slides visible at a time. Can be set per breakpoint using `max-width`, except `desktop`, which applies globally.",
    },
    initialSlide: {
      description:
        "Defines the starting slide index when the carousel is initialized.",
    },
    centerSlide: {
      description:
        "Enables looping and centers slides. Can be set per breakpoint. Works in combination with `slideOffset`.",
    },
    slideOffset: {
      description:
        "Adjusts the visible portion of adjacent slides when the carousel is centered. Higher values reveal more of neighboring slides.",
    },
    variableSize: {
      description:
        "Allows slides to have flexible dimensions by removing default `width` and `height` constraints.",
    },
    prevButtonProps: {
      description:
        "Passes additional props to the left navigation button (previous slide).",
    },
    nextButtonProps: {
      description:
        "Passes additional props to the right navigation button (next slide).",
    },
  } as Record<string, unknown>,
  parameters: {
    status: {
      type: ["devReviewed"],
    },
  },
  render: (args) => {
    const { hideControls, ...carouselArgs } = args as typeof args & {
      hideControls?: boolean;
    };

    return (
      <Main>
        <Section variant="subtle">
          <Grid fluid noGutters>
            <Column>
              <Carousel
                {...carouselArgs}
                prevButtonProps={
                  hideControls ? undefined : carouselArgs.prevButtonProps
                }
                nextButtonProps={
                  hideControls ? undefined : carouselArgs.nextButtonProps
                }
              />
            </Column>
          </Grid>
        </Section>
      </Main>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThreeSlides: Story = {
  args: {
    slidesToShow: {
      mobile: 1,
    },
    children: Array.from({ length: 3 }, (_, i) =>
      createHorizontalCard(
        i,
        "Slide (renders carousel on breakpoints below desktop)",
      ),
    ),
  },
  render: (args) => {
    return (
      <Main>
        <Section>
          <Grid>
            <Column>
              <Carousel {...args} />
            </Column>
          </Grid>
        </Section>
      </Main>
    );
  },
};

export const SlidesPerBreakpoint: Story = {
  args: {
    slidesToShow: {
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4,
    },
    children: Array.from({ length: 8 }, (_, i) => createHorizontalCard(i)),
  },
};

export const VariableSlideSize: Story = {
  args: {
    slidesToShow: {
      mobileSmall: 1,
      tablet: 2,
      desktop: 3,
    },
    centerSlide: {
      mobileSmall: false,
      desktop: true,
    },
    variableSize: true,
    children: Array.from({ length: 5 }, (_, i) =>
      createHorizontalCard(i, "Variable slide", true),
    ),
  },
};

export const CenteredSlide: Story = {
  args: {
    children: Array.from({ length: 5 }, (_, i) =>
      createHorizontalCard(i, "Centered slide (automatically loops)", true),
    ),
    slidesToShow: {
      tablet: 1,
      desktop: 3,
    },
    centerSlide: {
      tablet: false,
      desktop: true,
    },
  },
};
