import type { BreakpointKeys } from "_theming/breakpoints";
import type { BrandName } from "components/ThemeProvider";

/**
 * Represents the available container size for the Logos.
 * @type {"default" | "lg" | "xl"}
 */
export type LogosSize = "default" | "lg" | "xl";

/**
 * Represents the available container size for the Logos.
 * @type {"default" | "inverted"}
 */
export type LogoVariant = "default" | "inverted";

/**
 * Represents the fluid sizing of the Grid for each breakpoint.
 * @type {Object.<BreakpointKeys, LogosSize>}
 */
export type LogosSizePerBreakpoint = {
  [Breakpoint in BreakpointKeys]?: LogosSize;
};

/**
 * Logos component for displaying an Logos offering.
 *
 *
 * @component
 * @example
 * <Logos brand="Odido" variant="default" />
 * @interface LogosProps
 * @prop {BrandName} brand - The name of the Logos.
 * @prop {LogosSize | LogosSizePerBreakpoint} [size="default"] - The size of the Logos.
 * @prop {LogoVariant} [variant='default'] - The variant of the Logos.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */

export interface LogosProps {
  brand?: BrandName;
  size?: LogosSize | LogosSizePerBreakpoint;
  variant?: LogoVariant;
  testID?: string | undefined;
}
