import React from "react";
import { ThemeProvider } from "../../../packages/react-native/src/components/ThemeProvider";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const preview: Preview = {
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider brand="odido" theme="light">
            <Story />
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ),
    withBackgrounds,
  ],
  parameters: {
    backgrounds: {
      default: "white",
      values: ["white", "black"],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
  },
};

export default preview;
