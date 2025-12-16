import { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: [
    "../../../packages/react-native/src/components/**/*.stories.?(ts|tsx|js|jsx)",
    "../../../packages/react-native/src/foundations/**/*.stories.?(ts|tsx|js|jsx)",
  ],
  addons: [
    "@storybook/addon-ondevice-notes",
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-backgrounds",
    "@storybook/addon-ondevice-actions",
  ],
};

export default main;
