import type { Meta, StoryObj } from "@storybook/react";
import { Main, Section, Grid, Paragraph } from "foundations/index";
import React from "react";

import { Footer } from "./Footer";
import type { FooterBottomProps } from "./Footer.types";

const meta: Meta<FooterBottomProps> = {
  title: "DesignSystem/Components/Navigation/Footer/Bottom",
  component: Footer.Bottom,
  argTypes: {
    copyright: {
      description: "Accepts a `string`. Rendered below the `children`.",
    },
    children: {
      description: "Accepts `<Footer.Grid />` and `<Footer.Assorted />`.",
    },
  },
  args: {
    copyright: "© Copyright text",
    children: [
      <Footer.Grid key="grid">
        <Footer.Grid.Column>
          <Footer.Logo />
        </Footer.Grid.Column>
        <Footer.Grid.Column>
          <Footer.Socials>
            <Footer.Link href="#">
              <Footer.Icon name="x" />
            </Footer.Link>
            <Footer.Link href="#">
              <Footer.Icon name="facebook" />
            </Footer.Link>
            <Footer.Link href="#">
              <Footer.Icon name="linkedin" />
            </Footer.Link>
            <Footer.Link href="#">
              <Footer.Icon name="chat" />
            </Footer.Link>
          </Footer.Socials>
        </Footer.Grid.Column>
        <Footer.Grid.Column>
          <Footer.AppStores>
            <Footer.Link href="#">
              <Footer.AppStore brand="Apple" />
            </Footer.Link>
            <Footer.Link href="#">
              <Footer.AppStore brand="Google" />
            </Footer.Link>
          </Footer.AppStores>
        </Footer.Grid.Column>
      </Footer.Grid>,
      <Footer.Assorted key="assorted">
        <Footer.Link href="#">Assorted link</Footer.Link>
        <Footer.Link href="#">Assorted link</Footer.Link>
        <Footer.Link href="#">Assorted link</Footer.Link>
        <Footer.Link href="#">Assorted link</Footer.Link>
      </Footer.Assorted>,
    ],
  },
  render: (args: FooterBottomProps) => {
    return (
      <Main
        footerComponent={
          <Footer>
            <Footer.Bottom {...args} />
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
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
