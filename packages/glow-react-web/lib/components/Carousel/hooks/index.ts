import React, { useState, useEffect, useMemo } from "react";
import { breakpointsMaxWidth, BreakpointKey } from "_theming/breakpoints";
import type { CarouselProps } from "../Carousel.types";
import Slider from "react-slick";
import { usePropAcrossBreakpoints } from "_global-hooks";
import { updateSlideFocusableElements } from "../Carousel.utility";

type UseResponsiveSettingsProps = {
  slidesToShow: CarouselProps["slidesToShow"];
  centerSlide: CarouselProps["centerSlide"];
  infinite: boolean;
  scrollBySlideCount: boolean;
};

export const useResponsiveSettings = ({
  slidesToShow,
  centerSlide,
  infinite,
  scrollBySlideCount,
}: UseResponsiveSettingsProps) => {
  const slidesByBreakpoint = usePropAcrossBreakpoints(slidesToShow);
  const centerByBreakpoint = usePropAcrossBreakpoints(centerSlide);

  const allBreakpointKeys = useMemo(() => {
    return Array.from(
      new Set([
        ...Object.keys(slidesByBreakpoint),
        ...Object.keys(centerByBreakpoint),
      ]),
    ) as BreakpointKey[];
  }, [slidesByBreakpoint, centerByBreakpoint]);

  const responsiveSettings = useMemo(() => {
    return (
      allBreakpointKeys
        .map((key) => {
          const slidesToScroll =
            scrollBySlideCount && !infinite
              ? (slidesByBreakpoint[key] ?? 1)
              : 1;

          // Calculate the slide speed based on the amount of slides to scroll
          const speed = Math.max(500, 300 * Math.sqrt(slidesToScroll));

          return {
            breakpoint: breakpointsMaxWidth[key],
            settings: {
              slidesToShow: slidesByBreakpoint[key]! ?? 1,
              slidesToScroll: slidesToScroll,
              centerMode: infinite
                ? (centerByBreakpoint[key]! ?? false)
                : false,
              speed,
            },
          };
        })
        // Set to descending order to support max-width responsive configuration of React-Slick
        .sort((a, b) => b.breakpoint - a.breakpoint)
    );
  }, [
    allBreakpointKeys,
    slidesByBreakpoint,
    centerByBreakpoint,
    infinite,
    scrollBySlideCount,
  ]);

  const definedBreakpoints = allBreakpointKeys.filter(
    (key) =>
      slidesByBreakpoint[key] !== undefined ||
      centerByBreakpoint[key] !== undefined,
  );

  const highestBreakpoint = definedBreakpoints.reduce((prev, curr) => {
    return breakpointsMaxWidth[curr] > breakpointsMaxWidth[prev] ? curr : prev;
  }, definedBreakpoints[0]);

  const baseSlidesToShow = slidesByBreakpoint[highestBreakpoint] ?? 1;
  const baseCenterSlide = centerByBreakpoint[highestBreakpoint] ?? false;

  return {
    baseSlidesToShow,
    baseCenterSlide,
    responsiveSettings,
  };
};

type UseSliderIndexProps = {
  sliderRef: React.RefObject<Slider>;
  initialSlide: number;
  infinite: boolean;
  slideCount: number;
  slidesToShow: number;
  slidesToScroll: number;
  onSlideChange?: (index: number) => void;
};

export const useSliderIndex = ({
  sliderRef,
  initialSlide,
  infinite,
  slideCount,
  onSlideChange,
}: UseSliderIndexProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setIsBeginning(!infinite && initialSlide === 0);
  }, [initialSlide, infinite]);

  useEffect(() => {
    if (!sliderRef.current?.innerSlider) return;

    const getClampedIndex = (index: number) => {
      const total = pageCount ?? 0;
      const maxValidIndex = Math.max(0, total - 1);
      return Math.min(Math.max(index, 0), maxValidIndex);
    };

    const clampedIndex = getClampedIndex(initialSlide);
    setCurrentIndex(clampedIndex);
    sliderRef.current.slickGoTo(clampedIndex);
    updateSlideFocusableElements();
  }, [initialSlide, sliderRef, pageCount]);

  const calculatePageCount = () => {
    const slider = sliderRef.current?.innerSlider;

    if (!slider) return;
    const slidesToScroll = slider.props?.slidesToScroll ?? 1;
    const slidesToShow = slider.props?.slidesToShow ?? 3;

    const pages = infinite
      ? Math.ceil(slideCount / slidesToScroll)
      : Math.ceil((slideCount - slidesToShow) / slidesToScroll) + 1;

    setPageCount(pages);
    updateSlideFocusableElements();
  };

  const handleBeforeChange = (_current: number, next: number) => {
    const slider = sliderRef.current?.innerSlider;

    if (!slider) return;

    const slidesToShow = slider.props?.slidesToShow || 1;
    const slidesToScroll = slider.props?.slidesToScroll || 1;
    const totalSlides = slideCount;

    const maxIndex = infinite
      ? Math.ceil(totalSlides / slidesToScroll) - 1
      : Math.max(0, totalSlides - slidesToShow);

    const lastSlideIndex = infinite
      ? maxIndex * slidesToScroll
      : Math.max(0, totalSlides - slidesToShow);

    const isAtEnd = !infinite && next >= lastSlideIndex;

    let pageIndex = Math.floor(next / slidesToScroll);

    const pageCount = infinite
      ? Math.ceil(totalSlides / slidesToScroll)
      : Math.ceil((totalSlides - slidesToShow) / slidesToScroll) + 1;

    if (!infinite && next + slidesToShow >= slideCount) {
      pageIndex = pageCount - 1;
    }

    setCurrentIndex(pageIndex);
    setIsBeginning(!infinite && next === 0);
    setIsEnd(isAtEnd);
    setPageCount(pageCount);

    updateSlideFocusableElements();

    if (typeof onSlideChange === "function") {
      onSlideChange(pageIndex);
    }
  };

  return {
    currentIndex,
    isBeginning,
    isEnd,
    pageCount,
    handleBeforeChange,
    handleInitOrReInit: calculatePageCount,
  };
};
