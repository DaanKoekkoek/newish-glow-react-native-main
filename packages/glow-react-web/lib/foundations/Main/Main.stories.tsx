import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "components/Divider";
import { Section } from "foundations/Section";

import { Main } from "./Main";
import type { MainProps } from "./Main.types";
import { Column, Grid } from "../Grid";
import { Paragraph } from "../Paragraph";
import { Box } from "components/Box";

const MainChildrenMock = ({
  numberOfSections = 5,
}: {
  numberOfSections?: number;
}) => {
  return (
    <>
      {Array.from({ length: numberOfSections }, (_, i) => i + 1).map((i) => (
        <Section
          key={i}
          variant={i % 2 === 1 ? "subtle" : "default"}
          palette={i % 2 === 1 ? "default" : undefined}
        >
          <Grid>
            <Column>
              <Box prominence={i % 2 === 1 ? "outline" : "color"} size="sm">
                <Paragraph>Box within Column</Paragraph>
              </Box>
            </Column>
          </Grid>
        </Section>
      ))}
    </>
  );
};

const headerComponentMock = (
  <>
    <nav style={{ minHeight: 36, backgroundColor: "white" }}>
      <Grid>
        <Column>
          <Paragraph>Header</Paragraph>
        </Column>
      </Grid>
    </nav>
    <Divider />
  </>
);

const footerComponentMock = (
  <footer
    style={{ paddingBlock: 16, backgroundColor: "black", color: "white" }}
  >
    <Grid>
      <Column>
        <Paragraph>Footer</Paragraph>
      </Column>
    </Grid>
  </footer>
);

const meta: Meta<MainProps> = {
  title: "DesignSystem/Foundations/Layout/Main",
  component: Main,
  argTypes: {
    children: {
      description:
        "The children of the `Main` component. Accepts `Section` components only.",
      control: false,
    },
    header: {
      description:
        "Component rendered before a `Section` within the `Main` component. Can be sticky when `hasStickyHeader` is set to `true`.",
      control: false,
    },
    footer: {
      description:
        "Component rendered after all `Section` children within the `Main` component.",
      control: false,
    },
  },
  args: {
    children: <MainChildrenMock />,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithHeaderAndFooter: Story = {
  args: {
    header: headerComponentMock,
    footer: footerComponentMock,
  },
};
