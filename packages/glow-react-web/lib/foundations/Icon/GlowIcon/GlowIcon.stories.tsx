import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta } from "@storybook/react";

import { GlowIcon, type GlowIconProps } from "./index";
import { Box } from "components/Box";
import type { IconNames } from "../Icon.types";
import {
  Main,
  Section,
  Grid,
  Column,
  Stack,
  Paragraph,
} from "foundations/index";
import { OdidoPalette } from "_internals/Color";

const meta: Meta<typeof GlowIcon> = {
  title: "DesignSystem/Foundations/Assets/Gradients/GlowIcon",
  component: GlowIcon,
  args: {
    name: "alert",
    size: "xxl",
    solid: false,
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: Object.keys(IconsMap),
      description: "Available icons coming from the `Glow-Icon` repository.",
    },
    solid: {
      description: "Sets icon variant.",
    },
    style: {
      description:
        "Style that is applied on the wrapper of both the default and additional Icon (when `renderAs` is set to `animated`).",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "md", "lg", "xl", "xxl"],
      description:
        "Available icon sizes coming from the `Glow-Icon` repository.",
    },
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Set the glow gradient variant.",
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

const GlowIconCollection = ({ ...props }: GlowIconProps) => {
  return (
    <Main>
      <Section>
        <Grid columnSize={{ mobileSmall: 6, laptop: 3 }}>
          {Object.keys(IconsMap).map((iconName) => (
            <Column key={iconName}>
              <Box size="sm" prominence="color" key={iconName}>
                <Stack alignItems="center">
                  <GlowIcon {...props} name={iconName as IconNames} />
                  <Paragraph alignment="center">{iconName}</Paragraph>
                </Stack>
              </Box>
            </Column>
          ))}
        </Grid>
      </Section>
    </Main>
  );
};

export const AllIcons: Story = {
  argTypes: {
    name: {
      control: { type: null },
    },
  },
  render: (props: GlowIconProps) => <GlowIconCollection {...props} />,
};
