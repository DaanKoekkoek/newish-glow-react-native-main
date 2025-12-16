import type { addonDefault } from "./Addon.config";

export type AddonNameProps = (props: Record<string, string>) => JSX.Element;

/**
 * Represents the available addons dynamically.
 */
export type AddonName = keyof typeof addonDefault;

/**
 * Represents the available container size for the Addon.
 */
export type AddonSize = "xs" | "sm" | "default";

/**
 * Represents the available states for an Addon.
 */
export type AddonState = "default" | "inactive";

/**
 * AddonName mapped to an SVG React Component.
 */
export type DefaultAddons = Record<AddonName, AddonNameProps>;

/**
 * Props for the Addon component.
 */
export type AddonProps = {
  name: AddonName;
  size?: AddonSize;
  state?: AddonState;
  testID?: string;
};
