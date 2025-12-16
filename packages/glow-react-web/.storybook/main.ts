import { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
import sass from "sass";

/**
 * This function resolves the absolute path of a package.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

/**
 * Returns story paths for Storybook.
 * - Includes `_internals` only in development mode.
 */
function getStoryPatterns(): string[] {
  const basePatterns = [
    "../lib/@(components|foundations|utilities)/**/*.mdx",
    "../lib/@(components|foundations|utilities)/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ];

  const includeInternals =
    process.env.NODE_ENV === "development" ||
    process.env.SHOW_INTERNAL_STORIES === "true";

  return includeInternals
    ? [
        ...basePatterns,
        "../lib/_internals/**/*.mdx",
        "../lib/_internals/**/*.stories.@(js|jsx|mjs|ts|tsx)",
      ]
    : basePatterns;
}

const config: StorybookConfig = {
  stories: ["../lib/docs/**/*.@(ts|tsx|mdx)", ...getStoryPatterns()],
  staticDirs: ["../public"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@etchteam/storybook-addon-status"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config, { configType }) => {
    config.css = {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    };

    if (configType === "PRODUCTION") {
      config.base = process.env.STORYBOOK_BASE_PATH || "./";
    }
    return config;
  },
};

export default config;
