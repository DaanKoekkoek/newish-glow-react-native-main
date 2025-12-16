import Svg, { Path } from "react-native-svg";
import { createStyleSheet } from "react-native-unistyles";

const versionCheckbox = "v1";

export const SwitchThemeRadioButton = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z"
        fill="#71FFD2"
      />
    </Svg>
  );
};

export const radioButtonStylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        input,
        input: {
          checkbox: { [versionCheckbox]: checkbox },
          atoms: { radio },
        },
      },
    },
  }) => {
    return {
      wrapper: {
        alignItems: "flex-start",
        gap: radio.padding.vertical,
        width: "auto",
      },
      pressable: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: input.gap.horizontal.default,
        paddingVertical: radio.padding.vertical,
        alignSelf: "stretch",
        pointerEvents: "box-none",
      },
      radio: {
        height: radio.size.default,
        width: radio.size.default,
        borderRadius: radio.radius.default,
        backgroundColor: radio.color.background.unselected.default,
        overflow: "hidden",
        borderWidth: radio.borderWidth.unselected.default,
        variants: {
          checked: {
            true: {
              borderWidth: radio.borderWidth.selected,
              borderColor: radio.color.border.selected,
            },
            false: {
              borderWidth: radio.borderWidth.unselected.default,
              borderColor: radio.color.border.unselected.default,
            },
          },
          inactive: {
            true: {
              backgroundColor: radio.color.background.inactive,
              borderWidth: radio.borderWidth.inactive,
              borderColor: radio.color.border.inactive,
            },
          },
          error: {
            true: {
              borderWidth: radio.borderWidth.error,
              borderColor: radio.color.border.error,
            },
          },
          hovered: {
            true: {
              borderColor: radio.color.border.unselected.hover,
            },
          },
          pressed: {
            true: {
              borderWidth: radio.borderWidth.unselected.pressed,
              borderColor: radio.color.border.unselected.pressed,
            },
          },
          checkedPressed: {
            true: {
              borderWidth: radio.borderWidth.selected,
              borderColor: radio.color.border.selected,
            },
          },
        },
      },
      iconContainer: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      },
      icon: {
        left: 0.5,
        bottom: 0.5,
        variants: {
          hovered: {
            true: { color: radio.color.icon.unselected.hover },
          },
          checked: { true: { color: radio.color.icon.selected } },
          inactive: { true: { color: radio.color.icon.inactive } },
        },
      },
      label: {
        variants: {
          inactive: {
            true: {
              color: checkbox.color.text.inactive,
            },
          },
        },
      },
    };
  },
);

export const radioButtonGroupStylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        input: {
          atoms: { radio },
        },
      },
    },
  }) => ({
    container: {
      alignItems: "stretch",
      flexDirection: "column",
    },
    wrapper: {
      variants: {
        direction: {
          vertical: {
            flexDirection: "column",
          },
          horizontal: {
            columnGap: radio.padding.vertical,
            flexDirection: "row",
          },
        },
      },
    },
    radioButton: (numberOfRadioButtons: number) => ({
      maxWidth: `${100 / numberOfRadioButtons}%`,
      variants: {
        direction: {
          vertical: {},
          horizontal: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
          },
        },
      },
    }),
  }),
);
