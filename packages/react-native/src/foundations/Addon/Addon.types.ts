import type { BreakpointKeys } from "_theming/breakpoints";

/**
 * Represents the available container size for the Addon.
 * @type {"xs" | "sm" | "default"}
 */
export type AddonSize = "xs" | "sm" | "default";

/**
 * Represents the available container size for the Addon.
 * @type {"default" | "inactive"}
 */
export type AddonState = "default" | "inactive";

/**
 * Represents the fluid sizing of the Grid for each breakpoint.
 * @type {Object.<BreakpointKeys, AddonSize>}
 */
export type AddonSizePerBreakpoint = {
  [Breakpoint in BreakpointKeys]?: AddonSize;
};

/**
 * Represents the available addons.
 * @type {"Amazon Prime" | "HBO Max" | "Wifi Plus" | "Visual Voicemail" | "Videoland" | "Viaplay" | "SkyShowtime" | "Podimo" | "Netflix" | "Apple One" | "Deezer" | "Extra Veilig Online" | "Multi-sim"  | "30DaysBasic" | "30DaysFast" | "30DaysFastest" | "24hFastest"}
 */
export type AddonName =
  | "Amazon Prime"
  | "HBO Max"
  | "Wifi Plus"
  | "Visual Voicemail"
  | "Videoland"
  | "Viaplay"
  | "SkyShowtime"
  | "Podimo"
  | "Netflix"
  | "Apple One"
  | "Deezer"
  | "Extra Veilig Online"
  | "Multi-sim"
  | "30DaysBasic"
  | "30DaysFast"
  | "30DaysFastest"
  | "24hFastest";

/**
 * Addon component for displaying an addon offering.
 * This component will support more providers in the future
 *
 *
 * @component
 * @example
 * <Addon name="Amazon Prime" variant="default" />
 * @interface AddonProps
 * @prop {AddonName} name - The name of the addon.
 * @prop {AddonSize | AddonSizePerBreakpoint} [size="default"] - The size of the addon.
 * @prop {AddonState} [state='default'] - The state of the addon.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */

export interface AddonProps {
  name: AddonName;
  size?: AddonSize | AddonSizePerBreakpoint;
  state?: AddonState;
  testID?: string | undefined;
}
