import { tokens as odidoDark } from "@odido-portals/glow-tokens/odido/dark/unistyles";
import type { ColumnBreakpoints } from "@odido-portals/glow-tokens/odido/light/unistyles";
import {
  tokens as odidoLight,
  odidoPalettes,
} from "@odido-portals/glow-tokens/odido/light/unistyles";

// TODO: probably a good idea to export the palette keys directly from the tokens
const odidoPaletteKeys = [...Object.keys(odidoPalettes["100"])] as const;
type Palette = keyof (typeof odidoPalettes)["100"];
type PaletteComponents = keyof (typeof odidoPalettes)["components"];

export { odidoLight, odidoDark, odidoPaletteKeys };
export type { ColumnBreakpoints, Palette, PaletteComponents };
