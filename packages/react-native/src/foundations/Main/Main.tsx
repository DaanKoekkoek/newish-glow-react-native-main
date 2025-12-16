import { Main as ExpoMain } from "@expo/html-elements";
import { PopoverHost } from "_internals/popover";
import { Snackbar } from "components/Snackbar";
import { StickyBarBase } from "components/StickyBar/StickyBarBase";
import { useStickyBarContext } from "components/StickyBar/StickyBarContext";
import { TopNavigationBase } from "components/TopNavigation/TopNavigationBase";
import { useTopNavigationContext } from "components/TopNavigation/TopNavigationContext";
import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import type { SectionListRenderItem, LayoutChangeEvent } from "react-native";
import { SectionList, Dimensions, Platform } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import { useStyles, createStyleSheet } from "react-native-unistyles";

import type { MainProps, MainSections, RenderedItemProps } from "./Main.types";
import { MainProviders } from "./MainProviders";
import { useScrollBarContext } from "./ScrollBarContext";
import { useMainHooks } from "./hooks";

const AnimatedSectionList = Animated.createAnimatedComponent(
  SectionList,
) as typeof SectionList;

const SectionListSection: React.FC<RenderedItemProps> = React.memo(
  ({ item, styles, stickyBarHeight, stickyBarContent }) => {
    /* NOTE: Requires cloneElement since there are some cases where
     * we want to use React Fragments to pass into Main.
     * Without cloneElement, React Fragments won't get rendered.
     */
    const stickyTopOffsetStyle =
      stickyBarContent?.position === "top" && Platform.OS !== "web"
        ? styles.stickyTopOffset?.(stickyBarHeight)
        : {};
    return React.cloneElement(item, {
      ...item.props,
      style: {
        ...item.props.style,
        ...(stickyTopOffsetStyle && typeof stickyTopOffsetStyle === "object"
          ? stickyTopOffsetStyle
          : {}),
      },
    });
  },
);

const MainContent = ({
  children,
  hasSnackbar,
  hasStickybar,
  hasTopNavigation,
  hasStickyHeader,
  itemSeparator,
  headerComponent,
  footerComponent,
  mainSeparator,
  windowSize = 2,
  safeAreaInsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}: MainProps) => {
  const [topNavigationHeight, setTopNavigationHeight] = useState(0);
  const [stickyBarHeight, setStickyBarHeight] = useState(0);
  const [sectionListHeight, setSectionListHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const initialPaletteSet = useRef(false);

  const { styles } = useStyles(stylesheet);
  const { stickyBarContent } = useStickyBarContext();
  const { setScrollBarWidth } = useScrollBarContext();
  const {
    sectionInfo,
    subscriptionHeroTitle,
    topNavigationVariant,
    topNavigationPalette,
    topNavigationPaletteHero,
    topNavigationContent,
    yOffset,
    setInitialPaletteColors,
    setYOffset,
    updateTopNavigationTitle,
    updateOpacityOffset,
    updatePaletteColors,
  } = useTopNavigationContext();

  const headerScrollY = useSharedValue(0);
  const stickyBarScrollY = useSharedValue(headerHeight + topNavigationHeight);

  const dimensionsHeight = Platform.select({
    web: Dimensions.get("window").height,
    default: Dimensions.get("screen").height,
  });

  const hasVerticalOverflow =
    sectionListHeight + headerHeight + stickyBarHeight + topNavigationHeight >
    dimensionsHeight;

  const { scrollbarWidth, animatedNavStyle, animatedStickyBarStyle } =
    useMainHooks(hasVerticalOverflow, headerScrollY, stickyBarScrollY);

  const renderItem: SectionListRenderItem<React.ReactElement, MainSections> =
    useCallback(
      ({ item }) => {
        return (
          <SectionListSection
            item={item}
            styles={styles}
            stickyBarHeight={stickyBarHeight}
            stickyBarContent={stickyBarContent}
          />
        );
      },
      [stickyBarContent, stickyBarHeight, styles],
    );

  const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const handleTopNavigationLayout = useCallback((event: LayoutChangeEvent) => {
    setTopNavigationHeight(event.nativeEvent.layout.height);
  }, []);

  const handleStickyBarLayout = useCallback((event: LayoutChangeEvent) => {
    setStickyBarHeight(event.nativeEvent.layout.height);
  }, []);

  const handleSectionListLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (React.Children.count(children) > 0) {
        setSectionListHeight(event.nativeEvent.layout.height);
      }
    },
    [children],
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    const offsetY = event.contentOffset.y;

    if (hasStickyHeader) {
      headerScrollY.value =
        stickyBarScrollY.value - headerHeight - topNavigationHeight;
    }

    if (hasStickybar) {
      stickyBarScrollY.value =
        offsetY <= headerHeight + topNavigationHeight
          ? headerHeight + topNavigationHeight - offsetY
          : 0;
    }

    if (
      hasTopNavigation &&
      !topNavigationContent?.opacityYOffset &&
      (!!subscriptionHeroTitle || topNavigationContent?.title)
    ) {
      const topNavigationOffset = topNavigationHeight + offsetY;
      runOnJS(setYOffset)(topNavigationOffset);

      if (topNavigationContent?.mirrorColor && offsetY > 0) {
        runOnJS(updatePaletteColors)(topNavigationOffset);
      }
    }
  });

  useEffect(() => {
    if (topNavigationContent?.title) {
      updateOpacityOffset?.({
        y: 0,
        height: 0,
      });
    }
  }, [
    topNavigationContent?.title,
    updateTopNavigationTitle,
    updateOpacityOffset,
  ]);

  useEffect(() => {
    if (topNavigationContent?.mirrorColor) {
      setInitialPaletteColors(sectionInfo);
      if (sectionInfo.length === React.Children.count(children)) {
        initialPaletteSet.current = true;
      }
    }
  }, [
    children,
    sectionInfo,
    initialPaletteSet,
    topNavigationContent?.mirrorColor,
    setInitialPaletteColors,
  ]);

  useEffect(() => {
    if (hasStickybar) {
      setScrollBarWidth(scrollbarWidth());
    }
  }, [hasStickybar, scrollbarWidth, setScrollBarWidth]);

  useEffect(() => {
    if (hasStickybar) {
      stickyBarScrollY.value = headerHeight + topNavigationHeight;
    }
  }, [headerHeight, topNavigationHeight, stickyBarScrollY, hasStickybar]);

  const sections = useMemo(
    () => [{ data: React.Children.toArray(children) as React.ReactElement[] }],
    [children],
  );

  return (
    <>
      <ExpoMain
        style={styles.main(
          dimensionsHeight,
          stickyBarHeight,
          headerHeight,
          topNavigationHeight,
        )}
      >
        {hasSnackbar && (
          <Snackbar
            safeAreaInsets={safeAreaInsets}
            topOffset={headerHeight + stickyBarHeight}
            context="default"
          />
        )}
        {hasStickyHeader && headerComponent && (
          <Animated.View
            style={[styles.sticky, animatedNavStyle]}
            onLayout={handleHeaderLayout}
          >
            {headerComponent}
          </Animated.View>
        )}
        {hasTopNavigation && topNavigationContent && (
          <Animated.View
            style={styles.sticky}
            onLayout={handleTopNavigationLayout}
          >
            <TopNavigationBase
              variant={topNavigationVariant || topNavigationContent.variant}
              palette={topNavigationPalette || topNavigationContent.palette}
              title={topNavigationContent.title}
              showTitle={topNavigationContent.showTitle}
              height={topNavigationContent.height}
              paletteType={topNavigationPaletteHero}
              opacityYOffset={yOffset || topNavigationContent.opacityYOffset}
              action={{
                left:
                  topNavigationContent?.action?.left &&
                  // NOTE: This check is required, otherwise Android crashes due to the prop being either
                  // malformed and/or frozen. React.cloneElement is a way around that.
                  React.isValidElement(topNavigationContent?.action?.left)
                    ? React.cloneElement(topNavigationContent?.action?.left)
                    : undefined,
                right:
                  topNavigationContent?.action?.right &&
                  React.isValidElement(topNavigationContent?.action?.right)
                    ? React.cloneElement(topNavigationContent?.action?.right)
                    : undefined,
              }}
              mirrorColor={topNavigationContent.mirrorColor}
            />
          </Animated.View>
        )}
        <AnimatedSectionList
          sections={sections}
          testID="section-list"
          renderItem={renderItem}
          removeClippedSubviews={false}
          SectionSeparatorComponent={() => mainSeparator ?? null}
          ItemSeparatorComponent={() => itemSeparator ?? null}
          renderSectionFooter={() => footerComponent ?? null}
          renderSectionHeader={() =>
            !hasStickyHeader && !!headerComponent ? headerComponent : null
          }
          keyExtractor={(item: unknown, index: number) =>
            `${item as React.ReactElement}-${index}`
          }
          onLayout={handleSectionListLayout}
          onScroll={
            stickyBarContent?.position === "top" ||
            !!(
              subscriptionHeroTitle ||
              topNavigationContent?.title ||
              topNavigationContent?.action
            )
              ? handleScroll
              : undefined
          }
          scrollEventThrottle={Platform.OS === "web" ? 16 : 64}
          windowSize={windowSize}
          style={
            stickyBarContent?.position === "top" &&
            Platform.OS === "web" &&
            hasStickyHeader
              ? styles.stickyTopOffset(stickyBarHeight)
              : undefined
          }
        />
        {hasStickybar && stickyBarContent && (
          <StickyBarBase
            onLayout={handleStickyBarLayout}
            position={stickyBarContent.position}
            width={stickyBarContent.width}
            layout={stickyBarContent.layout}
            button={stickyBarContent.button}
            animatedStyle={
              stickyBarContent?.position === "top"
                ? animatedStickyBarStyle
                : undefined
            }
            scrollbarOffset={scrollbarWidth()}
            safeAreaInsets={safeAreaInsets}
          >
            {stickyBarContent.children}
          </StickyBarBase>
        )}
      </ExpoMain>
      <PopoverHost />
    </>
  );
};

export const Main = ({ ...props }: MainProps) => {
  return (
    <MainProviders
      hasStickybar={props.hasStickybar}
      hasSnackbar={props.hasSnackbar}
      hasTopNavigation={props.hasTopNavigation}
    >
      <MainContent {...props} />
    </MainProviders>
  );
};

const stylesheet = createStyleSheet(() => ({
  main: (
    height: number,
    stickybarHeight: number,
    headerHeight: number,
    topNavigationHeight: number,
  ) => ({
    display: "flex",
    position: "relative",
    overflow: "hidden",
    flexGrow: 1,
    flexShrink: 0,
    maxHeight: "100%",
    ...Platform.select({
      web: {
        height:
          stickybarHeight || headerHeight || topNavigationHeight
            ? height
            : undefined,
      },
      default: {
        height: "auto",
      },
    }),
  }),
  stickyTopOffset: (stickyBarHeight: number) => ({
    ...Platform.select({
      web: {
        paddingTop: stickyBarHeight,
      },
      default: {
        marginTop: stickyBarHeight,
      },
    }),
  }),
  sticky: {
    zIndex: 7,
  },
}));
