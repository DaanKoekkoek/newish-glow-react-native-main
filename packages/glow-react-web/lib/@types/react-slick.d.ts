declare module "react-slick" {
  import * as React from "react";

  export interface CustomArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  }

  export interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: boolean;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    responsive?: Array<{
      breakpoint: number;
      settings: Partial<Settings>;
    }>;
    rows?: number;
    slidesPerRow?: number;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    variableHeight?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    rtl?: boolean;
    waitForAnimate?: boolean;
    beforeChange?: (current: number, next: number) => void;
    afterChange?: (current: number) => void;
    onEdge?: (dir: "left" | "right") => void;
    nextArrow?: React.ReactNode;
    prevArrow?: React.ReactNode;
    appendDots?: (dots: React.ReactNode) => React.ReactNode;
    customPaging?: (i: number) => React.ReactNode;
  }

  export default class Slider extends React.Component<
    React.PropsWithChildren<Settings>
  > {
    slickNext(): void;
    slickPrev(): void;
    slickGoTo(index: number, dontAnimate?: boolean): void;
    slickPause(): void;
    slickPlay(): void;
    innerSlider?: {
      list?: unknown;
      state?: unknown;
      props?: {
        slidesToShow: number;
        slidesToScroll: number;
        children?: React.ReactNode[];
      };
    };
  }
}
