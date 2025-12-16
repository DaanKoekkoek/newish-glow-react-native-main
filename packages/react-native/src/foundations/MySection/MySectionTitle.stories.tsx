import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import type { MySectionTitleProps } from "./MySection.types";
import { Main } from "../index";
import { MySection } from "./MySection";

const meta: Meta<MySectionTitleProps> = {
  title: "DesignSystem/Foundations/Layout/Section/MySection/Title",
  component: MySection.Title,
  argTypes: {
    size: {
      options: ["md", "lg", "xl"],
      control: "select",
      defaultValue: "md",
      description: "Set the size of the title",
    },
    children: {
      description: "Content of the title, accepts a `string`.",
    },
  },
  args: {
    children: "Title example",
    size: "xl",
  },
  render: (args: MySectionTitleProps) => (
    <Main>
      <MySection variant="subtle">
        <MySection.Container>
          <MySection.Title {...args} />
        </MySection.Container>
      </MySection>
    </Main>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLargeSize: Story = {
  args: {
    size: "xl",
  },
};
