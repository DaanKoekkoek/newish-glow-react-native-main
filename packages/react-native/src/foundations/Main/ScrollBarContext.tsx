import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

interface ScrollBarContextType {
  scrollBarWidth: number | null;
  setScrollBarWidth: (newValue: number) => void;
}

const ScrollBarContext = createContext<ScrollBarContextType | undefined>(
  undefined,
);

export const ScrollBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [scrollBarWidth, setScrollBarWidth] = useState<number>(0);

  return (
    <ScrollBarContext.Provider value={{ scrollBarWidth, setScrollBarWidth }}>
      {children}
    </ScrollBarContext.Provider>
  );
};

export const useScrollBarContext = (): ScrollBarContextType => {
  const context = useContext(ScrollBarContext);

  if (context === undefined) {
    return {
      scrollBarWidth: null,
      setScrollBarWidth: () => null,
    };
  }

  return context;
};
