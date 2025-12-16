import React, { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "../../../packages/react-native/src/components/ThemeProvider";

import type { Preview, Decorator } from "@storybook/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DecoratorHelpers } from "@storybook/addon-themes";
import { Grid } from "../../../packages/react-native/src/foundations/Grid";
import { Main } from "../../../packages/react-native/src/foundations/Main";
import { Section } from "../../../packages/react-native/src/foundations/Section";

const { useThemeParameters } = DecoratorHelpers;

const themeDecorator = ({ defaultTheme, defaultMode }): Decorator => {
  return (Story, context) => {
    const [selectedBrand, setSelectedBrand] = useState(defaultTheme);
    const [selectedMode, setSelectedMode] = useState(defaultMode);

    const { themeOverride } = useThemeParameters();

    const prevSelectedBrand = useRef(selectedBrand);
    const prevSelectedMode = useRef(selectedMode);

    // Handle brand/theme switching
    useEffect(() => {
      const newBrand = context.globals.theme || themeOverride || defaultTheme;

      if (newBrand !== prevSelectedBrand.current) {
        setSelectedBrand(newBrand);
        prevSelectedBrand.current = newBrand;
      }
    }, [context.globals.theme, themeOverride, defaultTheme]);

    // Handle mode (light/dark) switching
    useEffect(() => {
      // Don't switch mode for the Switch brand
      if (selectedBrand === "switch") {
        return;
      }
      const mode = context.globals.mode || defaultMode;

      if (mode !== prevSelectedMode.current) {
        setSelectedMode(mode);
        prevSelectedMode.current = mode;
      }
    }, [context.globals.mode, defaultMode, selectedBrand]);

    const wrapInGrid =
      !context.tags?.includes("no-grid") &&
      !/(Main|Grid|Section|Navigation|Sticky|Footer|.*Screen|Notify)/.test(
        context.component?.displayName || "",
      );

    // Ensure that the ThemeProvider only re-renders when necessary
    return (
      <SafeAreaProvider>
        <ThemeProvider
          dynamic={true}
          brand={selectedBrand}
          theme={selectedMode}
        >
          {wrapInGrid ? (
            <Main>
              <Section>
                <Grid>
                  <Grid.Column>
                    <Story />
                  </Grid.Column>
                </Grid>
              </Section>
            </Main>
          ) : (
            <Story />
          )}
        </ThemeProvider>
      </SafeAreaProvider>
    );
  };
};

const preview: Preview = {
  decorators: [
    themeDecorator({
      defaultTheme: "odido",
      defaultMode: "light",
    }),
  ],
  parameters: {
    options: {
      storySort: (a, b) => {
        // Sort Docs page first
        if (a.type === "docs" && b.type !== "docs") {
          return -1;
        }
        if (a.type !== "docs" && b.type === "docs") {
          return 1;
        }
        return a.id.localeCompare(b.id, undefined, { numeric: true });
      },
    },
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "white" },
        { name: "black", value: "black" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    mode: {
      name: "Theme Mode",
      description: "Global theme mode for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light Mode", icon: "sun" },
          { value: "dark", title: "Dark Mode", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      name: "Brand",
      description: "Global brand for components",
      defaultValue: "odido",
      toolbar: {
        icon: "paintbrush",
        title: "Odido",
        items: [
          { value: "odido", title: "Odido", icon: "paintbrush" },
          { value: "simpel", title: "Simpel", icon: "paintbrush" },
          { value: "ben", title: "Ben", icon: "paintbrush" },
          { value: "switch", title: "Switch", icon: "paintbrush" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
