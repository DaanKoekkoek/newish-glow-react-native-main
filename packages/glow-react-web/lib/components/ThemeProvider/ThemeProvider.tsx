import { useEffect } from "react";
import { ThemeProviderProps } from "./ThemeProvider.types";
import { ThemeContext } from "./ThemeProviderContext";

const DATA_THEME_ATTRIBUTE = "data-theme";

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, brand } = props;
  const theme = brand === "sim-wallet" ? undefined : (props.theme ?? "light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute(
        DATA_THEME_ATTRIBUTE,
        brand === "sim-wallet" ? brand : `${brand}-${theme}`,
      );
    }
  }, [theme, brand]);

  return (
    <ThemeContext.Provider value={{ brand, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
