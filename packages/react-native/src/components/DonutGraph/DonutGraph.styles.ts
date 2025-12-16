import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const version = "v1";

export const DonutGraphStyles = createStyleSheet(
  ({
    themes: {
      components: {
        graph: {
          donutGraph: { [version]: donutGraph },
        },
      },
    },
  }) => ({
    container: {
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      variants: {
        variant: {
          default: {
            width: donutGraph.size.container.default,
            height: donutGraph.size.container.default,
          },
          lg: {
            width: donutGraph.size.container.lg,
            height: donutGraph.size.container.lg,
          },
        },
      },
    },
    number: {
      color: donutGraph.color.text.default,
      margin: 0,
      padding: 0,
      variants: {
        variant: {
          default: {
            fontSize: donutGraph.typography.number.default.fontSize,
            letterSpacing: donutGraph.typography.number.default.letterSpacing,
            ...Platform.select({
              web: {
                lineHeight: donutGraph.typography.number.default.lineHeight,
              },
            }),
          },
          lg: {
            fontSize: donutGraph.typography.number.lg.fontSize,
            letterSpacing: donutGraph.typography.number.lg.letterSpacing,
            ...Platform.select({
              web: {
                lineHeight: donutGraph.typography.number.lg.lineHeight,
              },
            }),
          },
        },
      },
    },
    label: {
      color: donutGraph.color.text.default,
      // line height of number is not working correctly on iOS
      variants: {
        variant: {
          default: {
            ...Platform.select({
              ios: {
                top: -9,
              },
              android: {
                top: -9,
              },
            }),
          },
          lg: {
            ...Platform.select({
              ios: {
                top: -21,
              },
              android: {
                top: -21,
              },
            }),
          },
        },
      },
    },
    textContainer: {
      position: "absolute",
      alignItems: "center",
      variants: {
        variant: {
          default: {
            paddingTop: donutGraph.padding.text.top.default,
          },
          lg: {
            paddingTop: donutGraph.padding.text.top.lg,
          },
        },
      },
    },
  }),
);
