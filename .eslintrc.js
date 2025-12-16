module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["universe/native"],
  settings: {
    next: {
      rootDir: "packages/glow-react-web/",
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": ["warn"],
    "import/no-cycle": ["error"],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    // let reanimated work without bable on web (since we use swc for storybook web builds), source:
    // https://docs.swmansion.com/react-native-reanimated/docs/2.x/fundamentals/web-support/#eslint-support
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useAnimatedStyle|useDerivedValue|useAnimatedProps)",
      },
    ],
  },
  ignorePatterns: [
    ".storybook",
    ".storybook-rn",
    "!.storybook/main.ts",
    "!.storybook-rn/main.ts",
  ],
};
