import { type AutoSuggestion } from "@odido-portals/glow-react-web/input-field";

import nextConfig from "../../next.config.mjs";

const url = (path: string) => nextConfig.publicRuntimeConfig.basePath + path;

export const routes = [
  {
    title: "Components",
    label: "Components",
    href: "/components",
    description: "Contains design system components",
    groups: [
      {
        title: "SSR-friendly components",
        href: "/components/ssr",
        key: "ssr",
        sublinks: [
          { label: "Addon", href: "/components/ssr/addon" },
          { label: "Badge", href: "/components/ssr/badge" },
          { label: "Box", href: "/components/ssr/box" },
          { label: "Button (with href)", href: "/components/ssr/button" },
          { label: "Callout", href: "/components/ssr/callout" },
          { label: "DefaultList", href: "/components/ssr/default-list" },
          { label: "Display", href: "/components/ssr/display" },
          { label: "Divider", href: "/components/ssr/divider" },
          { label: "EmphasizedHero", href: "/components/ssr/emphasized-hero" },
          {
            label: "EmphasizedHeroSection",
            href: "/components/ssr/emphasized-hero-section",
          },
          { label: "Column", href: "/components/ssr/column" },
          { label: "Grid", href: "/components/ssr/grid" },
          { label: "Heading", href: "/components/ssr/heading" },
          { label: "Hero", href: "/components/ssr/hero" },
          { label: "HeroSection", href: "/components/ssr/hero-section" },
          { label: "HorizontalCard", href: "/components/ssr/horizontal-card" },
          { label: "Icon", href: "/components/ssr/icon" },
          { label: "GlowIcon", href: "/components/ssr/glow-icon" },
          { label: "Logos", href: "/components/ssr/logos" },
          { label: "MySection", href: "/components/ssr/my-section" },
          { label: "MySectionGrid", href: "/components/ssr/my-section-grid" },
          { label: "Paragraph", href: "/components/ssr/paragraph" },
          { label: "Price", href: "/components/ssr/price" },
          { label: "Section", href: "/components/ssr/section" },
          {
            label: "SegmentedTabPanels",
            href: "/components/ssr/segmented-tab-panels",
          },
          { label: "ShopSection", href: "/components/ssr/shop-section" },
          { label: "Stack", href: "/components/ssr/stack" },
          {
            label: "StepperHorizontal",
            href: "/components/ssr/stepper-horizontal",
          },
          { label: "StepperInpage", href: "/components/ssr/stepper-inpage" },
          { label: "Strong", href: "/components/ssr/strong" },
          { label: "TextLink", href: "/components/ssr/text-link" },
        ],
      },
      {
        title: "Client Components",
        href: "/components/client",
        key: "client",
        sublinks: [
          { label: "Carousel", href: "/components/client/carousel" },
          {
            label: "Snackbar",
            href: "/components/client/snackbar",
          },
          { label: "Select", href: "/components/client/select" },
          { label: "Selector", href: "/components/client/selector" },
          { label: "SelectorImage", href: "/components/client/selector-image" },
          { label: "SelectorLight", href: "/components/client/selector-light" },
          { label: "Tooltip", href: "/components/client/tooltip" },
          {
            label: "SegmentedTabButtons",
            href: "/components/client/segmented-tab-buttons",
          },
          {
            label: "StepperVertical",
            href: "/components/client/stepper-vertical",
          },
          { label: "Modal", href: "/components/client/modal" },
          { label: "Toggle", href: "/components/client/toggle" },
          {
            label: "InputFieldDatePicker",
            href: "/components/client/input-field-date-picker",
          },
          { label: "Checkbox", href: "/components/client/checkbox" },
          { label: "Counter", href: "/components/client/counter" },
          { label: "DotNav", href: "/components/client/dot-nav" },
        ],
      },
    ],
  },
  {
    title: "Shop",
    label: "Shop",
    href: "/shop",
    description: "Contains shop pages",
    sublinks: [
      { title: "Shop PLP", label: "Shop PLP", href: "/shop/plp" },
      { title: "Shop PDP", label: "Shop PDP", href: "/shop/pdp" },
      {
        title: "Shop Checkout",
        label: "Shop Checkout",
        href: "/shop/checkout/winkelwagen",
      },
    ],
  },
  {
    title: "My",
    label: "My",
    href: "/my",
    description: "Contains my pages",
    sublinks: [{ title: "My login", label: "My login", href: "/my/login" }],
  },
].map((item, index) => ({
  ...item,
  groups: item.groups?.map((group) => ({
    ...group,
    sublinks: group.sublinks
      ?.slice()
      .sort((a, b) => a.label.localeCompare(b.label)),
  })),
  id: index + 1,
  href: url(item.href),
}));

export const categorizeAutosuggestExamples = ({
  value,
  onChange,
  onSelect,
  onSearchClose,
  open,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (item: AutoSuggestion) => void;
  onSearchClose?: () => void;
  open?: boolean;
}) => {
  const autoSuggestions = routes.flatMap((route) => {
    if (route.href.includes("/shop") || route.href.includes("/my")) {
      return {
        category: route.href.includes("/shop") ? "Shop" : "My",
        text: route.label ?? route.title ?? "Untitled",
        value: route.href,
      };
    }

    if (route.href === "/components") {
      return (route.groups ?? [])
        .filter((g) => g.key === "ssr" || g.key === "client")
        .flatMap(
          (g) =>
            g.sublinks?.map((sublink) => ({
              category: `Component (${g.key})`,
              text: sublink.label,
              value: sublink.href,
            })) ?? [],
        );
    }

    return {
      category: "General",
      text: route.label ?? route.title ?? "Untitled",
      open,
      onSearchClose,
      value: route.href,
    };
  });

  return {
    id: "main-nav-search",
    placeholder: "Search pages...",
    value,
    open,
    autoSuggestions,
    onChange,
    onSearchClose,
    onSuggestionSelect: onSelect,
  };
};
