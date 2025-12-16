import "./slick/Slick.scss";

import React, { useRef, useCallback, useId } from "react";
import Slider, { type Settings as SliderSettings } from "react-slick";
import classNames from "classnames";
import type { CarouselProps } from "./Carousel.types";
import { Button } from "components/Button";
import styles from "./Carousel.module.scss";
import { Paragraph, Stack } from "foundations/index";
import { Visible } from "utilities/Visibility";

import { useSliderIndex, useResponsiveSettings } from "./hooks";
import { tokenClassNames } from "_utility";

export const Carousel = ({
  children,
  slidesToShow = {
    mobileSmall: 1,
    laptop: 2,
    desktop: 3,
  },
  slideOffset = "5%",
  initialSlide = 0,
  centerSlide,
  variableSize,
  prevButtonProps,
  nextButtonProps,
  scrollBySlideCount = true,
  onSlideChange,
}: CarouselProps) => {
  const sliderRef = useRef<Slider>(null);
  const id = useId();
  const slideCount = React.Children.count(children);

  const { baseSlidesToShow, responsiveSettings } = useResponsiveSettings({
    slidesToShow,
    centerSlide,
    infinite: !!centerSlide,
    scrollBySlideCount,
  });

  const slidesToShowNumber =
    typeof slidesToShow === "number" ? slidesToShow : baseSlidesToShow;

  const slidesToScrollNumber =
    scrollBySlideCount && !centerSlide ? slidesToShowNumber : 1;

  const {
    currentIndex,
    isBeginning,
    isEnd,
    pageCount,
    handleBeforeChange,
    handleInitOrReInit,
  } = useSliderIndex({
    sliderRef,
    initialSlide,
    infinite: !!centerSlide,
    slideCount,
    slidesToShow: slidesToShowNumber,
    slidesToScroll: slidesToScrollNumber,
    onSlideChange,
  });

  const trackSettings = {
    slidesToShow: slidesToShowNumber,
    slidesToScroll: slidesToScrollNumber,
    infinite: !!centerSlide,
    arrows: false,
    lazyLoad: false,
    onInit: handleInitOrReInit,
    onReInit: handleInitOrReInit,
    beforeChange: handleBeforeChange,
    centerPadding: centerSlide ? slideOffset : undefined,
    responsive: responsiveSettings,
    variableSize,
    initialSlide,
    sliderRef,
    carouselKey: `carousel-${id}`,
  };

  const controllerSettings = {
    currentIndex,
    pageCount,
    sliderRef,
    isBeginning,
    isEnd,
    prevButtonProps,
    nextButtonProps,
  };

  const shouldHideOnDesktop =
    slideCount <= 3 ||
    (typeof slidesToShow === "object" && slidesToShow.desktop! >= slideCount);

  return (
    <div className={tokenClassNames(styles, "carousel")}>
      {shouldHideOnDesktop ? (
        <>
          <Visible below="laptop">
            <CarouselController {...controllerSettings} />
            <CarouselTrack {...trackSettings}>{children}</CarouselTrack>
          </Visible>
          <Visible above="laptop">
            <Stack alignItems="stretch" direction="row">
              {children}
            </Stack>
          </Visible>
        </>
      ) : (
        <>
          <CarouselController {...controllerSettings} />
          <CarouselTrack {...trackSettings}>{children}</CarouselTrack>
        </>
      )}
    </div>
  );
};

Carousel.displayName = "Carousel";

type CarouselControllerProps = {
  currentIndex: number;
  pageCount: number;
  sliderRef: React.RefObject<Slider>;
  isBeginning: boolean;
  isEnd: boolean;
  prevButtonProps: CarouselProps["prevButtonProps"];
  nextButtonProps: CarouselProps["nextButtonProps"];
};

const CarouselController = ({
  currentIndex,
  pageCount,
  sliderRef,
  isBeginning,
  isEnd,
  prevButtonProps,
  nextButtonProps,
}: CarouselControllerProps) => {
  const prevIndexRef = useRef(currentIndex);
  const direction = currentIndex > prevIndexRef.current ? "up" : "down";

  React.useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    const innerSlider = sliderRef.current?.innerSlider;
    const slidesToScroll = innerSlider?.props?.slidesToScroll ?? 1;
    const nextIndex = currentIndex * slidesToScroll + slidesToScroll;
    sliderRef.current?.slickGoTo(nextIndex);
  }, [currentIndex, sliderRef]);

  const goToPrev = useCallback(() => {
    const innerSlider = sliderRef.current?.innerSlider;
    const slidesToScroll = innerSlider?.props?.slidesToScroll ?? 1;
    const prevIndex = (currentIndex - 1) * slidesToScroll;
    sliderRef.current?.slickGoTo(prevIndex);
  }, [currentIndex, sliderRef]);

  if (!prevButtonProps && !nextButtonProps) {
    return null;
  }

  return (
    <div className={styles["carousel-slides-controller"]}>
      <Paragraph
        size="lg"
        testID="legend"
        className={styles["carousel-slides-legend"]}
      >
        <span
          key={currentIndex}
          className={styles["carousel-slides-indicator"]}
          data-direction={direction}
        >
          {currentIndex + 1}
        </span>
        <span>/</span>
        <span className={styles["carousel-slides-indicator"]}>{pageCount}</span>
      </Paragraph>
      <div className={styles["carousel-slides-buttons"]}>
        <Button
          testID="carousel-slide-prev"
          onClick={() => goToPrev()}
          disabled={isBeginning}
          icon={{ name: "arrow-left" }}
          aria-label="previous slide"
          {...prevButtonProps}
        />
        <Button
          testID="carousel-slide-next"
          onClick={() => goToNext()}
          disabled={isEnd}
          prominence="secondary"
          icon={{ name: "arrow-right" }}
          aria-label="next slide"
          {...nextButtonProps}
        />
      </div>
    </div>
  );
};

type CarouselTrackProps = {
  sliderRef: React.RefObject<Slider>;
  children: React.ReactNode;
  variableSize: CarouselProps["variableSize"];
  carouselKey: string;
} & SliderSettings;

const CarouselTrack = ({
  sliderRef,
  children,
  variableSize,
  carouselKey,
  ...settings
}: CarouselTrackProps) => (
  <Slider
    key={carouselKey}
    ref={sliderRef}
    variableWidth={variableSize}
    variableHeight={variableSize}
    {...settings}
    className={classNames(styles["carousel-track"], {
      [styles["is-equal-size"]]: !variableSize,
      [styles["is-centered"]]: !variableSize,
    })}
  >
    {React.Children.map(children, (child, idx) => (
      <div key={idx} className={styles["carousel-slide"]}>
        <div className={styles["carousel-slide-content"]}>{child}</div>
      </div>
    ))}
  </Slider>
);
