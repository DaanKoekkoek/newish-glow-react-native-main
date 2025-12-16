import { createContext, useContext } from "react";

import type { SectionContextProps } from "./Section.types";

export const SectionContext = createContext<SectionContextProps>({
  sectionPalette: "default",
});

export const useSectionContext = () => useContext(SectionContext);
