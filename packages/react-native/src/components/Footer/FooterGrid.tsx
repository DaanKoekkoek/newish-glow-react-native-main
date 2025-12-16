import { usePropAcrossBreakpoints } from "_global-hooks";
import type { BreakpointKeys } from "_theming/breakpoints";
import { Divider, useThemeProviderContext } from "components/index";
import { Icon, Grid, Heading } from "foundations/index";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Pressable,
  LayoutAnimation,
  type LayoutChangeEvent,
  Platform,
} from "react-native";
import Animated from "react-native-reanimated";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { FooterStyles } from "./Footer.styles";
import type { FooterGridColumnProps, FooterGridProps } from "./Footer.types";
import { FooterContext, useFooterContext } from "./FooterContext";
import { useFooterAnimation } from "./hooks";

const FooterGrid = ({ children, justifyContent }: FooterGridProps) => {
  const { styles } = useStyles(FooterStyles);

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const justifyContentBreakpoints = usePropAcrossBreakpoints(justifyContent);

  return (
    <FooterContext.Provider
      value={{
        justify: !!justifyContent,
        atom: "default",
        molecule: "default",
      }}
    >
      <Grid>
        <Grid.Column
          style={[
            styles.footerGridJustifyContent(
              breakpoint,
              justifyContentBreakpoints,
            ),
            styles.footerGrid,
          ]}
        >
          {children}
        </Grid.Column>
      </Grid>
    </FooterContext.Provider>
  );
};

const FooterHeading = ({ title }: { title: string }) => {
  const { styles } = useStyles(FooterStyles);

  return (
    <Heading size="md" as="h3" style={styles.footerGridColumnTitle}>
      {title}
    </Heading>
  );
};

const FooterColumn = ({
  children,
  title,
  collapsible = false,
}: FooterGridColumnProps) => {
  const [columnHeight, setColumnHeight] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [measured, setMeasured] = useState(false);

  const { justify } = useFooterContext();

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;

  const isMobile = ["mobileSmall", "mobile", "tablet"].includes(breakpoint);
  const isCollapsible = isMobile && collapsible && !!title;
  const isOpenable = isCollapsible && !isPressed;
  const isWeb = Platform.OS === "web";

  const { styles } = useStyles(FooterStyles, {
    justify,
  });
  const { panelAnimation, chevronPlusAnimation, chevronMinAnimation } =
    useFooterAnimation(columnHeight, isPressed, isWeb);
  const { brand } = useThemeProviderContext();

  useEffect(() => {
    if (columnHeight) setMeasured(true);
  }, [columnHeight]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!measured && isWeb) {
        setColumnHeight(event.nativeEvent.layout.height);
        setMeasured(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [measured],
  );

  return (
    <View style={styles.footerGridColumn}>
      <View>
        {title &&
          (isCollapsible ? (
            <Pressable
              style={styles.footerGridColumnCollapsible}
              onPress={() => {
                if (!isWeb) {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                }
                setIsPressed((prev) => !prev);
              }}
              aria-label={title}
            >
              <FooterHeading title={title} />
              <View style={styles.footerGridColumnIconContainer}>
                {["plus", "min"].map((icon) => (
                  <Animated.View
                    key={icon}
                    style={[
                      styles.footerGridColumnIconAbsolute,
                      icon === "plus"
                        ? chevronPlusAnimation
                        : chevronMinAnimation,
                    ]}
                  >
                    <Icon
                      brand={brand !== "simpel" ? brand : undefined}
                      name={icon}
                      style={styles.footerGridColumnIcon}
                    />
                  </Animated.View>
                ))}
              </View>
            </Pressable>
          ) : (
            <FooterHeading title={title} />
          ))}
        {isCollapsible ? (
          <View testID="footer-column-collapsible">
            {!isWeb ? (
              isPressed && (
                <View
                  style={[
                    styles.footerGridColumnHeight,
                    styles.footerGridColumnItems,
                  ]}
                >
                  {children}
                </View>
              )
            ) : (
              <Animated.View
                style={[
                  styles.footerGridColumnHeight,
                  styles.footerGridColumnItems,
                  panelAnimation,
                ]}
                pointerEvents={isOpenable ? "none" : "auto"}
                accessibilityElementsHidden={isOpenable}
                importantForAccessibility={
                  isOpenable ? "no-hide-descendants" : "auto"
                }
              >
                {children}
              </Animated.View>
            )}
          </View>
        ) : (
          <View style={styles.footerGridColumnItems} testID="footer-column">
            {children}
          </View>
        )}
      </View>
      {isCollapsible && title && <Divider prominence="subtle" />}
      {!measured && isCollapsible && isWeb && (
        <View
          style={[
            styles.footerGridColumnItems,
            styles.footerGridHeightCalculation,
          ]}
          onLayout={handleLayout}
        >
          {children}
        </View>
      )}
    </View>
  );
};

FooterGrid.displayName = "Footer.Grid";
FooterColumn.displayName = "Footer.Grid.Column";

FooterGrid.Column = FooterColumn;

export { FooterGrid, FooterColumn };
