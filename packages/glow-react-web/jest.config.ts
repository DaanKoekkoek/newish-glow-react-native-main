import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
  /* Here we are telling Jest to mock all the files that might end with .gif, .ttf, .eot, .svg, .png, and .css
  extensions. */
  roots: ["<rootDir>/lib"],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|png|webp|jpg)$": "<rootDir>/src/__mocks__/fileMock.ts",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(mp4|webm|svg)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.js",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[jt]sx?$": ["@swc/jest"],
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/lib/**/*.{ts,tsx,js,jsx}", // Include all component files inside ./lib
    "!<rootDir>/lib/**/*.{stories.tsx,index.ts,d.ts,types.ts}", // exclude all redundant files inside ./lib
    "!<rootDir>/lib/main.ts", // exclude all redundant files inside ./lib
    "!<rootDir>/lib/**/index.{ts,tsx}", // Exclude index.ts files from coverage
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
