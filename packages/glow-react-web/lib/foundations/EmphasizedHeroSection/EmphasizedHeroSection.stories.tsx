import { Meta, StoryObj } from "@storybook/react";
import { EmphasizedHeroSection } from "./EmphasizedHeroSection";
import { Column, Grid, Main, Paragraph, Section } from "foundations/index";
import IMAGES from "foundations/Image/Image.mock";
import {
  EmphasizedHero,
  Button,
  Counter,
  Price,
  Hero,
  DefaultList,
} from "components/index";
import { OdidoPalette } from "_internals/Color";

const futureDate: Date = new Date();
futureDate.setDate(futureDate.getDate());

const targetDate: Date = new Date(futureDate);
targetDate.setDate(targetDate.getDate() + 2);
targetDate.setHours(targetDate.getHours() + 12);

const meta: Meta<typeof EmphasizedHeroSection> = {
  title: "DesignSystem/Foundations/Layout/Section/EmphasizedHeroSection",
  component: EmphasizedHeroSection,
  argTypes: {
    custom: {
      description:
        "Renders a different background. Also requires `background` to be set to `custom`.",
    },
    children: {
      description:
        "Pass in additional content underneath the `title` and/or `subTitle`.",
    },
    order: {
      description:
        "Sets the render order of the image, content columns and gradient if `background` is set to `default`.",
    },
    palette: {
      description:
        "Sets the palette color for the Hero. Only applicable for the Odido brand.",
      options: [...OdidoPalette],
      control: {
        type: "radio",
      },
    },
  },
  args: {
    palette: "purple",
    children: (
      <EmphasizedHero
        heading={{
          title: "Title",
          subTitle: "Subtitle",
        }}
        visual={{
          src: IMAGES["hero-cat"],
          ratio: { mobileSmall: "4/3", mobile: "16/9", laptop: "1/1" },
          position: "bottom",
        }}
        sticker={{
          type: "default",
          description: "Content of the sticker",
          price: <Price beforeText="Vanaf" value="10,00" />,
        }}
        callToAction={[
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
        ]}
      >
        <Paragraph key="paragraph">Emphasized Hero content</Paragraph>
        <DefaultList
          variant="icon"
          items={[
            { text: "List item 1", icon: "checkmark" },
            { text: "List item 2", icon: "checkmark" },
            { text: "List item 3", icon: "checkmark" },
          ]}
        />
      </EmphasizedHero>
    ),
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    background: "custom",
    custom: (
      <div
        style={{
          alignItems: "flex-start",
          border: "2px dashed #000",
          display: "flex",
          inset: 0,
          justifyContent: "center",
          margin: 2,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <div
          style={{
            padding: "1rem",
            marginTop: "3rem",
          }}
        >
          <Paragraph>
            Custom background content. Accepts any type of ReactNode.
          </Paragraph>
        </div>
      </div>
    ),
  },
};

export const WithCounter: Story = {
  args: {
    children: (
      <EmphasizedHero
        heading={{
          title: "Title",
          subTitle: "Subtitle",
        }}
        visual={{
          src: IMAGES["hero-cat"],
          ratio: { mobileSmall: "4/3", mobile: "16/9", laptop: "1/1" },
        }}
        sticker={{
          type: "default",
          description: "Content of the sticker",
          price: <Price beforeText="Vanaf" value="10,00" />,
        }}
        countdown={<Counter targetDate={targetDate.toISOString()} />}
        callToAction={[
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
        ]}
      >
        EmphasizedHero content
      </EmphasizedHero>
    ),
  },
};

export const WithOtherSections: Story = {
  decorators: [
    (Story, args) => {
      return (
        <>
          <Story {...args} />
          <Section paddingTop="none">
            <Grid>
              <Column>
                <Hero
                  heading={{ title: "Heading [Highlight]" }}
                  visual={{ src: IMAGES["hero_happy_man"] }}
                  layout="no-padding"
                >
                  Other Section
                </Hero>
              </Column>
            </Grid>
          </Section>
        </>
      );
    },
  ],
};
