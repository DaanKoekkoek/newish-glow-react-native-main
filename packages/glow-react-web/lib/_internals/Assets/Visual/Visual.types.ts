import type { OdidoPalette } from "_internals/Color";
import type { ImageProps } from "foundations/Image";
import type { BreakpointKey } from "_theming/breakpoints";
import type { GlowGradientProps } from "foundations/GlowGradient";

/**
 * Defines the types of visual elements.
 * @type {VisualType}
 * @property {"image"} - Displays a static image.
 * @property {"illustration"} - Displays an illustration (likely SVG or styled).
 * @property {"content"} - Wraps arbitrary React content instead of an image.
 */
type VisualType = "image" | "illustration" | "content" | "mini";

/**
 * Sets the aspect ratio of the visual container.
 * @type {VisualRatio}
 * @property {"default"} - Uses default aspect ratio logic.
 * @property {"fixed"} - Fixes the container height and removes inline padding.
 */
type VisualRatio = "default" | "fixed";

/**
 * Sets the background style of the visual container.
 * @type {VisualBackground}
 * @property {"emphasised"} - Renders a Glow gradient background. Only applicable for the Odido brand.
 * @property {"default"} - Uses palette-based background styling.
 * @property {"none"} - No background color.
 */
type VisualBackground = "emphasised" | "default" | "none";

/**
 * Controls which dimensions the visual fills.
 * @type {VisualFill}
 * @example fill={["height", "width"]}
 * @property {"height"} - Makes the visual take up 100% height.
 * @property {"width"} - Makes the visual take up 100% width.
 */
export type VisualFill = ("width" | "height")[];

/**
 * Removes padding on specific sides of the visual container.
 * @type {VisualNoPadding}
 * @property {"vertical"} - Removes padding top and bottom.
 * @property {"horizontal"} - Removes padding left and right.
 * @property {"left"} - Removes padding on the left.
 * @property {"right"} - Removes padding on the right.
 * @property {"top"} - Removes padding on the top.
 * @property {"bottom"} - Removes padding on the bottom.
 * @property {"all"} - Removes all padding.
 * @property {"none"} - Default padding.
 */
type VisualNoPadding =
  | "vertical"
  | "horizontal"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "all"
  | "none";

type VisualNoPaddingPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: VisualNoPadding;
};

/**
 * Represents `Visual` component properties.
 * @type {VisualProps}
 * @extends {Partial<Omit<ImageProps, "type">>}
 * @property {React.ReactNode} [children] - Inner content (used in `content` or `image` type).
 * @property {keyof JSX.IntrinsicElements | React.ElementType} [as="div"] - Sets the container tag or component to render.
 * @property {VisualFill} [fill] - Controls width/height stretching behavior.
 * @property {VisualBackground} [background="default"] - Controls container background styling.
 * @property {VisualRatio} [visualRatio="default"] - Defines layout aspect ratio.
 * @property {VisualType} [type="illustration"] - Specifies visual content type.
 * @property {OdidoPalette} [palette] - Applies background palette styling (when background is `default`).
 * @property {GlowGradientProps} [gradient] - Control of the rendered gradient when a palette is provided.
 * @property {VisualNoPadding | VisualNoPaddingPerBreakpointType} [noPadding] - Removes specific padding values. Can also be set per breakpoint.
 */
export type VisualProps = Partial<ImageProps> & {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  fill?: VisualFill;
  background?: VisualBackground;
  visualRatio?: VisualRatio;
  type?: VisualType;
  palette?: OdidoPalette;
  gradient?: GlowGradientProps;
  noPadding?: VisualNoPadding | VisualNoPaddingPerBreakpointType;
};
