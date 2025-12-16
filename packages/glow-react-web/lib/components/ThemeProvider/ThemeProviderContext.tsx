import { createContext, useContext } from "react";
import type { ThemeContextProps } from "./ThemeProvider.types";

export const ThemeContext = createContext<ThemeContextProps>({
  brand: "odido",
  theme: "light",
});

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);
