module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-transform-export-namespace-from",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            _theming: "./src/_theming",
            _utility: "./src/_utility",
            "_test-utils": "./src/_test-utils",
            "_global-hooks": "./src/_hooks",
            _internals: "./src/_internals",
            ".examples": "./src/.examples",
            components: "./src/components",
            foundations: "./src/foundations",
          },
        },
      ],
    ],
  };
};
