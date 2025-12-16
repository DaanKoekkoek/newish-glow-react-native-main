import { createStyleSheet } from "react-native-unistyles";

export const snackbarStylesheet = createStyleSheet(() => ({
  container: (context) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: context === "modal" ? 10 : 1,
  }),
}));

export const snackbarAnimatorStylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        notifications: {
          snackbar: { v1: snackbar },
        },
      },
    },
  }) => ({
    animator: (visible, index) => ({
      borderRadius: snackbar.radius.default,
      position: "absolute",
      zIndex: visible ? 10 - (index ?? 0) : undefined,
      alignSelf: "center",
    }),
  }),
);

export const snackbarItemStylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        notifications: {
          snackbar: { v1: snackbar },
        },
      },
    },
    screenSizes: { grid },
  }) => ({
    shadowWrapper: (windowWidth) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: snackbar.radius.default,
      maxWidth: {
        desktop: snackbar.size.maxWidth.desktop,
        laptop: snackbar.size.maxWidth.laptop,
        mobile: Math.min(
          windowWidth - grid.gap.mobile,
          snackbar.size.maxWidth.mobile,
        ),
        mobileSmall: Math.min(
          windowWidth - grid.gap.mobileSmall,
          snackbar.size.maxWidth.mobileSmall,
        ),
        tablet: snackbar.size.maxWidth.tablet,
      },
    }),
    layout: {
      borderRadius: snackbar.radius.default,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: snackbar.padding.vertical,
      paddingHorizontal: snackbar.padding.horizontal,
      gap: snackbar.gap.horizontal.lg,
      backgroundColor: snackbar.color.background.default,
      minHeight: snackbar.size.minHeight,
    },
    icon: {
      variants: {
        status: {
          default: { color: snackbar.color.icon.default },
          error: { color: snackbar.color.icon.error },
          loading: {
            color: snackbar.color.icon.default,
            transformOrigin: "center",
          },
          success: { color: snackbar.color.icon.success },
        },
      },
    },
    spinner: {
      alignSelf: "center",
    },
    messageWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: snackbar.gap.horizontal.default,
      flexGrow: 0,
      flexShrink: 1,
    },
    button: { alignSelf: "center" },
  }),
);
