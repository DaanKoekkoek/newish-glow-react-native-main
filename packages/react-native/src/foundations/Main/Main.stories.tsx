import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "components/Divider";
import { Footer } from "components/Footer";
import { Section } from "foundations/Section";
import React from "react";

import { Main } from "./Main";
import {
  MainChildrenMock,
  MainChildrenWithModalAndSnackbarMock,
} from "./Main.mocks";
import type { MainProps } from "./Main.types";
import { Grid } from "../Grid";
import { Paragraph } from "../Paragraph";

const headerComponentMock = (
  <>
    <Section
      style={{
        paddingVertical: 8,
        justifyContent: "center",
        height: 50,
      }}
    >
      <Grid>
        <Grid.Column>
          <Paragraph>Header</Paragraph>
        </Grid.Column>
      </Grid>
    </Section>
    <Divider />
  </>
);

const footerComponentMock = (
  <Footer>
    <Footer.Breadcrumbs>
      <Paragraph size="sm">Initial</Paragraph>
      <Footer.Link href="#">breadcrumb 1</Footer.Link>
      <Footer.Link href="#">breadcrumb 2</Footer.Link>
    </Footer.Breadcrumbs>
    <Footer.Top>
      <Footer.Grid>
        <Footer.Grid.Column title="Title 1" collapsible>
          <Footer.Link href="#">Link 1</Footer.Link>
          <Footer.Link href="#">Link 2</Footer.Link>
          <Footer.Link href="#">Link 3</Footer.Link>
        </Footer.Grid.Column>
        <Footer.Grid.Column title="Title 2" collapsible>
          <Footer.Link href="#">Link 1</Footer.Link>
          <Footer.Link href="#">Link 2</Footer.Link>
          <Footer.Link href="#">Link 3</Footer.Link>
        </Footer.Grid.Column>
        <Footer.Grid.Column title="Title 2" collapsible>
          <Footer.Link href="#">Link 1</Footer.Link>
          <Footer.Link href="#">Link 2</Footer.Link>
          <Footer.Link href="#">Link 3</Footer.Link>
        </Footer.Grid.Column>
      </Footer.Grid>
    </Footer.Top>
    <Footer.Bottom copyright="Copyright text">
      <Footer.Grid>
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
          </Footer.Socials>
        </Footer.Grid.Column>
        <Footer.Grid.Column>
          <Footer.AppStores>
            <Footer.AppStore brand="Apple" />
            <Footer.AppStore brand="Google" />
          </Footer.AppStores>
        </Footer.Grid.Column>
      </Footer.Grid>
      <Footer.Assorted>
        <Footer.Link href="#">Link 1</Footer.Link>
        <Footer.Link href="#">Link 2</Footer.Link>
        <Footer.Link href="#">Link 3</Footer.Link>
      </Footer.Assorted>
    </Footer.Bottom>
  </Footer>
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
    hasSnackbar: {
      description:
        "Enables the `Snackbar` component within the `Main` component.",
      type: "boolean",
    },
    hasStickybar: {
      description:
        "Enables the `Stickybar` component within the `Main` component. Also requires the actual usage of `<StickyBar />`.",
      type: "boolean",
    },
    hasTopNavigation: {
      description:
        'Enables the `TopNavigation` component within the `Main` component. Also requires either the usage of a `<SubscriptionHero />`. Without a `<SubscriptionHero />`, the TopNavigation can be set by configuring `<Main />` with the following property: `topNavigation={{ title: "Heading", action: { left: <></> }}}`.',
      type: "boolean",
    },
    headerComponent: {
      description:
        "Component rendered before a `Section` within the `Main` component. Can be sticky when `hasStickyHeader` is set to `true`.",
      control: false,
    },
    footerComponent: {
      description:
        "Component rendered after all `Section` children within the `Main` component.",
      control: false,
    },
    windowSize: {
      description:
        "The amount of `Section` items that should render before entering viewport. Reducing this number will reduce memory consumption and may improve performance, but will increase the chance that fast scrolling may reveal momentary blank areas of unrendered content.",
    },
    itemSeparator: {
      description:
        "The divider component that renders inbetween `Section` items.",
      control: false,
    },
    mainSeparator: {
      description:
        "The divider component that renders at the beginning and end of the `Main` component.",
      control: false,
    },
    hasStickyHeader: {
      description:
        "Sticks the property value of `headerComponent` to top of the `Main` component.",
    },
  },
  args: {
    children: <MainChildrenMock />,
    hasStickyHeader: true,
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithHeaderAndFooter: Story = {
  args: {
    headerComponent: headerComponentMock,
    footerComponent: footerComponentMock,
  },
};

export const WithHeaderFooterModelAndSnackbarBottom: Story = {
  name: "With Header, Footer, Modal and Snackbar at the bottom",
  args: {
    children: <MainChildrenWithModalAndSnackbarMock />,
    hasSnackbar: true,
    headerComponent: headerComponentMock,
    footerComponent: footerComponentMock,
  },
};

export const WithHeaderFooterModelAndSnackbarTop: Story = {
  name: "With Header, Footer, Modal and Snackbar at the top",
  args: {
    children: <MainChildrenWithModalAndSnackbarMock position="top" />,
    hasSnackbar: true,
    headerComponent: headerComponentMock,
    footerComponent: footerComponentMock,
  },
};
