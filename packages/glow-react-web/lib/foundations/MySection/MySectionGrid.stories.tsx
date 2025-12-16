import type { Meta } from "@storybook/react";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { MySection, MySectionGrid } from "./MySection";

const meta: Meta<typeof MySectionGrid> = {
  title: "DesignSystem/Foundations/Layout/Section/MySection/Grid",
  component: MySectionGrid,
  args: {
    direction: "row",
    children: [
      <Box key="box-1" prominence="outline" size="sm">
        <Paragraph alignment="center">Column 1</Paragraph>
      </Box>,
      <Box key="box-2" prominence="outline" size="sm">
        <Paragraph alignment="center">Column 2</Paragraph>
      </Box>,
    ],
  },
  argTypes: {
    direction: {
      control: {
        type: "select",
        options: ["row", "row-reverse"],
      },
    },
  },
  decorators: [
    (Story, args) => (
      <MySection title={{ text: "Title XL", size: "xl" }}>
        <Story {...args} />
      </MySection>
    ),
  ],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
