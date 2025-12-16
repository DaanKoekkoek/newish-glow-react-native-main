import type { ColumnBreakpoints } from "@odido-portals/glow-tokens/switch/unistyles";
import {
  tokens as switchTheme,
  switchPalettes,
} from "@odido-portals/glow-tokens/switch/unistyles";

// TODO: probably a good idea to export the palette keys directly from the tokens
const switchPaletteKeys = [...Object.keys(switchPalettes["color"])] as const;
type SwitchPalette = keyof (typeof switchPalettes)["color"];

export { switchTheme, switchPaletteKeys };
export type { ColumnBreakpoints, SwitchPalette };
