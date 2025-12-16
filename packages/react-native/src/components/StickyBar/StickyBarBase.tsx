import { usePropAcrossBreakpoints } from "_global-hooks";
import type { BreakpointKeys } from "_theming/breakpoints";
import { ViewWithBoxShadow } from "_utility";
import { useScrollBarContext } from "foundations/Main/ScrollBarContext";
import { View, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { stickyBarStyle } from "./StickyBar.style";
import type { StickyBarProps, StickyBarContentProps } from "./StickyBar.types";
import { useStickyBarContext } from "./StickyBarContext";
import { ActionButtonIcon } from "../ActionButton";
import { Button } from "../Button";
import { Modal } from "../Modal";

export const StickyBarBase: React.FC<
  StickyBarProps & StickyBarContentProps
> = ({
  position = "bottom",
  width = "default",
  layout = "default",
  style,
  animatedStyle,
  scrollbarOffset = 0,
  safeAreaInsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  ...props
}) => {
  const { styles } = useStyles(stickyBarStyle, { position });
  const { width: windowWidth } = useWindowDimensions();

  const config = {
    position,
    width,
    layout,
    safeAreaInsets,
    ...props,
  };

  const sharedStyles = [
    styles.stickyBar(scrollbarOffset, windowWidth),
    styles.stickyBarPosition(position, safeAreaInsets[position]),
    style,
  ];

  return animatedStyle ? (
    <Animated.View
      style={[...sharedStyles, animatedStyle]}
      testID="sticky-bar-root"
    >
      <StickyBarContent {...config} />
    </Animated.View>
  ) : (
    <View style={sharedStyles} testID="sticky-bar-root">
      <StickyBarContent {...config} />
    </View>
  );
};

const StickyBarContent = ({
  position = "bottom",
  width,
  layout,
  onLayout,
  children,
  button,
  safeAreaInsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}: StickyBarProps) => {
  const { stickyBarContent } = useStickyBarContext();
  const { scrollBarWidth } = useScrollBarContext();

  const internalLayout = usePropAcrossBreakpoints(layout);

  // Styling logic
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const isMobileButton =
    useStyles(stickyBarStyle).theme.themes.components.overlay.stickyBar.v1
      .button.breakpoint[breakpoint] === "Mobile";
  const { styles } = useStyles(stickyBarStyle, {
    layout:
      internalLayout[breakpoint] === "default"
        ? undefined
        : internalLayout[breakpoint],
    width: width === "default" ? undefined : width,
  });

  return !children ? null : (
    <ViewWithBoxShadow
      shadowStylePreset={position === "top" ? "bottom" : "top"}
      style={styles.stickyBarShadow}
    >
      <View
        style={[
          styles.container(
            breakpoint,
            safeAreaInsets[position],
            position,
            scrollBarWidth || 0,
          ),
        ]}
        onLayout={onLayout}
      >
        <View
          style={[styles.row, styles.rowMaxWidth, styles.gap]}
          testID="stickybar-content-layout"
        >
          <View
            style={[styles.content, styles.gap]}
            testID="stickybar-content-wrapper"
          >
            <>
              <View style={styles.contentChild} testID="stickybar-children">
                {children}
              </View>
              {!!stickyBarContent?.modal && (
                <View
                  style={styles.actionButtonIcon}
                  testID="stickybar-modal-wrapper"
                >
                  <Modal
                    closable
                    footer="none"
                    position="bottom"
                    title={stickyBarContent.modal.title}
                    trigger={
                      <ActionButtonIcon
                        icon={
                          stickyBarContent?.position === "top"
                            ? "chevron-down"
                            : "chevron-up"
                        }
                        inverted
                        onPress={() => {}}
                      />
                    }
                  >
                    {stickyBarContent.modal.children}
                  </Modal>
                </View>
              )}
            </>
          </View>
          {button && (
            <View
              style={styles.buttonWrapper}
              testID="stickybar-button-wrapper"
            >
              <Button
                prominence="emphasised"
                onPress={button.onPress}
                pressableStyle={styles.buttonStyle}
                baseStyle={styles.buttonStyle}
              >
                {internalLayout[breakpoint] !== "stacked" && isMobileButton ? (
                  <Button.Icon solid={false} name="arrow-right" />
                ) : (
                  button.text
                )}
              </Button>
            </View>
          )}
        </View>
      </View>
    </ViewWithBoxShadow>
  );
};
