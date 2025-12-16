import { createContext, useContext } from "react";

export const FooterContext = createContext<{
  atom?: "assorted" | "default";
  molecule?: "breadcrumbs" | "default";
  justify?: boolean;
}>({
  atom: "default",
  molecule: "default",
  justify: false,
});

export const useFooterContext = () => useContext(FooterContext);
