import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Footer } from "./Footer";
import type { FooterProps } from "./Footer.types";
import { Icon } from "foundations/Icon";
import { Grid, Column } from "foundations/Grid";
import { Main } from "foundations/Main";
import { Paragraph } from "foundations/Paragraph";
import { Section } from "foundations/Section";
import { StoreButton } from "foundations/StoreButton";

const meta: Meta<FooterProps> = {
  title: "DesignSystem/Components/Navigation/Footer",
  component: Footer,
  argTypes: {
    brand: {
      description: "Apply brand-specific styling to the footer.",
    },
    columnLinks: {
      control: "array",
      description:
        "Accepts an array of objects with a `title` for the column title and a `links` array of objects with a `title` for the link text and an optional `href` for the link URL.",
    },
    socialLinks: {
      control: "array",
      description:
        "Accepts an array of objects with an `icon` for the social icon and a `href` for the link URL.",
    },
    assortedLinks: {
      control: "array",
      description:
        "Accepts an array of objects with a `title` for the link text and an optional `href` for the link URL.",
    },
    copyright: {
      control: "text",
      description: "The text to display as the copyright of the Footer.",
    },
    storeLinks: {
      control: "array",
      description:
        "Accepts an array of objects with an `icon` for the store icon and a `href` for the link URL.",
    },
    testID: {
      control: "text",
      description:
        "The test ID will be applied to the root element if provided and used for testing purposes.",
    },
  },
  args: {
    columnLinks: [
      {
        title: "Column title 1",
        links: [
          {
            title: "Column link (onClick)",
            onClick: action("columnLinks.link.onClick"),
          },
          { title: "Column link", href: "#" },
          { title: "Column link extra text", href: "#" },
        ],
      },
      {
        title: "Column title 2",
        links: [
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
        ],
      },
      {
        title: "Column title 3",
        links: [
          { title: "Column link", href: "#" },
          { title: "Column link extra long text", href: "#" },
          { title: "Column link", href: "#" },
        ],
      },
      {
        title: "Column title 4",
        links: [
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
        ],
      },
      {
        title: "Column title 5",
        links: [
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
          { title: "Column link", href: "#" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: <Icon name="x" size="md" />,
        onClick: action("socialLinks.link.onClick"),
        ariaLabel: "X (onClick)",
      },
      { icon: <Icon name="facebook" size="md" solid />, href: "#" },
      { icon: <Icon name="linkedin" size="md" solid />, href: "#" },
      { icon: <Icon name="chat" size="md" solid />, href: "#" },
    ],
    storeLinks: [
      {
        icon: <StoreButton brand="Apple" inverted />,
        onClick: action("storeLinks.link.onClick"),
      },
      {
        icon: <StoreButton brand="Google" inverted />,
        href: "#",
      },
    ],
    assortedLinks: [
      {
        title: "Assorted link 1 (onClick)",
        onClick: action("assortedLinks.link.onClick"),
      },
      { title: "Assorted link 2", href: "#" },
      { title: "Assorted link 3", href: "#" },
      { title: "Assorted link 4", href: "#" },
      { title: "Assorted link 5", href: "#" },
      { title: "Assorted link 6", href: "#" },
      { title: "Assorted link 7", href: "#" },
      { title: "Assorted link 8", href: "#" },
      { title: "Assorted link 9", href: "#" },
      { title: "Assorted link 10", href: "#" },
    ],
    copyright: "© Odido. Alle rechten voorbehouden",
  },
  decorators: [
    (Story) => (
      <Main footer={<Story />}>
        <Section>
          <Grid>
            <Column>
              <Paragraph>Paragraph 1</Paragraph>
            </Column>
          </Grid>
        </Section>
      </Main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
