import { createStyleSheet } from "react-native-unistyles";

const version = "v2";

export const PriceStyles = createStyleSheet(
  ({
    themes: {
      components: {
        price: {
          price: { [version]: price },
        },
      },
    },
  }) => ({
    container: {
      variants: {
        size: {
          sm: {
            rowGap: price.gap.vertical.none,
          },
          default: {
            rowGap: price.gap.vertical.none,
          },
          lg: {
            rowGap: price.gap.vertical.none,
          },
          xl: {
            rowGap: price.gap.vertical.default,
          },
        },
      },
    },
    beforeText: {
      variants: {
        size: {
          sm: {
            fontSize: price.typography.before.fontSize.default,
            lineHeight: price.typography.before.lineHeight.default,
            letterSpacing: price.typography.before.letterSpacing.default,
          },
          default: {
            fontSize: price.typography.before.fontSize.default,
            lineHeight: price.typography.before.lineHeight.default,
            letterSpacing: price.typography.before.letterSpacing.default,
          },
          lg: {
            fontSize: price.typography.before.fontSize.lg,
            lineHeight: price.typography.before.lineHeight.lg,
            letterSpacing: price.typography.before.letterSpacing.lg,
          },
          xl: {
            fontSize: price.typography.before.fontSize.lg,
            lineHeight: price.typography.before.lineHeight.lg,
            letterSpacing: price.typography.before.letterSpacing.lg,
          },
        },
        state: {
          default: {
            color: price.color.text.before.default,
          },
          // TODO: this is not correct, should be inactive
          disabled: {
            color: price.color.text.before.inactive,
          },
        },
        inverted: {
          true: {
            color: price.color.text.before.inverted,
          },
        },
      },
    },
    fromValue: {
      textDecorationLine: "line-through",
    },
    price: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    currency: {
      marginRight: price.gap.horizontal.amount.default,
    },
    priceText: {
      variants: {
        size: {
          sm: {
            fontSize: price.typography.main.fontSize.sm,
            lineHeight: price.typography.main.lineHeight.sm,
            letterSpacing: price.typography.main.letterSpacing.sm,
          },
          default: {
            fontSize: price.typography.main.fontSize.default,
            lineHeight: price.typography.main.lineHeight.default,
            letterSpacing: price.typography.main.letterSpacing.default,
          },
          lg: {
            fontSize: price.typography.main.fontSize.lg,
            lineHeight: price.typography.main.lineHeight.lg,
            letterSpacing: price.typography.main.letterSpacing.lg,
          },
          xl: {
            fontSize: price.typography.main.fontSize.xl,
            lineHeight: price.typography.main.lineHeight.xl,
            letterSpacing: price.typography.main.letterSpacing.xl,
          },
        },
        state: {
          default: {
            color: price.color.text.default,
          },
          disabled: {
            color: price.color.text.inactive,
          },
        },
        inverted: {
          true: {
            color: price.color.text.inverted,
          },
        },
      },
    },
    frequency: {
      variants: {
        size: {
          sm: {
            marginLeft: price.margin.left.frequency.sm,
          },
          default: {
            marginLeft: price.margin.left.frequency.default,
          },
          lg: {
            marginLeft: price.margin.left.frequency.lg,
          },
          xl: {
            marginLeft: price.margin.left.frequency.xl,
          },
        },
      },
    },
    priceWrapper: {
      flexDirection: "row",
    },
    priceValueWrapper: {
      flexDirection: "row",
    },
    decimalWrapper: {
      // This is necessary in combination with commaText for sm sizes to align the comma with the price.
      flexDirection: "row",
    },
    commaText: {
      left: 0,
      bottom: 0,
      variants: {
        size: {
          sm: {},
          default: {
            position: "absolute",
          },
        },
      },
    },
    taxText: {
      variants: {
        size: {
          sm: {
            fontSize: price.typography.after.fontSize.sm,
            lineHeight: price.typography.after.lineHeight.sm,
            letterSpacing: price.typography.after.letterSpacing.sm,
          },
          default: {
            fontSize: price.typography.after.fontSize.default,
            lineHeight: price.typography.after.lineHeight.default,
            letterSpacing: price.typography.after.letterSpacing.default,
          },
          lg: {
            fontSize: price.typography.after.fontSize.default,
            lineHeight: price.typography.after.lineHeight.default,
            letterSpacing: price.typography.after.letterSpacing.default,
          },
          xl: {
            fontSize: price.typography.after.fontSize.default,
            lineHeight: price.typography.after.lineHeight.default,
            letterSpacing: price.typography.after.letterSpacing.default,
          },
        },
        state: {
          default: {
            color: price.color.text.after.vat.default,
          },
          disabled: {
            color: price.color.text.after.vat.inactive,
          },
        },
        inverted: {
          true: {
            color: price.color.text.after.vat.inverted,
          },
        },
      },
    },
  }),
);
