import { createContext, useContext } from "react";

import type { SegmentedTabProps } from "./SegmentedTab.types";

export const SegmentedTabContext = createContext<SegmentedTabProps | undefined>(
  undefined,
);

export const useSegmentedTabContext = () => {
  const context = useContext(SegmentedTabContext);

  if (!context) {
    throw new Error(
      "useSegmentedTabContext must be used within a SegmentedTabProvider",
    );
  }
  return context;
};
