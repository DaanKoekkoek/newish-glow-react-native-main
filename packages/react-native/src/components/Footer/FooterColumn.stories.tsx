import type { Meta, StoryObj } from "@storybook/react";
import { Main, Section, Grid, Paragraph } from "foundations/index";
import React from "react";

import { Footer } from "./Footer";
import type { FooterGridColumnProps } from "./Footer.types";

const meta: Meta<FooterGridColumnProps> = {
  title: "DesignSystem/Components/Navigation/Footer/Column",
  component: Footer.Grid.Column,
  argTypes: {
    collapsible: {
      description:
        "Accepts a `boolean`. Makes the `<Footer.Grid.Column />` behave like an `Accordion`, but is only applied on the `mobileSmall` and `mobile` breakpoints.",
    },
    title: {
      description:
        "Accepts a `string`. Renders a title above the `<Footer.Grid.Column />`",
    },
    children: {
      description: "Accepts `<Footer.Link />` or `React.ReactElement`.",
    },
  },
  args: {
    collapsible: false,
    title: "Footer column title",
    children: [
      <Footer.Link href="#">Column link</Footer.Link>,
      <Footer.Link href="#">Column link</Footer.Link>,
      <Footer.Link href="#">Column link extra text</Footer.Link>,
    ],
  },
  decorators: [
    (Story, args) => (
      <Main
        footerComponent={
          <Footer>
            <Footer.Top>
              <Footer.Grid>
                <Story {...args} />
              </Footer.Grid>
            </Footer.Top>
            <Footer.Bottom copyright="© Copyright text" />
          </Footer>
        }
      >
        <Section variant="subtle">
          <Grid>
            <Grid.Column>
              <Paragraph>Section content</Paragraph>
            </Grid.Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
