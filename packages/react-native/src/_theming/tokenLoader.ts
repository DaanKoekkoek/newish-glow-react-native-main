import { benLight, benDark } from "./brands/ben";
import type {
  ColumnBreakpoints,
  Palette as OdidoPalette,
} from "./brands/odido";
import { odidoLight, odidoDark, odidoPaletteKeys } from "./brands/odido";
import { simpelLight } from "./brands/simpel";
import type { SwitchPalette } from "./brands/switch";
import { switchTheme, switchPaletteKeys } from "./brands/switch";
import type { breakpoints } from "./breakpoints";

type BaseTheme = typeof odidoLight | typeof odidoDark;
type AppBreakpoints = typeof breakpoints;

const ensureType = (theme: unknown) => theme as BaseTheme;

export const APP_THEMES = {
  "odido-light": ensureType(odidoLight),
  "odido-dark": ensureType(odidoDark),
  "ben-light": ensureType(benLight),
  "ben-dark": ensureType(benDark),
  "simpel-light": ensureType(simpelLight),
  "switch-light": ensureType(switchTheme),
};

// TODO: (J) These should probably be exposed somewhere else.
export { odidoPaletteKeys, switchPaletteKeys };
export type ThemeNames = keyof typeof APP_THEMES;
export type { ColumnBreakpoints };

export type { OdidoPalette };
export type { SwitchPalette } from "./brands/switch";

export type CommonPalette = OdidoPalette | SwitchPalette;

type AppThemes = typeof APP_THEMES;
declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

export const selectTheme = (
  brand: string,
  theme: string,
  fallback = "odido-light",
): keyof AppThemes => {
  const unistylesTheme = `${brand}-${theme}`.toLowerCase();

  if (Object.keys(APP_THEMES).includes(unistylesTheme)) {
    return unistylesTheme as keyof AppThemes;
  }

  return fallback as keyof AppThemes;
};
