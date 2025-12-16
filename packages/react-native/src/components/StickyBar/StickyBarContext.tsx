import React, { createContext, useState, useContext } from "react";

import type { StickyBarProps } from "./StickyBar.types";

interface StickyBarContextProps {
  stickyBarContent: StickyBarProps | null;
  setStickyBarContent: (content: StickyBarProps | null) => void | null;
}

const StickyBarContext = createContext<StickyBarContextProps | undefined>(
  undefined,
);

export const StickyBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stickyBarContent, setStickyBarContent] =
    useState<StickyBarProps | null>(null);

  return (
    <StickyBarContext.Provider
      value={{ stickyBarContent, setStickyBarContent }}
    >
      {children}
    </StickyBarContext.Provider>
  );
};

export const useStickyBarContext = (): StickyBarContextProps => {
  const context = useContext(StickyBarContext);

  if (!context) {
    return {
      stickyBarContent: null,
      setStickyBarContent: () => null,
    };
  }

  return context;
};
