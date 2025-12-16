/* This file is patching "@testing-library/react-native", to that end we have
added an eslint rule that throws an error if anyone erroneously imports
"@testing-library/react-native" instead of "test-utils" */
/* eslint-disable no-restricted-imports */
import type { RenderOptions } from "@testing-library/react-native";
import { render as rtlRender } from "@testing-library/react-native";
import { ThemeProvider } from "components/index";
import React, { Component } from "react";
import { View, Text } from "react-native";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    // Update state to indicate an error has occurred
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Log the error to the console
    console.error("Error caught by ErrorBoundary:", error);
  }

  render() {
    if (this.state.hasError) {
      // Render the error message if an error occurs
      return (
        <View>
          <Text>Something went wrong:</Text>
          <Text>{this.state.error?.message}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider brand="odido">
    <ErrorBoundary>{children}</ErrorBoundary>
  </ThemeProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

jest.mock("expo-font", () => ({
  useFonts: () => [true],
}));

// Re-export everything from @testing-library/react-native
export * from "@testing-library/react-native";

// Override render method
export { customRender as render };
