// nextjs preset for consumer project

const path = require("path");
const __mocks__ = (p) => path.resolve(__dirname, "__mocks__", p);

const modules = [
  "react-native",
  "react-native-web",
  "expo-font",
  "expo-linear-gradient",
  "@expo/html-elements",
  "react-native-ui-datepicker",
  "react-native-unistyles",
  "react-native-ui-datepicker",
  // we don't need to transform these modules as they are already mocked
  // "react-native-svg",
  // "react-native-reanimated",
  // "react-native-gesture-handler",

  // odido packages
  "@odido-portals/glow-react-native",
  "@odido-portals/glow-icon",
];

/** @type {import('jest').Config} */
module.exports = {
  globals: {
    __DEV__: false,
  },
  testEnvironment: "jsdom",

  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },

  transformIgnorePatterns: [`node_modules/(?!.pnpm/)(?!${modules.join("|")})`],

  setupFilesAfterEnv: [path.resolve(__dirname, "setup.js")],

  moduleNameMapper: {
    // it is not needed since we are using react-native-web babel plugin but just in case.
    "^react-native$": "react-native-web",

    // static files
    "\\.(gif|jpg|png|ttf|eot|svg)$": __mocks__("file.js"),

    // mock the modules that are not needed to be transformed
    "^react-native-svg$": __mocks__("rn-svg.js"),
    "^react-native-reanimated$": __mocks__("rn-reanimated.js"),
    "^react-native-gesture-handler$": __mocks__("rn-gesture-handler.js"),
  },
};
