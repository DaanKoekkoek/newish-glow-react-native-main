import type { ReactNode } from "react";

export type Theme = "light" | "dark";
export type BrandName = "odido" | "ben" | "simpel" | "switch";

/**
 * Represents the theme provider props
 * @type {({ brand: "odido"; theme?: Theme; children: ReactNode } | { brand: "simpel"; theme?: Theme; children: ReactNode }  | { brand: "ben"; theme?: Theme; children: ReactNode } | { brand: "switch"; theme?: Theme; children: ReactNode })}
 * @property {boolean} [dynamic='false'] - Passes every available font from all brands into Expo's useFont to make dynamic changes available.
 */
export type ThemeProviderProps = (
  | { brand: "odido"; theme?: Theme; children: ReactNode }
  | { brand: "ben"; theme?: Theme; children: ReactNode }
  | { brand: "simpel"; theme?: Theme; children: ReactNode }
  | { brand: "switch"; theme?: Theme; children: ReactNode }
) & {
  dynamic?: boolean;
};

/**
 * Represents the BrandContext provider props
 * @interface BrandContextProps
 * @property {boolean} [fontLoaded='false'] - Context to check whether fonts are loaded in.
 * @property {BrandName} [brand] - Current selected brand.
 * @property {Theme} [theme] - The dark / light mode theme for each brand.
 */
export interface BrandContextProps {
  fontLoaded: boolean;
  brand: BrandName;
  theme: Theme;
}

/**
 * @typedef {Object<string, Object<string, any>>} BrandFonts
 */
export interface BrandFonts {
  [key: string]: { [fontKey: string]: any };
}
