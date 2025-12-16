import type { Meta, StoryObj } from "@storybook/react";

import { Accordion, AccordionPanel } from "./Accordion";
import { TextLink } from "../TextLink";
import { Paragraph, Strong } from "foundations/index";
import { AccordionProps } from "./Accordion.types";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { Box } from "components/Box";

const meta: Meta<typeof Accordion> = {
  title: "DesignSystem/Components/Accordion",
  component: Accordion,
  argTypes: {
    children: {
      description: "Accepts `<AccordionPanel />` as component.",
    },
    multiple: {
      description:
        "Allow multiple accordion panels to be opened simultaneously if set to `true`.",
    },
    active: {
      description:
        "Accepts an array of indexes of the panels. Opens matching index by default.",
    },
    inverted: {
      description:
        "Applies inverted styling to the accordion and accordion panel.",
    },
    testID: {
      description: "Applies a test id to the accordion container.",
    },
    className: {
      description: "Additional classes to be added to the accordion container.",
    },
  },
  args: {
    inverted: false,
    multiple: true,
    active: [],
    children: [
      <AccordionPanel title="Accepts a string" key={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et metus
        aliquet, tempus mauris quis, rutrum tortor. Proin fermentum id felis ac
        elementum. Aspernatur fuga quo veniam laborum minima, animi labore
        atque, ducimus aperiam natus et cumque quae possimus nobis rerum
        sapiente! Voluptate, vitae quos. Veniam rem in modi sit velit, inventore
        sed soluta maxime adipisci. Omnis beatae esse inventore vel iure eum
        iste molestiae!
      </AccordionPanel>,
      <AccordionPanel title="Or a component" key={2}>
        <Paragraph size="sm">
          Like a paragraph with small text{" "}
          <Strong size="sm">with Strong text</Strong>, and a{" "}
          <TextLink href="#">TextLink</TextLink>.
        </Paragraph>
      </AccordionPanel>,
      <AccordionPanel title="Or multiple components" key={3}>
        <Strong size="sm">Like a Strong piece of text</Strong>
        <Paragraph size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
          metus aliquet, tempus mauris quis, rutrum tortor. Proin fermentum id
          felis ac elementum. Aspernatur fuga quo veniam laborum minima, animi
          labore atque, ducimus aperiam natus et cumque quae possimus nobis
          rerum sapiente! Voluptate, vitae quos. Veniam rem in modi sit velit,
          inventore sed soluta maxime adipisci. Omnis beatae esse inventore vel
          iure eum iste molestiae!
        </Paragraph>
      </AccordionPanel>,
      <AccordionPanel title="But you're not allowed to mix" key={4}>
        {`like a string with a <Paragraph>component</Paragraph>`}
      </AccordionPanel>,
    ],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const _Variants: Story = {
  render: (props) =>
    renderCartesianVariants(
      (variantProps: AccordionProps) => (
        <Box
          style={{
            background: variantProps.inverted
              ? "var(--semantics-color-text-default)"
              : undefined,
          }}
          grow
        >
          <Accordion {...props} {...variantProps} active={[1]} />
        </Box>
      ),
      {
        inverted: [false, true],
        active: [[]],
      },
    ),
};
