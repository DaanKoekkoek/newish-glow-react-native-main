module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:testing-library/react",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "testing-library", "jsx-a11y"],
  rules: {
    "no-html-link-for-pages": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "testing-library/no-wait-for-multiple-assertions": "error",
    "testing-library/no-debug": "off",
    "testing-library/prefer-screen-queries": "error",
  },
};
