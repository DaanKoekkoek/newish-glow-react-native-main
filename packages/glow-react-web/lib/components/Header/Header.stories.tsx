import type { Meta, StoryObj } from "@storybook/react";
import { Header, MetaNavItem } from "./index";
import { TextLink } from "components/TextLink";
import {
  Column,
  Grid,
  Heading,
  Main,
  Paragraph,
  Section,
} from "foundations/index";
import { action } from "@storybook/addon-actions";
import { useState } from "react";

// Define the common meta for all stories
const meta: Meta<typeof Header> = {
  title: "DesignSystem/Components/Navigation/Header",
  component: Header,
  // Define the controls (arguments) that should be available in Storybook
  argTypes: {
    metaLinks: {
      description: "Array of meta navigation items",
      control: { type: "object" }, // Assuming object control is suitable
    },
    mainLinks: {
      description: "Main navigation structure with submenu data",
      control: { type: "object" }, // Assuming object control is suitable
    },
    variant: {
      control: { type: "select" },
      options: ["default", "subtle"],
      description: "Visual style of the header",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    layout: {
      control: { type: "select" },
      options: ["default", "alternate"],
      description: "Layout structure of the header",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    AFMbanner: {
      control: "boolean",
      description: "Whether to display AFM banner",
      table: {
        defaultValue: { summary: false },
      },
    },
    helpOptions: {
      description: "Options for help section (phone, link, status)",
      control: { type: "object" },
    },
    onSearch: {
      description: "Handler for search queries",
      action: "onSearch",
    },
    buttonOptions: {
      description: "Options for header buttons customization",
      control: { type: "object" },
    },
    className: {
      control: "text",
      description:
        "Additional class name, applied to the <header> which is the outermost wrapper",
    },
    testID: {
      control: "text",
      description: "Test ID for component testing",
    },
    logoHref: {
      control: "text",
      description: "URL for the logo link",
    },
  },
  // Default args that will be applied to all stories
  args: {
    variant: "default",
    layout: "default",
    AFMbanner: false,
  },
  // Decorator to show the header in a more realistic context
  decorators: [
    (Story) => {
      return (
        <Main header={<Story />}>
          <Section palette="default" variant="subtle">
            <Grid>
              <Column>
                <Heading size="xl" as="h1">
                  Page Title
                </Heading>
                <Paragraph>
                  This is a sample page to show the header in context. The
                  header appears at the top of the page, providing navigation
                  options.
                </Paragraph>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam euismod, nisl eget ultricies ultrices, nunc nisl
                  aliquam nunc, vitae aliquam nisl nunc eu nisl.
                </Paragraph>
              </Column>
            </Grid>
          </Section>
          <Section palette="default" variant="subtle">
            <Grid>
              <Column>
                <Heading size="xl" as="h1">
                  Page Title
                </Heading>
                <Paragraph>
                  This is a sample page to show the header in context. The
                  header appears at the top of the page, providing navigation
                  options.
                </Paragraph>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam euismod, nisl eget ultricies ultrices, nunc nisl
                  aliquam nunc, vitae aliquam nisl nunc eu nisl.
                </Paragraph>
              </Column>
            </Grid>
          </Section>
          <Section palette="default" variant="subtle">
            <Grid>
              <Column>
                <Heading size="xl" as="h1">
                  Page Title
                </Heading>
                <Paragraph>
                  This is a sample page to show the header in context. The
                  header appears at the top of the page, providing navigation
                  options.
                </Paragraph>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam euismod, nisl eget ultricies ultrices, nunc nisl
                  aliquam nunc, vitae aliquam nisl nunc eu nisl.
                </Paragraph>
              </Column>
            </Grid>
          </Section>
        </Main>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// NOTE: Should use BannerCard when it will be available
const createFeaturedContent = (text = "Featured Content Placeholder") => {
  return (
    <div
      style={{
        height: 150,
        width: "100%",
        backgroundColor: "#ECF2FF",
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {text}
    </div>
  );
};

// Restored longer search auto-suggestions list
const SEARCH_AUTO_SUGGESTIONS = [
  {
    text: "Mobile subscription",
    value: "mobile_subscription",
    category: "Products",
  },
  { text: "Mobile phones", value: "mobile_phones", category: "Products" },
  { text: "Internet", value: "internet", category: "Products" },
  { text: "TV", value: "tv", category: "Products" },
  { text: "Help center", value: "help_center", category: "Support" },
  { text: "Contact us", value: "contact_us", category: "Support" },
  { text: "Account login", value: "account_login", category: "Account" },
];

const MAIN_LINKS = [
  {
    title: "Mobiel",
    href: "#",
    submenu: {
      columns: [
        {
          title: "Direct bestellen",
          links: [
            { title: "Sim Only", href: "#" },
            { title: "Telefoons", href: "#" },
            { title: "Sim Only met Toestel", href: "#" },
            { title: "PrePaid", href: "#" },
            { title: "Buitenland", href: "#" },
            { title: "Kids Sim", href: "#" },
            { title: "Odido App", href: "#" },
            { title: "Extra's", href: "#" },
            { title: "Verzekeringen", href: "#" },
            { title: "iPhone 16 Pro", href: "#" },
          ],
        },
        {
          title: "Alles over",
          links: [
            { title: "Nieuw: SimWallet", href: "#" },
            { title: "Verlengen", href: "#" },
            { title: "Overstappen", href: "#" },
            { title: "eSIM", href: "#" },
            { title: "Multisim", href: "#" },
            { title: "Samen Unlimited", href: "#" },
            { title: "Netwerk", href: "#" },
            { title: "Toestel support", href: "#" },
            { title: "Reparatie", href: "#" },
            { title: "Recycle", href: "#" },
            { title: "Accessoires", href: "#" },
          ],
        },
      ],
      featured: [
        createFeaturedContent("Featured Card 1-1"),
        createFeaturedContent("Featured Card 1-2"),
      ],
    },
  },
  {
    title: "Internet + TV",
    href: "#",
    submenu: {
      columns: [
        {
          title: "Generic Column 1",
          links: Array.from({ length: 10 }, (_, i) => ({
            title: `Generic Link 1.${i + 1}`,
            href: "#",
          })),
        },
        {
          title: "Generic Column 2",
          links: Array.from({ length: 8 }, (_, i) => ({
            title: `Generic Link 2.${i + 1}`,
            href: "#",
          })),
        },
      ],
      featured: [
        createFeaturedContent("Featured Card 1-1"),
        createFeaturedContent("Featured Card 1-2"),
      ],
    },
  },
  {
    title: "Voor jou",
    href: "#",
    submenu: {
      columns: [
        {
          title: "Generic Column A",
          links: Array.from({ length: 10 }, (_, i) => ({
            title: `Generic Link A.${i + 1}`,
            href: "#",
          })),
        },
        {
          title: "Generic Column B",
          links: Array.from({ length: 8 }, (_, i) => ({
            title: `Generic Link B.${i + 1}`,
            href: "#",
          })),
        },
      ],
      featured: [
        createFeaturedContent("Featured Card 1-1"),
        createFeaturedContent("Featured Card 1-2"),
      ],
    },
  },
  {
    title: "Daarom Odido",
    href: "#",
    submenu: {
      columns: [
        {
          title: "Generic Column X",
          links: Array.from({ length: 10 }, (_, i) => ({
            title: `Generic Link X.${i + 1}`,
            href: "#",
          })),
        },
        {
          title: "Generic Column Y",
          links: Array.from({ length: 8 }, (_, i) => ({
            title: `Generic Link Y.${i + 1}`,
            href: "#",
          })),
        },
      ],
      featured: [
        createFeaturedContent("Featured Card 1-1"),
        createFeaturedContent("Featured Card 1-2"),
      ],
    },
  },
  {
    title: "Service", // This is the one submenu without the full structure
    href: "/service",
  },
];

/**
 * Default Header with interactive meta navigation
 */
export const Default: Story = {
  render: (args) => {
    const [activeMetaItemIndex, setActiveMetaItemIndex] = useState(0);

    const metaItems: MetaNavItem[] = [
      {
        label: "Consument",
        active: activeMetaItemIndex === 0,
        onClick: () => {
          setActiveMetaItemIndex(0);
          action("metaLinkClicked")("Consument");
        },
      },
      {
        label: "Zakelijk",
        active: activeMetaItemIndex === 1,
        onClick: () => {
          setActiveMetaItemIndex(1);
          action("metaLinkClicked")("Zakelijk");
        },
      },
    ];

    return (
      <Header
        {...args}
        metaLinks={metaItems}
        mainLinks={MAIN_LINKS}
        searchAutoSuggestions={SEARCH_AUTO_SUGGESTIONS}
      />
    );
  },
  args: {
    variant: "default",
    layout: "default",
    AFMbanner: false,
    onSearch: action("onSearch"),
  },
};

/**
 * Subtle variant with help section
 */
export const SubtleVariant: Story = {
  render: (args) => {
    const metaItems: MetaNavItem[] = [
      { label: "Consument", active: true },
      { label: "Zakelijk", active: false },
    ];
    return (
      <Header
        {...args}
        metaLinks={metaItems}
        mainLinks={MAIN_LINKS}
        searchAutoSuggestions={SEARCH_AUTO_SUGGESTIONS}
        helpOptions={{
          phone: "0800-7123",
          link: <TextLink href="#">Hours</TextLink>,
          status: true,
        }}
      />
    );
  },
  args: {
    variant: "subtle",
    layout: "default",
    onSearch: action("onSearch"),
  },
};

/**
 * Alternate Layout with logo on the left
 */
export const LayoutAlternate: Story = {
  render: (args) => {
    const metaItems: MetaNavItem[] = [
      { label: "Consument", active: true },
      { label: "Zakelijk", active: false },
    ];

    return (
      <Header
        {...args}
        metaLinks={metaItems}
        mainLinks={MAIN_LINKS}
        searchAutoSuggestions={SEARCH_AUTO_SUGGESTIONS}
      />
    );
  },
  args: {
    variant: "default",
    layout: "alternate",
    onSearch: action("onSearch"),
  },
};

export const WithLogoLink: Story = {
  render: (args) => {
    const metaItems: MetaNavItem[] = [
      { label: "Consument", active: true },
      { label: "Zakelijk", active: false },
    ];

    return (
      <Header
        {...args}
        metaLinks={metaItems}
        mainLinks={MAIN_LINKS}
        searchAutoSuggestions={SEARCH_AUTO_SUGGESTIONS}
        logoHref="https://www.example.com"
      />
    );
  },
  args: {
    variant: "default",
    layout: "default",
    onSearch: action("onSearch"),
  },
};
