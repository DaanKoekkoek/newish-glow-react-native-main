import { createStyleSheet } from "react-native-unistyles";

const version = "v1";

export const summaryListStyles = createStyleSheet(
  ({
    themes: {
      components: {
        lists: {
          atoms,
          summaryList: { [version]: summaryList },
        },
      },
    },
  }) => ({
    list: {
      width: "100%",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    listItem: {
      backgroundColor: summaryList.color.background.default,
      width: "100%",
    },
    item: {
      flexDirection: "row",
      columnGap: summaryList.gap.horizontal,
      paddingVertical: summaryList.gap.vertical,
    },
    additionalContent: {
      paddingBottom: summaryList.gap.vertical,
    },
    additionalContentText: {
      variants: {
        state: {
          default: {
            opacity: summaryList.opacity.additionalContent.default / 100,
          },
          inactive: {
            opacity: summaryList.opacity.additionalContent.inactive / 100,
          },
        },
      },
    },
    content: {
      gap: summaryList.gap.content.vertical,
      flexGrow: 1,
      flexShrink: 1,
      alignItems: "flex-start",
    },
    topContent: {
      gap: summaryList.gap.text.vertical.default,
    },
    headingContent: {
      flexShrink: 1,
    },
    footerContent: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      gap: summaryList.gap.horizontal,
    },
    heading: {
      variants: {
        state: {
          default: {
            color: summaryList.color.text.heading.default,
          },
          inactive: {
            color: summaryList.color.text.inactive,
          },
        },
      },
    },
    subheading: {
      variants: {
        state: {
          default: {
            color: summaryList.color.text.subheading.default,
          },
          inactive: {
            color: summaryList.color.text.inactive,
          },
        },
      },
    },
    image: {
      marginBottom: "auto",
      height: summaryList.size.image.height,
      width: summaryList.size.image.width,
      variants: {
        state: {
          default: {
            opacity: summaryList.opacity.image.default / 100,
          },
          inactive: {
            opacity: summaryList.opacity.image.inactive / 100,
          },
        },
      },
    },
    actions: {
      flexDirection: "row",
      flexShrink: 1,
      flexWrap: "wrap",
      gap: atoms.summaryList.actions.gap.horizontal,
    },
    actionButtons: {
      flexDirection: "row",
    },
    price: {
      marginLeft: "auto",
    },
  }),
);
