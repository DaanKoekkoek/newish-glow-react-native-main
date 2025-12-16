import type { BreakpointKey } from "_theming/breakpoints";
import type { NumberRange } from "_utility";
import { ButtonProps } from "..";

export type AllowedSlideAmount = NumberRange<1, 11>; // Allow 10 slides per batch max

/**
 * Represents the slidesToShow configuration per breakpoint.
 * Allows specifying how many slides to show at each breakpoint.
 * @type {Partial<Record<BreakpointKey, AllowedSlideAmount>>}
 */
export type AllowedSlidesPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: AllowedSlideAmount;
};

/**
 * Represents whether to center slides at each breakpoint.
 * @type {Partial<Record<BreakpointKey, boolean>>}
 */
export type CenterSlidePerBreakpointType = {
  [Breakpoint in BreakpointKey]?: boolean;
};

/**
 * Represents the props accepted by the carousel navigation buttons,
 * excluding the `onClick` handler which is controlled internally.
 */
export type CarouselButtonProps = Omit<
  ButtonProps<React.ElementType>,
  "onClick"
>;

/**
 * Props for the Carousel component.
 * @type {CarouselProps}
 * @property {React.ReactNode} children - Slides content to render inside the carousel.
 * @property {AllowedSlideAmount | AllowedSlidesPerBreakpointType} [slidesToShow=1] - Number of slides to show at once, or per breakpoint.
 * @property {number} [initialSlide=0] - Initial slide index to display.
 * @property {boolean | CenterSlidePerBreakpointType} [centerSlide='false'] - Whether to center the slides, optionally per breakpoint.
 * @property {string} [slideOffset="5%"] - CSS value for slide padding offset when centering.
 * @property {boolean} [variableSize=false] - Whether slides have variable width/height.
 * @property {CarouselButtonProps} [prevButtonProps] - Props to spread to the "previous" navigation button.
 * @property {CarouselButtonProps} [nextButtonProps] - Props to spread to the "next" navigation button.
 * @property {boolean} [scrollBySlideCount='true'] - If true, navigation scrolls by number of slides shown; otherwise, scrolls by 1.
 * @property {(index: number) => void} [onSlideChange] - Callback fired when slide index changes.
 */
export type CarouselProps = {
  children: React.ReactNode;
  slidesToShow?: AllowedSlideAmount | AllowedSlidesPerBreakpointType;
  initialSlide?: number;
  centerSlide?: boolean | CenterSlidePerBreakpointType;
  slideOffset?: string;
  variableSize?: boolean;
  prevButtonProps?: CarouselButtonProps;
  nextButtonProps?: CarouselButtonProps;
  scrollBySlideCount?: boolean;
  onSlideChange?: (index: number) => void;
};
