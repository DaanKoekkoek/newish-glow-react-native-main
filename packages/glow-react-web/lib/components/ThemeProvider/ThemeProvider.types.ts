import type { ReactNode } from "react";

export type Theme = "light" | "dark";
export type BrandName = "odido" | "ben" | "simpel" | "sim-wallet";

/**
 * Represents the theme provider props
 * @type {(
 * { brand: "odido"; theme?: Theme; children: ReactNode }
 * | { brand: "simpel"; theme?: Theme; children: ReactNode }
 * | { brand: "ben"; theme?: Theme; children: ReactNode }
 * | { brand: "sim-wallet"; children: ReactNode.ReactNode }
 * )}
 */
export type ThemeProviderProps =
  | { brand: "odido"; theme?: Theme; children: ReactNode }
  | { brand: "ben"; theme?: Theme; children: ReactNode }
  | { brand: "simpel"; theme?: Theme; children: ReactNode }
  | { brand: "sim-wallet"; children: ReactNode };

/**
 * Represents the ThemeContext provider props
 * @type ThemeContextProps
 * @property {BrandName} brand - Current selected brand.
 * @property {Theme} [theme] - The dark / light mode theme for each brand.
 */
export type ThemeContextProps = {
  brand: BrandName;
  theme?: Theme;
};
