import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "react-native-safe-area-context": "<rootDir>/__mocks__/safeAreaProvider.js",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  preset: "jest-expo",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transformIgnorePatterns: [
    "node_modules/.pnpm/(?!((jest-)?react-native|(?!@expo/html-elements)|(?!Gradient)|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/*.stories.tsx",
    "!**/*.mdx",
    "!**/*.test.tsx",
    "!**/*.styles.{ts,tsx}",
    "!**/*.style.{ts,tsx}",
    "!**/*.types.ts",
    "!src/foundations/Addon/icons/**",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json-summary",
    "lcov",
    "text",
    ["text", { file: "coverage.txt" }],
  ],
  reporters: ["default", ["jest-junit", { outputDirectory: "./coverage" }]],
};
