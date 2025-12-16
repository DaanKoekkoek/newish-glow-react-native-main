import type { Meta, StoryObj } from "@storybook/react";

import { EmphasizedHero } from "./EmphasizedHero";
import { Button, Price, Counter, DefaultList } from "components/index";
import IMAGES from "foundations/Image/Image.mock";
import { EmphasizedHeroSection } from "foundations/EmphasizedHeroSection";
import { Paragraph } from "foundations/Paragraph";
import { Placeholder } from "components/Modal/Placeholder";

const futureDate: Date = new Date();
futureDate.setDate(futureDate.getDate());

const targetDate: Date = new Date(futureDate);
targetDate.setDate(targetDate.getDate() + 2);
targetDate.setHours(targetDate.getHours() + 12);

const meta: Meta<typeof EmphasizedHero> = {
  title: "DesignSystem/Components/Hero/EmphasizedHero",
  component: EmphasizedHero,
  argTypes: {
    countdown: {
      control: { disable: true },
      description: "Should only contain a `<Counter />` component.",
    },
  },
  args: {
    heading: {
      title: "Emphasized [Hero]",
      subTitle: "Subtitle",
    },
    children: [
      <Paragraph key="paragraph">Emphasized Hero content</Paragraph>,
      <DefaultList
        key="list"
        variant="icon"
        items={[
          { text: "List item 1", icon: "checkmark" },
          { text: "List item 2", icon: "checkmark" },
          { text: "List item 3", icon: "checkmark" },
        ]}
      />,
    ],
    visual: {
      src: IMAGES["hero_happy_man"],
      ratio: {
        mobileSmall: "2/1",
        laptop: "1/1",
      },
      alt: "Alt text",
      position: "bottom",
    },
    countdown: (
      <Counter
        targetDate={targetDate.toISOString()}
        size={{ mobileSmall: "default", tablet: "lg" }}
      />
    ),
    callToAction: [
      <Button key="btn-1" fill={{ mobileSmall: true, laptop: false }}>
        Button 1
      </Button>,
      <Button
        key="btn-2"
        prominence="secondary"
        fill={{ mobileSmall: true, laptop: false }}
      >
        Button 2
      </Button>,
    ],
    sticker: {
      type: "default",
      description: "Content of the sticker",
      price: <Price beforeText="Vanaf" value="10,00" />,
    },
  },
  parameters: {
    status: {
      type: ["devReviewed"],
    },
  },
  render: (args) => {
    const { background, palette, order, ...rest } = args;
    return (
      <EmphasizedHeroSection
        palette={palette}
        order={order}
        background={background ?? "default"}
        custom={
          <div style={{ position: "absolute", inset: 0 }}>
            <Placeholder />
          </div>
        }
      >
        <EmphasizedHero {...rest} />
      </EmphasizedHeroSection>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
