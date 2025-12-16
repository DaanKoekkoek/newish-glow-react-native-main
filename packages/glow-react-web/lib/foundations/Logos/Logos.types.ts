import type { BrandName } from "components/ThemeProvider";
import type { BreakpointKey } from "_theming/breakpoints";

export type Logo = (props: Record<string, string>) => JSX.Element;

/**
 * Available color variants for logos.
 * @type {"default" | "inverted"}
 */
export type LogosVariant = "default" | "inverted";

/**
 * Available sizes for logos.
 * @type {"default" | "lg" | "xl"}
 */
export type LogosSize = "default" | "lg" | "xl";

type LogosSizePerBreakpointType = {
  [Breakpoint in BreakpointKey]?: LogosSize;
};

/**
 * Props for the Logos component.
 * @type LogosProps
 * @property {BrandName} [brand] - Specifies which brand logo to display.
 * @property {LogosVariant} [variant="default"] - Determines the fill style of the logo.
 * @property {LogosSize} [size="default"] - Sets the logo size.
 * @property {string} [testID="logos"] - The test ID for the logo, useful for testing.
 * @property {string} [className] - Additional className applied on the parent container.
 */
export type LogosProps = {
  brand?: BrandName;
  variant?: LogosVariant;
  size?: LogosSize | LogosSizePerBreakpointType;
  testID?: string;
  className?: string;
};
