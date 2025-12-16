import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { MainNavigation } from "./MainNavigation";
import type { MainNavigationProps } from "./MainNavigation.types";
import IMAGES from "foundations/Image/Image.mock";
import { Section } from "foundations/Section";
import { Column, Grid } from "foundations/Grid";
import { Button, useTheme } from "..";
import {
  createDuplicatedComplexControl,
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";
import mock from "./MainNavigation.mock";
import { Placeholder } from "components/Modal/Placeholder";
import { Main } from "foundations/Main";
import { Paragraph } from "foundations/Paragraph";

const skipOptions: ComplexOption<MainNavigationProps["skip"]>[] = [
  {
    label: "No skip link",
    value: undefined,
  },
  {
    label: "Basic skip link",
    value: {
      label: "Skip to content",
      href: "#main-content",
    },
  },
];

const logoOptions: ComplexOption<MainNavigationProps["logo"]>[] = [
  {
    label: "Theme",
    value: undefined,
  },
  {
    label: "Animated",
    value: {
      brand: "odido",
      videoSrc: mock.VIDEOS["glow"],
    },
  },
];

const agentBarOptions: ComplexOption<MainNavigationProps["agentBar"]>[] = [
  {
    label: "No agent bar",
    value: undefined,
  },
  {
    label: "Agent bar",
    value: {
      appointmentLink: { href: "#", label: "Terugbelafspraak" },
      logoutLink: { href: "#", label: "Uitloggen" },
      telesalesLink: { href: "#", label: "Telesales" },
      userId: "ID017517",
      agentId: { extension: "Inbound Renewal Care", label: "[99505]" },
    },
  },
];

const statusOptions: ComplexOption<MainNavigationProps["status"]>[] = [
  {
    label: "Success status",
    value: {
      type: "success",
      statusText: "Service",
    },
  },
  {
    label: "Warning status",
    value: {
      type: "warning",
      statusText: "Service",
    },
  },
  {
    label: "Error status",
    value: {
      type: "error",
      statusText: "Service",
    },
  },
];

const metaLinksOptions: ComplexOption<MainNavigationProps["metaLinks"]>[] = [
  {
    label: "Consumer",
    value: [
      { href: "#", label: "Consumer", active: true },
      { href: "#", label: "Business" },
    ],
  },
  {
    label: "Business",
    value: [
      { href: "#", label: "Consumer" },
      { href: "#", label: "Business", active: true },
    ],
  },
];

const cartOptions: ComplexOption<MainNavigationProps["cart"]>[] = [
  {
    label: "Empty cart",
    value: {
      panel: {
        type: "empty",
        callToAction: {
          children: "Naar winkelwagen",
          href: "#",
          as: "a",
        },
        emptyTitle: "Je winkelwagen is leeg",
        footer: "default",
      },
      link: { href: "#" },
    },
  },
  {
    label: "Cart with items",
    value: {
      panel: {
        type: "withItems",
        callToAction: {
          children: "Naar winkelwagen",
          href: "#",
          as: "a",
        },
        items: [
          {
            image: { src: IMAGES["phone"], alt: "Product 1" },
            title: "Smartphone X",
            description: "High-end phone",
          },
          {
            image: { src: IMAGES["phone"], alt: "Product 2" },
            title: "Smartphone Y",
            description: "Lightweight phone",
          },
        ],
        total: {
          totalOneTime: { label: "Totaal eenmalig", value: "123" },
          totalPerMonth: { label: "Totaal per maand", value: "69" },
        },
      },
      link: { href: "#", badge: { count: 2 } },
    },
  },
];

const userOptions: ComplexOption<MainNavigationProps["user"]>[] = [
  {
    label: "No user link",
    value: undefined,
  },
  {
    label: "User link only",
    value: {
      link: { href: "#", title: "User" },
    },
  },
  {
    label: "User with panel",
    value: {
      link: { href: "#", title: "User" },
      panel: {
        children: <Placeholder />,
        callToAction: {
          children: "Button text",
          onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
            action("user.panel.callToAction.onClick")(e),
        },
      },
    },
  },
  {
    label: "User with initials and link",
    value: {
      link: {
        href: "#",
        title: "user",
        initials: "BP",
      },
    },
  },
  {
    label: "User with initials and panel",
    value: {
      link: {
        href: "#",
        title: "user",
        initials: "BP",
      },
      panel: {
        children: <Placeholder />,
        callToAction: {
          children: "Button text",
          onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
            action("user.panel.callToAction.onClick")(e),
        },
      },
    },
  },
];

const navigationTreeControl = createDuplicatedComplexControl(
  5, // number of top-level options
  (optionIndex) => [1, 2, 3, 4, 5][optionIndex], // how many branches per option
  (optionIndex, itemIndex) => {
    // For each branch, generate unique labels.
    const baseId = optionIndex * 10 + itemIndex + 1;

    const childCount = 2 + optionIndex; // grows per option
    const items = Array.from({ length: childCount }, (_, i) =>
      mock.nestedItem(
        `Category ${i + 1}`,
        [
          mock.leafItem("Sub 1", "#"),
          mock.leafItem("Sub 2", "#"),
          mock.leafItem("Sub 3", "#"),
        ],
        "#",
      ),
    );

    const promoCount = itemIndex < 3 ? itemIndex : 0; // 0, 1, 2 promos
    const promos =
      promoCount > 0
        ? Array.from({ length: promoCount }, (_, p) =>
            mock.promotion(
              `Title ${p + 1}`,
              p === 0
                ? "Palette set in promotions"
                : "Palette set in main navigation",
              p === 0 ? "orange" : undefined,
            ),
          )
        : undefined;

    return mock.branch(
      baseId,
      `Branch ${baseId}`,
      items,
      promos,
      itemIndex % 2 === 1 ? "#" : undefined,
    );
  },
  "select",
);

const meta: Meta<typeof MainNavigation> = {
  title: "DesignSystem/Components/Navigation/MainNavigation",
  component: MainNavigation,
  argTypes: {
    navigationTree: {
      ...navigationTreeControl.control,
      description:
        "Defines the hierarchical structure of the navigation, including top-level categories and nested items.",
    },
    variant: {
      description: `
Determines the visual and functional presentation of the navigation:

- **default** – Displays the full navigation experience with menus, search, and user controls.
- **subtle** – A minimal variant that hides most navigation features, typically used on pages where you want to maintain brand consistency without providing full navigation (e.g., checkout or login pages).
`,
      options: ["default", "subtle"],
    },
    layout: {
      description: `
Determines the layout of the content within the main navigation bar

- **default** – Displays the logo in the middle of the navigation bar. 
- **alternate** – Displays the logo to the left of the navigation bar.
`,
      options: ["default", "alternate"],
    },
    afmBanner: {
      description:
        "Displays the AFM banner (for compliance or legal messaging) at the top of the navigation when enabled.",
      control: "boolean",
    },
    agentBar: {
      ...createComplexControl(agentBarOptions),
      description:
        "Renders an agent bar above the main navigation. Accepts `AgentBarProps`.",
    },
    skip: {
      ...createComplexControl(skipOptions),
      description:
        "Provides a skip link for accessibility, allowing users to jump directly to the main content.",
    },
    logo: {
      ...createComplexControl(logoOptions),
      description:
        "Configuration for the brand logo, including href link, title, and optional `brand` identifier.",
    },
    palette: {
      description:
        "Sets the color palette variant for the navigation, based on `OdidoPalette` tokens.",
    },
    metaLinks: {
      ...createComplexControl(metaLinksOptions),
      description:
        "Top-level meta links displayed above the main navigation, typically for switching between audiences (e.g. Consumer / Business).",
    },
    cart: {
      ...createComplexControl(cartOptions),
      description:
        "Configuration for the shopping cart icon, dropdown panel, and related links.",
    },
    user: {
      ...createComplexControl(userOptions),
      description:
        "User navigation entry with link and optional dropdown for account-related actions.",
    },
    status: {
      ...createComplexControl(statusOptions),
      description:
        "Optional service status indicator shown in the navigation, using the `Status` component. Only visible when `variant` is set to `subtle`.",
    },
    customerService: {
      description:
        "Displays a customer service shortcut with an icon and link to the helpdesk or support page.",
    },
    search: {
      description: `
Search configuration for the navigation, including:
- Placeholder text
- Value handling
- Autosuggestion options

Accepts all props of \`InputFieldAutosuggestion\`.

Additional props:
- \`open\` (boolean): Controls the open/closed state of the search input field.
- \`onSearchClose\` (function): Callback fired when the search panel is closed, useful for cleanup tasks like clearing the input value.
  `,
    },
    ariaLabel: {
      description:
        "Provides ARIA labels for accessibility, describing actions like opening/closing the menu or search, and identifying elements such as the backdrop.",
    },
    routeKey: {
      description:
        "Forces the navigation state to fully reset when this value changes (e.g., on route change). Useful when persistent layouts keep components mounted across pages.",
    },
  },
  args: {
    agentBar: agentBarOptions[0].value,
    metaLinks: metaLinksOptions[1].value,
    ariaLabel: {
      menu: {
        open: "Open menu",
        close: "Sluit menu",
        return: "Keer terug",
      },
      search: {
        open: "Zoeken",
        close: "Sluit zoeken",
      },
      backdrop: "Sluit menu",
      service: "Neem contact op met service",
    },
    navigationTree: navigationTreeControl.options[2].value,
    logo: {
      ...logoOptions[0].value,
      title: "Keer terug naar homepagina",
      href: "#",
    },
    search: {
      id: "search-id",
      placeholder: "Zoeken...",
      category: { children: "Zoeken naar" },
      title: "Zoeken",
      autoSuggestions: [
        {
          text: "Suggestion 1.1",
          value: "suggestion-1.1",
        },
        {
          text: "Suggestion 1.2",
          value: "suggestion-1.2",
        },
        {
          text: "Suggestion 2.1",
          value: "suggestion-2.1",
        },
        {
          text: "Suggestion 2.2",
          value: "suggestion-2.2",
        },
      ],
    },
    afmBanner: false,
    sticky: false,
    cart: cartOptions[0].value,
    user: userOptions[1].value,
    skip: skipOptions[1].value,
    status: statusOptions[0].value,
    customerService: {
      href: "#",
      icon: "helpdesk",
      phoneNumber: "0800-7123",
      openingHours: {
        label: "Openingstijden",
        href: "#",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.search?.value);
    const { brand } = useTheme();
    return (
      <Main
        header={
          <MainNavigation
            {...args}
            logo={{
              ...args.logo,
              brand: args.logo?.brand ?? brand,
            }}
            search={{
              id: "search-id",
              ...args.search,
              autoSuggestions: [],
              placeholder: args.search?.placeholder,
              value,
              onSearchClose: () => {
                setValue("");
              },
              onChange: (e) => setValue(e.target.value),
              onSuggestionSelect: (item) => {
                setValue(item.text);
                action("search.onSuggestionSelect")(item);
              },
            }}
          />
        }
      >
        <Section variant="subtle">
          <Grid>
            <Column>
              <Button href="#" as="a" id="main-content">
                Skiplink anchor
              </Button>
            </Column>
          </Grid>
        </Section>
      </Main>
    );
  },
};

export const WithSearch: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.search?.value);
    const { brand } = useTheme();

    return (
      <Main
        header={
          <MainNavigation
            {...args}
            logo={{
              ...args.logo,
              brand: args.logo?.brand ?? brand,
            }}
            search={{
              id: "search-id",
              autoSuggestions: [],
              ...args.search,
              placeholder: 'Look for "suggestion" for results',
              value,
              onSearchClose: () => {
                setValue("");
                action("search.onSearchClose")();
              },
              onChange: (e) => setValue(e.target.value),
              onSuggestionSelect: (item) => {
                setValue(item.text);
                action("search.onSuggestionSelect")(item);
              },
            }}
          />
        }
      >
        <Section variant="subtle">
          <Grid>
            <Column>
              <Button href="#" as="a" id="main-content">
                Skiplink anchor
              </Button>
            </Column>
          </Grid>
        </Section>
      </Main>
    );
  },
};

export const WithStickyAndSearch: Story = {
  args: {
    sticky: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.search?.value);
    const { brand } = useTheme();

    const repeatedSections = Array.from({ length: 10 }).map((_, i) => (
      <Section key={i} variant="subtle">
        <Grid>
          <Column>
            {i === 0 ? (
              <Button as="a" href="#" id="main-content">
                Skiplink anchor
              </Button>
            ) : (
              <Paragraph>Other section</Paragraph>
            )}
          </Column>
        </Grid>
      </Section>
    ));

    return (
      <Main
        header={
          <MainNavigation
            {...args}
            logo={{
              ...args.logo,
              brand: args.logo?.brand ?? brand,
            }}
            search={{
              id: "search-id",
              autoSuggestions: [],
              ...args.search,
              placeholder: 'Look for "suggestion" for results',
              value,
              onSearchClose: () => {
                setValue("");
                action("search.onSearchClose")();
              },
              onChange: (e) => setValue(e.target.value),
              onSuggestionSelect: (item) => {
                setValue(item.text);
                action("search.onSuggestionSelect")(item);
              },
            }}
          />
        }
      >
        {repeatedSections}
      </Main>
    );
  },
};
