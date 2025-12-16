import type { Meta } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import type { OdidoPalette } from "_theming/tokenLoader";
import { Icon } from "foundations/Icon";
import {
  type MainProps,
  type SectionProps,
  Section,
  Grid,
  Main,
  Paragraph,
} from "foundations/index";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { TopNavigation } from "./TopNavigation";
import { mockTopNavigation } from "./TopNavigation.mocks";
import type { TopNavigationProps } from "./TopNavigation.types";
import { Button, TextLink } from "../index";

const mainConfig = (): Omit<MainProps, "children"> => {
  return {
    hasTopNavigation: true,
  };
};

const sectionConfig = (
  palette?: OdidoPalette,
  paddingTop?: SectionProps["paddingTop"],
  paddingBottom?: SectionProps["paddingBottom"],
  variant: SectionProps["variant"] = "subtle",
): Omit<SectionProps, "children"> => {
  return {
    variant,
    palette,
    paddingTop,
    paddingBottom,
  };
};

const meta: Meta<TopNavigationProps> = {
  title: "DesignSystem/Components/Navigation/TopNavigation",
  component: TopNavigation,
  args: {
    action: {
      left: (
        <TextLink onPress={() => alert("pressed left button")}>
          <TextLink.Icon name="chevron-left" />
        </TextLink>
      ),
      right: (
        <TextLink onPress={() => alert("pressed right button")}>
          <TextLink.Icon name="chevron-right" />
        </TextLink>
      ),
    },
    showTitle: true,
  },
  argTypes: {
    paletteType: {
      control: { type: "select" },
      options: ["section", "subscriptionHero"],
      description: "Changes the palette color group",
    },
    palette: {
      description:
        "Set the colour palette of the TopNavigation. Is automatically applied when `mirrorColor` is enabled.",
      control: { type: "select" },
      options: [...odidoPaletteKeys],
    },
    mirrorColor: {
      description:
        "Whether to mirror the background color of the `Section` or `SubscriptionHero`",
    },
    action: {
      description:
        "Intended to render buttons to the left and/or right of the `title`. Accepts a `React.ReactElement`",
    },
    opacityYOffset: {
      description: "Y position on when to make the title appear",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "subtle", "emphasised", "image"],
      description: "Variant of the TopNavigation. Inherited from `Section`",
    },
    title: {
      type: "string",
      description:
        "Title of the TopNavigation. Use this only when there's no `SubscriptionHero` on the page.",
    },
    showTitle: {
      type: "boolean",
      description: "Whether the title should stay empty.",
    },
    height: {
      type: "number",
      description:
        "Height of the TopNavigation. This is passed down via parameter in `Glow Universal React` repo",
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  decorators: [
    (Story, args) => (
      <Main {...mainConfig()}>
        <Section
          {...sectionConfig("green", {
            mobileSmall: "none",
            tablet: "default",
          })}
        >
          <Grid>
            <Grid.Column>{mockTopNavigation().subscriptionHero}</Grid.Column>
          </Grid>
        </Section>
        <Section {...sectionConfig("purple")}>
          <Grid>
            <Grid.Column>
              <Story {...args} />
            </Grid.Column>
            <Grid.Column>{mockTopNavigation().content}</Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};

export const WithMirroredColor: Story = {
  args: {
    mirrorColor: true,
    palette: "default",
    height: 100,
    action: undefined,
    showTitle: true,
  },
  decorators: [
    (Story, args) => {
      const [showSection, setShowSection] = useState(false);
      const [loaded, setLoaded] = useState(false); // Lifted state

      useEffect(() => {
        if (!loaded) {
          const timer = setTimeout(() => {
            setLoaded(true);
          }, 3000);

          return () => clearTimeout(timer);
        }
      }, [loaded]);

      return (
        <Main {...mainConfig()}>
          <Section paddingTop="none">
            <Grid>
              <Grid.Column>{mockTopNavigation().subscriptionHero}</Grid.Column>
            </Grid>
          </Section>

          {showSection ? (
            <Section>
              <Grid>
                <Grid.Column>
                  <Paragraph>Test</Paragraph>
                </Grid.Column>
              </Grid>
            </Section>
          ) : (
            <></>
          )}

          <Section>
            <Grid>
              <Grid.Column>
                {/* Button to toggle section */}
                <Button onPress={() => setShowSection(!showSection)}>
                  Toggle Section
                </Button>
                {!loaded ? (
                  <Text>Loading...</Text>
                ) : (
                  <View>
                    <Text>Async Component Loaded</Text>
                    <Text>Async Component Loaded</Text>
                    <Text>Async Component Loaded</Text>
                    <Text>Async Component Loaded</Text>
                    <Text>Async Component Loaded</Text>
                  </View>
                )}
              </Grid.Column>
            </Grid>
          </Section>

          <>
            <Section {...sectionConfig("purple")}>
              <Grid>
                <Grid.Column>
                  <Story {...args} />
                  {mockTopNavigation().content}
                </Grid.Column>
              </Grid>
            </Section>
            <Section>
              <Grid>
                <Grid.Column>
                  <Story {...args} />
                  {mockTopNavigation().content}
                </Grid.Column>
              </Grid>
            </Section>
          </>
        </Main>
      );
    },
  ],
};

export const WithoutSubscriptionHero: Story = {
  args: {
    title: "Without subscription hero",
  },
  decorators: [
    (Story, args) => (
      <Main {...mainConfig()}>
        <Section
          {...sectionConfig("green", {
            mobileSmall: "none",
            tablet: "default",
          })}
        >
          <Grid>
            <Grid.Column />
          </Grid>
        </Section>
        <Section {...sectionConfig("purple")}>
          <Grid>
            <Grid.Column>
              <Story {...args} />
            </Grid.Column>
            <Grid.Column>{mockTopNavigation().content}</Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};

export const WithoutTitle: Story = {
  args: {},
  decorators: [
    (Story, args) => (
      <Main {...mainConfig()}>
        <Section
          {...sectionConfig("green", {
            mobileSmall: "none",
            tablet: "default",
          })}
        >
          <Grid>
            <Grid.Column />
          </Grid>
        </Section>
        <Section {...sectionConfig("purple")}>
          <Grid>
            <Grid.Column>
              <Story {...args} />
            </Grid.Column>
            <Grid.Column>{mockTopNavigation().content}</Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};

export const WithoutActions: Story = {
  args: {
    title: "Without actions",
    action: undefined,
  },
  decorators: [
    (Story, args) => (
      <Main {...mainConfig()}>
        <Section
          {...sectionConfig("green", {
            mobileSmall: "none",
            tablet: "default",
          })}
        >
          <Grid>
            <Grid.Column />
          </Grid>
        </Section>
        <Section {...sectionConfig("purple")}>
          <Grid>
            <Grid.Column>
              <Story {...args} />
            </Grid.Column>
            <Grid.Column>{mockTopNavigation().content}</Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};

export const OneAction: Story = {
  args: {
    title: "One action",
    action: {
      left: (
        <TextLink onPress={() => alert("pressed left action")}>
          <Icon name="chevron-left" />
        </TextLink>
      ),
    },
  },
  decorators: [
    (Story, args) => (
      <Main {...mainConfig()}>
        <Section
          {...sectionConfig("green", {
            mobileSmall: "none",
            tablet: "default",
          })}
        >
          <Grid>
            <Grid.Column />
          </Grid>
        </Section>
        <Section {...sectionConfig("purple")}>
          <Grid>
            <Grid.Column>
              <Story {...args} />
            </Grid.Column>
            <Grid.Column>{mockTopNavigation().content}</Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};
