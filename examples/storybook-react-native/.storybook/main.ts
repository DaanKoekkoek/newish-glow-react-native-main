const path = require("path");

const useSWC = process.env.SB_MODE === "swc";
console.log({ useSWC });

module.exports = {
  typescript: {
    reactDocgen: "react-docgen-typescript",
    tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
  },
  stories: [
    "../../../packages/react-native/src/components/**/*.mdx",
    "../../../packages/react-native/src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/react-native/src/foundations/**/*.mdx",
    "../../../packages/react-native/src/foundations/**/*.stories.?(ts|tsx|js|jsx)",
    "../../../packages/react-native/src/.examples/**/*.stories.?(ts|tsx|js|jsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: ["@odido-portals/glow-icon"],
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  ...(useSWC
    ? {
        swc: (config, options) => ({
          jsc: {
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        }),
      }
    : {}),
  core: {
    // https://storybook.js.org/docs/7/api/main-config/main-config-core#disablewhatsnewnotifications
    // removes the "What's new" notifications on the web UI.
    disableWhatsNewNotifications: true,
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "_test-utils": path.resolve(
        __dirname,
        "../../../packages/react-native/src/_test-utils/index",
      ),
      "_global-hooks": path.resolve(
        __dirname,
        "../../../packages/react-native/src/_hooks/index",
      ),
      _utility: path.resolve(
        __dirname,
        "../../../packages/react-native/src/_utility/index",
      ),
      _internals: path.resolve(
        __dirname,
        "../../../packages/react-native/src/_internals/",
      ),
      _theming: path.resolve(
        __dirname,
        "../../../packages/react-native/src/_theming/",
      ),
      ".examples": path.resolve(
        __dirname,
        "../../../packages/react-native/src/.examples/",
      ),
      components: path.resolve(
        __dirname,
        "../../../packages/react-native/src/components/",
      ),
      foundations: path.resolve(
        __dirname,
        "../../../packages/react-native/src/foundations/",
      ),
    };

    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
          },
        },
      ],
      include: path.resolve(
        __dirname,
        "../../../packages/react-native/src/components/",
        "../../../packages/react-native/src/foundations/",
      ),
    });

    return config;
  },
};
