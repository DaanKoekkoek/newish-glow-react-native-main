import type { Meta, StoryObj } from "@storybook/react";
import { Main, Section, Grid, Paragraph } from "foundations/index";
import React from "react";

import { Footer } from "./Footer";
import type { FooterProps } from "./Footer.types";

const meta: Meta<FooterProps> = {
  title: "DesignSystem/Components/Navigation/Footer",
  component: Footer,
  argTypes: {},
  args: {
    children: [
      <Footer.Breadcrumbs key="breadcrumb">
        <Paragraph size="sm" key="initial">
          Initial
        </Paragraph>
        <Footer.Link href="#" key="link-1">
          Breadcrumb link
        </Footer.Link>
        <Footer.Link href="#" key="link-2">
          Breadcrumb link
        </Footer.Link>
      </Footer.Breadcrumbs>,
      <Footer.Top key="top">
        <Footer.Grid>
          <Footer.Grid.Column title="Column title 1" collapsible>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link extra text</Footer.Link>
          </Footer.Grid.Column>
          <Footer.Grid.Column title="Column title 2" collapsible>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
          </Footer.Grid.Column>
          <Footer.Grid.Column title="Column title 3" collapsible>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link extra long text</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
          </Footer.Grid.Column>
          <Footer.Grid.Column title="Column title 4" collapsible>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
            <Footer.Link href="#">Column link</Footer.Link>
          </Footer.Grid.Column>
        </Footer.Grid>
      </Footer.Top>,
      <Footer.Bottom key="bottom" copyright="© Copyright text">
        <Footer.Grid>
          <Footer.Grid.Column>
            <Footer.Logo />
          </Footer.Grid.Column>
          <Footer.Grid.Column>
            <Footer.Socials>
              <Footer.Link href="#">
                <Footer.Icon name="x" solid={false} />
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
        </Footer.Grid>
        <Footer.Assorted>
          <Footer.Link href="#">Assorted link</Footer.Link>
          <Footer.Link href="#">Assorted link</Footer.Link>
          <Footer.Link href="#">Assorted link</Footer.Link>
          <Footer.Link href="#">Assorted link</Footer.Link>
        </Footer.Assorted>
      </Footer.Bottom>,
    ],
  },
  decorators: [
    (Story) => (
      <Main footerComponent={<Story />}>
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

export const Default: Story = {};
