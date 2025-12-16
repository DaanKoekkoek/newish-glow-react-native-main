import { odidoPalettes } from "@odido-portals/glow-tokens/odido/light/unistyles";
import type { Theme } from "components/ThemeProvider";
import type { RNStyle } from "react-native-unistyles/lib/typescript/src/types";

import type { PaletteComponents } from "./brands/odido";
import type { OdidoPalette, SwitchPalette, ThemeNames } from "./tokenLoader";

interface basePrimitives {
  value: number | string | Record<string, string | number>;
  property: keyof RNStyle;
  themeName: ThemeNames;
}

interface OdidoPrimitive extends basePrimitives {
  themeName: "odido-light";
  selectedVariant?: OdidoPalette;
}

interface SimpelPrimitive extends basePrimitives {
  themeName: "simpel-light";
  selectedVariant?: undefined;
}

interface BenPrimitive extends basePrimitives {
  themeName: "ben-light";
  selectedVariant?: undefined;
}

interface SwitchPrimitive extends basePrimitives {
  // arbitrary themeName, switch actually doesn't have a light theme
  themeName: "switch-light";
  selectedVariant?: SwitchPalette;
}

type ResolveThemePrimitives =
  | OdidoPrimitive
  | SimpelPrimitive
  | BenPrimitive
  | SwitchPrimitive;

export const resolveThemePrimitives = ({
  value,
  property,
  selectedVariant = "default",
}: ResolveThemePrimitives) => {
  if (typeof value !== "object") return { [property]: value };

  if (!value[selectedVariant]) {
    throw Error(`Variant '${selectedVariant}' doesn't exist on value.`);
  }

  return { [property]: value[selectedVariant] };
};

export const resolvePaletteColor = (
  paletteVariant: OdidoPalette,
  themeName: ThemeNames,
  component: PaletteComponents,
): string => {
  const [, themeMode] = themeName.split("-");

  return (
    odidoPalettes.components[component].color.text[paletteVariant]?.[
      themeMode as Theme
    ] ||
    odidoPalettes.components[component].color.text.default[themeMode as Theme]
  );
};
