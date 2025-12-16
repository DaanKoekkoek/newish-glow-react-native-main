import { Preview, Decorator, StoryContext, StoryFn } from "@storybook/react";
import { ThemeProvider } from "../lib/components/ThemeProvider";

// Odido
import "../lib/assets/odido-fonts.css";
import "../lib/assets/odido-icon-fonts.css";

// Ben
import "../lib/assets/ben-fonts.css";
import "../lib/assets/ben-icon-fonts.css";

// Simpel
import "../lib/assets/simpel-fonts.css";

import { Main, Section, Grid, Column } from "../lib/foundations/index";

const decorators: Decorator[] = [
  (Story: StoryFn, context: StoryContext) => {
    const { theme, brand } = context.globals;
    const selectedBackground = context.globals.backgrounds?.value;

    const wrapInGrid =
      !/(Main|Grid|Section|Navigation|Sticky|Footer|Notify|Visual|Carousel|EmphasizedHero|Navigation|Animation)/.test(
        context.component?.displayName || "",
      );

    const hasCustomBackground =
      selectedBackground && selectedBackground !== "transparent";

    return (
      <ThemeProvider brand={brand} theme={theme}>
        {wrapInGrid ? (
          <Main>
            <Section
              variant={
                hasCustomBackground
                  ? "image"
                  : brand === "sim-wallet"
                    ? "subtle"
                    : undefined
              }
            >
              <Grid>
                <Column>
                  <Story />
                </Column>
              </Grid>
            </Section>
          </Main>
        ) : (
          <Story />
        )}
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  decorators,
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Choose theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        defaultValue: "light",
        items: [
          { value: "light", title: "Light Mode", icon: "sun" },
          { value: "dark", title: "Dark Mode", icon: "moon" },
        ],
        dynamicTitle: true,
        showName: true,
      },
    },
    brand: {
      name: "Brand",
      description: "Choose brand",
      defaultValue: "odido",
      toolbar: {
        icon: "book",
        items: [
          { value: "odido", title: "Odido", icon: "book" },
          { value: "simpel", title: "Simpel", icon: "book" },
          { value: "ben", title: "Ben", icon: "book" },
          { value: "sim-wallet", title: "SimWallet", icon: "book" },
        ],
        dynamicTitle: true,
        showName: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: (a, b) => {
        // Docs first
        if (a.type === "docs" && b.type !== "docs") return -1;
        if (a.type !== "docs" && b.type === "docs") return 1;

        // Playground first
        if (a.name === "Playground" && b.name !== "Playground") return -1;
        if (a.name !== "Playground" && b.name === "Playground") return 1;

        // Variants last
        if (a.name === "Variants") return 1;
        if (b.name === "Variants") return -1;

        // Default alphabetical
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      },
    },
    backgrounds: {
      default: "",
      values: [
        { name: "Light", value: "#ffffff" },
        { name: "Dark", value: "#000000" },
        { name: "Figma-light", value: "#e9e9e9" },
        { name: "Figma-dark", value: "#383838" },
      ],
    },
    status: {
      statuses: {
        uxPassed: {
          background: "#2F9A92",
          color: "#ffffff",
          description: "UX Team checked and approved",
        },
        qaPassed: {
          background: "#8D85FF",
          color: "#ffffff",
          description: "Quality check passed",
        },
        devReviewed: {
          background: "#FF7621",
          color: "#ffffff",
          description: "Developer reviewed",
        },
        SSR: {
          background: "#000000",
          color: "#ffffff",
          description: "Server Side Render friendly",
        },
        CSR: {
          background: "#F3F2FF",
          color: "#000000",
          description: "Client Side Render friendly",
        },
        v1: {
          background: "#000000",
          color: "#ffffff",
          description: "Version 1 of this component",
        },
        v2: {
          background: "#F3F2FF",
          color: "#000000",
          description: "Version 2 of this component",
        },
        v3: {
          background: "#000000",
          color: "#ffffff",
          description: "Version 3 of this component",
        },
        v4: {
          background: "#F3F2FF",
          color: "#000000",
          description: "Version 4 of this component",
        },
      },
    },
  },
};

export default preview;
