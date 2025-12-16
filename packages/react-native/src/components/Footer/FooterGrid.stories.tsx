import type { Meta, StoryObj } from "@storybook/react";
import { Main, Section, Grid, Paragraph } from "foundations/index";
import React from "react";

import { Footer } from "./Footer";
import type { FooterGridProps } from "./Footer.types";

const meta: Meta<FooterGridProps> = {
  title: "DesignSystem/Components/Navigation/Footer/Grid",
  component: Footer.Grid,
  argTypes: {
    justifyContent: {
      description:
        "Uses `<Stack />`'s `justifyContent` property. This property is optional. Gives you control over the alignment of `<Footer.Grid.Column />`. ",
      options: [
        undefined,
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        { mobileSmall: "center", tablet: "flex-start" },
      ],
      control: {
        type: "select",
      },
    },
    children: {
      description: "Accepts `<Footer.Grid.Column />`.",
    },
  },
  args: {
    children: [
      <Footer.Grid.Column key="column-logo">
        <Footer.Link href="#">
          <Footer.Logo />
        </Footer.Link>
      </Footer.Grid.Column>,
      <Footer.Grid.Column key="column-socials">
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
      </Footer.Grid.Column>,
      <Footer.Grid.Column key="column-appstores">
        <Footer.AppStores>
          <Footer.Link href="#">
            <Footer.AppStore brand="Apple" />
          </Footer.Link>
          <Footer.Link href="#">
            <Footer.AppStore brand="Google" />
          </Footer.Link>
        </Footer.AppStores>
      </Footer.Grid.Column>,
    ],
  },
  render: (args: FooterGridProps) => {
    return (
      <Main
        footerComponent={
          <Footer>
            <Footer.Top>
              <Footer.Grid justifyContent={args.justifyContent}>
                <Footer.Grid.Column
                  key="column-1"
                  title="Column title"
                  collapsible
                >
                  <Footer.Link href="#">Column link</Footer.Link>
                  <Footer.Link href="#">Column link</Footer.Link>
                </Footer.Grid.Column>
                <Footer.Grid.Column
                  key="column-2"
                  title="Column title"
                  collapsible
                >
                  <Footer.Link href="#">Column link</Footer.Link>
                  <Footer.Link href="#">Column link</Footer.Link>
                </Footer.Grid.Column>
                <Footer.Grid.Column
                  key="column-3"
                  title="Column title"
                  collapsible
                >
                  <Footer.Link href="#">Column link</Footer.Link>
                  <Footer.Link href="#">Column link</Footer.Link>
                </Footer.Grid.Column>
              </Footer.Grid>
              <Footer.Grid {...args} />
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
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
