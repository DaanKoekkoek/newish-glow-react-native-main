module.exports = {
  extends: ["../../.eslintrc.js"],
  rules: {
    "no-unused-expressions": ["error", { allowTernary: true }],
    "no-restricted-imports": [
      "error",
      {
        name: "@testing-library/react-native",
        message: `"test-utils" patches "@testing-library/react-native" with a custom renderer, use it instead`,
      },
    ],
  },
};
