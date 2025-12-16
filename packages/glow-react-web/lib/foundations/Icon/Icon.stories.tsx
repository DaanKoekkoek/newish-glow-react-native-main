import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";
import type { IconNames, IconProps } from "./Icon.types";
import { Box } from "components/Box";
import { Column, Grid, Paragraph, Stack } from "..";
import { OdidoPalette } from "_internals/Color";

const meta: Meta<typeof Icon> = {
  title: "DesignSystem/Foundations/Assets/Icon",
  component: Icon,
  argTypes: {
    name: {
      options: Object.keys(IconsMap),
      control: { type: "select" },
    },
    size: {
      options: ["sm", "default", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
      table: {
        defaultValue: "default",
      },
    },
    solid: { control: { type: "boolean" } },
    palette: {
      options: [...OdidoPalette],
    },
  },
  args: {
    name: "add",
  },
  decorators: [
    (Story, { args }) => {
      return (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            padding: "12px",
          }}
        >
          <Story {...args} />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const AllIcons: Story = {
  argTypes: {
    name: {
      control: { type: null },
    },
  },
  render: (props: IconProps) => (
    <Grid columnSize={{ mobileSmall: 6, tablet: 3 }}>
      {Object.keys(IconsMap).map((iconName) => (
        <Column>
          <Box size="sm" grow prominence="outline">
            <Stack alignItems="center" justifyContent="center">
              <Icon key={iconName} {...props} name={iconName as IconNames} />
              <Paragraph alignment="center">{iconName}</Paragraph>
            </Stack>
          </Box>
        </Column>
      ))}
    </Grid>
  ),
};
