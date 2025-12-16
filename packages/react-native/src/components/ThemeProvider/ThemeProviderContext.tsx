import { createContext } from "react";

import type { BrandContextProps } from "./ThemeProvider.types";

export const BrandContext = createContext<BrandContextProps>({
  fontLoaded: false,
  brand: "odido",
  theme: "light",
});
