import { Platform } from "react-native";
import { createStyleSheet } from "react-native-unistyles";

export const version = "v1";

export const DottedGraphStyles = createStyleSheet(
  ({
    themes: {
      components: {
        graph: {
          dottedGraph: { [version]: dottedGraph },
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
            width: dottedGraph.size.container.default,
            height: dottedGraph.size.container.default,
          },
          lg: {
            width: dottedGraph.size.container.lg,
            height: dottedGraph.size.container.lg,
          },
        },
      },
    },
    number: {
      color: dottedGraph.color.text.default,
      variants: {
        variant: {
          default: {
            fontSize: dottedGraph.typography.number.default.fontSize,
            letterSpacing: dottedGraph.typography.number.default.letterSpacing,
            ...Platform.select({
              web: {
                lineHeight: dottedGraph.typography.number.default.lineHeight,
              },
            }),
          },
          lg: {
            fontSize: dottedGraph.typography.number.lg.fontSize,
            letterSpacing: dottedGraph.typography.number.lg.letterSpacing,
            ...Platform.select({
              web: {
                lineHeight: dottedGraph.typography.number.lg.lineHeight,
              },
            }),
          },
        },
      },
    },
    label: {
      color: dottedGraph.color.text.default,
      // line height of number is not working correctly on mobile
      variants: {
        variant: {
          default: {
            ...Platform.select({
              ios: {
                top: -10,
              },
              android: {
                top: -10,
              },
            }),
          },
          lg: {
            ...Platform.select({
              ios: {
                top: -20,
              },
              android: {
                top: -20,
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
            paddingTop: dottedGraph.padding.text.top.default,
          },
          lg: {
            paddingTop: dottedGraph.padding.text.top.lg,
          },
        },
      },
    },
    dot: {
      position: "absolute",
    },
  }),
);
