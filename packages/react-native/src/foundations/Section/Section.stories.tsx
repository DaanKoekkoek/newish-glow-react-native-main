import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import {
  Badge,
  Box,
  DefaultList,
  FeatureCard,
  List,
  SegmentedTab,
  SubscriptionHero,
} from "components/index";
import React from "react";

import type { SectionProps } from "./Section.types";
import { glowGradientVariants } from "../GlowGradient/GlowGradient.constants";
import IMAGES from "../Image/Image.mock";
import { Grid, Main, Paragraph, Stack, Section } from "../index";

const meta: Meta<SectionProps> = {
  title: "DesignSystem/Foundations/Layout/Section/Section",
  component: Section,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "subtle", "emphasised", "image"],
      description: "Background variant",
    },
    palette: {
      options: ["default", ...odidoPaletteKeys],
      control: "select",
      description: "Set the colour palette of the Section.",
    },
    glow: {
      control: "select",
      options: glowGradientVariants,
      description: "Glow background color.",
    },
    image: {
      description:
        "Apply a background image to the section. Sets the background with sizing property `cover`.",
    },
    paddingBottom: {
      description:
        "Sets the bottom padding of `Section`. Can also be applied across breakpoints.",
      options: ["default", "none"],
      control: "select",
    },
    paddingTop: {
      description:
        "Sets the top padding of `Section`. Can also be applied across breakpoints.",
      options: ["default", "none"],
      control: "select",
    },
    children: {
      control: false,
      description:
        "Accepts a `Grid` component. Renders the child at the bottom of the section.",
    },
  },
  args: {
    children: [
      <Grid key="grid">
        <Grid.Column>
          <Box prominence="outline" size="sm">
            <Paragraph>Grid (variant: default), Column 12</Paragraph>
          </Box>
        </Grid.Column>
      </Grid>,
    ],
    variant: "default",
    palette: "blue",
  },
  decorators: [
    (Story, args) => (
      <Main>
        <Story {...args} />
      </Main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Image: Story = {
  args: {
    variant: "image",
    image: {
      src: "https://assets.odido.nl/e66aa70743/mid-hero-2023_06_b2c_55_g1g3.WebP",
      alt: "Alt",
      localSrc: IMAGES["mid-hero"],
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
    palette: "purple",
    children: (
      <Grid tablet={6}>
        <Grid.Column>
          <FeatureCard
            type="visual"
            image={{ alt: "test", localSrc: IMAGES["tophero-app-only-deal"] }}
            style="alternate"
            onPress={() => {}}
            title="feature card"
            description="description (style: alternate)"
          />
        </Grid.Column>
        <Grid.Column>
          <FeatureCard
            type="visual"
            image={{ alt: "test", localSrc: IMAGES["tophero-app-only-deal"] }}
            onPress={() => {}}
            title="feature card"
            description="description (style: default)"
          />
        </Grid.Column>
        <Grid.Column>
          <FeatureCard
            type="visual"
            palette="blue"
            image={{ alt: "test", localSrc: IMAGES["tophero-app-only-deal"] }}
            style="alternate"
            onPress={() => {}}
            title="feature card"
            description="description (style: alternate, palette: blue)"
          />
        </Grid.Column>
        <Grid.Column>
          <FeatureCard
            type="visual"
            palette="blue"
            image={{ alt: "test", localSrc: IMAGES["tophero-app-only-deal"] }}
            onPress={() => {}}
            title="feature card"
            description="description (style: default, palette: blue)"
          />
        </Grid.Column>
        <Grid.Column tablet={12}>
          <Stack>
            <DefaultList variant="iconColored">
              <DefaultList.Item icon="checkmark">
                Content (variant: iconColored)
              </DefaultList.Item>
            </DefaultList>
            <DefaultList variant="iconColored" palette="blue">
              <DefaultList.Item icon="checkmark">
                Content (variant: iconColored, palette: blue)
              </DefaultList.Item>
            </DefaultList>
          </Stack>
        </Grid.Column>
        <Grid.Column tablet={12}>
          <Stack direction="row" wrap="wrap">
            <Badge
              text="badge label (prominence: default)"
              prominence="default"
            />
            <Badge
              text="badge label (prominence: outline)"
              prominence="outline"
            />
            <Badge
              text="badge label (prominence: subtle)"
              prominence="subtle"
            />
            <Badge palette="blue" text="badge label (palette: blue)" />
            <Badge
              palette="blue"
              text="badge label (prominence: outline, palette: blue)"
              prominence="outline"
            />
            <Badge
              palette="blue"
              text="badge label (prominence: subtle, palette: blue)"
              prominence="subtle"
            />
          </Stack>
        </Grid.Column>
        <Grid.Column tablet={12}>
          <Stack>
            <SegmentedTab
              onTabChange={function (activeTab: number): void {
                throw new Error("Function not implemented.");
              }}
            >
              <SegmentedTab.Buttons
                shadowPalette="orange"
                options={[
                  {
                    label: "Label",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label2",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label3",
                    icon: "mobile-phone",
                  },
                ]}
              />
              <SegmentedTab.Panel
                child={<Paragraph>Panel 1, shadowPalette: orange</Paragraph>}
                index={0}
              />
              <SegmentedTab.Panel
                child={<Paragraph>Panel 2, shadowPalette: orange</Paragraph>}
                index={1}
              />
              <SegmentedTab.Panel
                child={<Paragraph>Panel 3, shadowPalette: orange</Paragraph>}
                index={2}
              />
            </SegmentedTab>
            <SegmentedTab
              onTabChange={function (activeTab: number): void {
                throw new Error("Function not implemented.");
              }}
            >
              <SegmentedTab.Buttons
                shadowPalette="orange"
                backgroundPalette="blue"
                options={[
                  {
                    label: "Label",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label2",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label3",
                    icon: "mobile-phone",
                  },
                ]}
              />
              <SegmentedTab.Panel
                child={
                  <Paragraph>
                    Panel 1. BackgroundPalette: blue, ShadowPalette: orange
                  </Paragraph>
                }
                index={0}
              />
              <SegmentedTab.Panel
                child={
                  <Paragraph>
                    Panel 2. BackgroundPalette: blue, ShadowPalette: orange
                  </Paragraph>
                }
                index={1}
              />
              <SegmentedTab.Panel
                child={
                  <Paragraph>
                    Panel 3. BackgroundPalette: blue, ShadowPalette: orange
                  </Paragraph>
                }
                index={2}
              />
            </SegmentedTab>
          </Stack>
        </Grid.Column>
        <Grid.Column tablet={12}>
          <SubscriptionHero
            image={{
              alt: "alt text",
              localSrc: IMAGES["tophero-app-only-deal"],
            }}
            titleSecondary="Title secondary"
            title="Subscription Hero"
            list={[
              <SubscriptionHero.ListItem key="list-item-1">
                List item
              </SubscriptionHero.ListItem>,
              <SubscriptionHero.ListItem key="list-item-2">
                List item
              </SubscriptionHero.ListItem>,
              <SubscriptionHero.ListItem key="list-item-3">
                List item
              </SubscriptionHero.ListItem>,
            ]}
            actions={[
              <SubscriptionHero.Action
                key="action-1"
                onPress={() => {}}
                icon="5g"
              >
                Action text
              </SubscriptionHero.Action>,
              <SubscriptionHero.Action
                key="action-2"
                onPress={() => {}}
                icon="5g"
              >
                Action text
              </SubscriptionHero.Action>,
            ]}
          />
        </Grid.Column>
        <Grid.Column tablet={12}>
          <SubscriptionHero
            image={{
              alt: "alt text",
              localSrc: IMAGES["tophero-app-only-deal"],
            }}
            palette="blue"
            titleSecondary="Title secondary"
            title="Subscription Hero (palette: blue)"
            list={[
              <SubscriptionHero.ListItem key="list-item-1">
                List item
              </SubscriptionHero.ListItem>,
              <SubscriptionHero.ListItem key="list-item-2">
                List item
              </SubscriptionHero.ListItem>,
              <SubscriptionHero.ListItem key="list-item-3">
                List item
              </SubscriptionHero.ListItem>,
            ]}
            actions={[
              <SubscriptionHero.Action
                key="action-1"
                onPress={() => {}}
                icon="5g"
              >
                Action text
              </SubscriptionHero.Action>,
              <SubscriptionHero.Action
                key="action-2"
                onPress={() => {}}
                icon="5g"
              >
                Action text
              </SubscriptionHero.Action>,
            ]}
          />
        </Grid.Column>
        <Grid.Column>
          <List>
            <List.Item title="List item 1" icon="3d" />
            <List.Item title="List item 2" icon="accessoires" />
            <List.Item title="List item 3" icon="appointment" />
          </List>
        </Grid.Column>
        <Grid.Column>
          <List palette="blue">
            <List.Item title="List item 1 (palette: blue)" icon="3d" />
            <List.Item title="List item 2 (palette: blue)" icon="accessoires" />
            <List.Item title="List item 3 (palette: blue)" icon="appointment" />
          </List>
        </Grid.Column>
        <Grid.Column>
          <Box prominence="color">
            <Paragraph>Box (prominence: color)</Paragraph>
          </Box>
        </Grid.Column>
        <Grid.Column>
          <Box prominence="color" palette="blue">
            <Paragraph>Box (prominence: color, palette: blue)</Paragraph>
          </Box>
        </Grid.Column>
      </Grid>
    ),
  },
};
