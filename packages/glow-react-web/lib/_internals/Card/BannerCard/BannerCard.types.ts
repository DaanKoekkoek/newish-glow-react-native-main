import { VisualProps } from "_internals/Assets";
import { OdidoPalette } from "_internals/Color";
import { ReactNode } from "react";
import type { BreakpointKey } from "_theming/breakpoints";
import type { ButtonProps } from "components/Button";

/**
 * Set the background variant
 * @type {"default" | "emphasised"}
 */
export type BannerCardVariant = "default" | "emphasised";

/**
 * Set direction of Banner card content
 * @type {"vertical" | "horizontal"}
 */
export type BannerCardDirection = "vertical" | "horizontal";

type BannerCardDirectionPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: BannerCardDirection;
};

/**
 * Props for the BannerCard.
 * @type BannerCardProps
 * @property {HeadingProps} title - Title of the BannerCard.
 * @property {VisualProps} image - Image component props.
 * @property {HeadingProps} children - Paragraph of the BannerCard.
 * @property {ButtonProps<React.ElementType>} [callToAction] - Button component for action handling.
 * @property {BannerCardVariant} [variant] - The background variant of the BannerCard.
 * @property {OdidoPalette} [palette="default"] - Palette color for background.
 * @property {BannerCardDirection | BannerCardDirectionPerBreakpointType} [direction="vertical"] - Direction of content.
 * @property {boolean} [animated="false"] - Stagger animates its contents when set to `true`.
 */
export type BannerCardProps = {
  title: string;
  children: ReactNode;
  image: VisualProps;
  callToAction?: ButtonProps<React.ElementType>;
  variant?: BannerCardVariant;
  palette?: OdidoPalette;
  direction?: BannerCardDirection | BannerCardDirectionPerBreakpointType;
  animated?: boolean;
};
