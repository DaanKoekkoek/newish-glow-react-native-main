import { StickyBarProvider } from "components/StickyBar/StickyBarContext";
import { TopNavigationProvider } from "components/TopNavigation/TopNavigationContext";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import type { MainProvidersProps } from "./Main.types";
import { ScrollBarProvider } from "./ScrollBarContext";

export const MainProviders = ({
  hasStickybar = false,
  hasSnackbar = false,
  hasTopNavigation = false,
  children,
}: MainProvidersProps) => {
  const stickybarContent = hasStickybar ? (
    <ScrollBarProvider>
      <StickyBarProvider>{children}</StickyBarProvider>
    </ScrollBarProvider>
  ) : (
    children
  );

  const topNavigationContent = hasTopNavigation ? (
    <TopNavigationProvider>{stickybarContent}</TopNavigationProvider>
  ) : (
    <>{stickybarContent}</>
  );

  return hasSnackbar ? (
    <GestureHandlerRootView style={{ overflow: "hidden" }}>
      {topNavigationContent}
    </GestureHandlerRootView>
  ) : (
    <>{topNavigationContent}</>
  );
};
