import type { Meta, StoryObj } from "@storybook/react";

import { DefinitionList } from "./DefinitionList";
import { Stack } from "foundations/Stack";
import { DefinitionListProps } from "./DefinitionList.types";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { Box } from "components/Box";

const meta: Meta<typeof DefinitionList> = {
  title: "DesignSystem/Components/Lists/DefinitionList",
  component: DefinitionList,
  argTypes: {
    title: {
      control: "text",
      description: "The title of the definition list.",
      defaultValue: "Definition List Title",
    },
    children: {
      control: "text",
      description: "The description of the definition list.",
      defaultValue: "Definition List Description",
    },
    color: {
      control: "radio",
      options: ["default", "inverted"],
      description: "Sets the color of the definition list.",
    },
  },
  args: {
    title: "Title",
    children: "Description",
    color: "default",
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed", "SSR", "v1"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  parameters: {
    controls: {
      exclude: ["title", "description", "color"],
      // Disable controls for this story for Demonstrations purpose
      disable: true,
    },
  },
  render: () => (
    <Stack>
      <DefinitionList title="Internet" children="1 Gbit/s" />
      <DefinitionList title="TV" children="Odido TV pakket & 2 Mediaboxen" />
      <DefinitionList
        title="Extra TV pakketten"
        children="ESPN Compleet, Film 1 en Ziggo Sport Totaal"
      />
      <DefinitionList title="Veilig Online" children="3 apparaten" />
    </Stack>
  ),
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (variantProps: DefinitionListProps) => (
        <Box
          style={{
            background:
              variantProps.color === "inverted"
                ? "var(--semantics-color-text-default)"
                : undefined,
          }}
          grow
        >
          <DefinitionList {...variantProps} />
        </Box>
      ),
      {
        ...props,
        color: ["default", "inverted"],
      },
      {
        groupBy: [(props) => `Color: ${props.color}`],
      },
    );
  },
};
