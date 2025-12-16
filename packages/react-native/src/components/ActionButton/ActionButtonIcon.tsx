import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import type { CommonPalette } from "_theming/tokenLoader";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import type { ViewStyle } from "react-native";
import type { UnistylesValues } from "react-native-unistyles";
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from "react-native-unistyles";

import type {
  ActionButtonIconProps,
  ActionButtonProminence,
} from "./ActionButton.types";
import { Button } from "../Button";
import { Spinner } from "../Spinner";

const version = "v1";

export const ActionButtonIcon = ({
  onPress,
  prominence = "default",
  inverted,
  size = "default",
  state,
  icon,
  style,
  palette = "default",
  ...props
}: ActionButtonIconProps) => {
  const { styles } = useStyles(stylesheet, {
    prominence: prominence === "default" ? undefined : prominence,
    state,
  });
  const { brand } = useThemeProviderContext();

  return (
    <Button
      state={state}
      inverted={inverted}
      prominence={prominence}
      onPress={onPress}
      baseStyle={
        [
          styles.actionButtonIcon,
          styles.actionButtonPadding(prominence),
          style,
        ] as ViewStyle
      }
      {...props}
      palette={palette}
    >
      {icon &&
        (state && state === "loading" ? (
          <Spinner
            size={size === "default" ? "sm" : "default"}
            style={styles.actionButtonIcon}
          />
        ) : (
          <Icon
            brand={brand !== "simpel" ? brand : undefined}
            name={icon}
            size={size}
            style={styles.iconColor(palette)}
          />
        ))}
    </Button>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        button: {
          actionButton: { [version]: actionButton },
        },
      },
    },
  }) => ({
    iconColor: (palette: CommonPalette) => {
      return {
        color: actionButton.color.icon.default.default,
        variants: {
          prominence: {
            emphasised: {
              ...resolveThemePrimitives({
                value: actionButton.color.icon.emphasised.default,
                property: "color",
                themeName: UnistylesRuntime.themeName,
                selectedVariant: palette,
              }),
            },
          },
        },
      };
    },
    actionButtonIcon: {
      alignSelf: "center",
      justifyContent: "center",
      variants: {
        prominence: {
          default: {
            color: actionButton.color.icon.default.default,
          },
          emphasised: {
            color: actionButton.color.icon.emphasised.default,
            backgroundColor: actionButton.color.background.emphasised.default,
          },
        },
        state: {
          loading: {
            color: actionButton.color.icon.default.loading,
          },
          disabled: {
            color: actionButton.color.icon.default.inactive,
          },
        },
      },
    },
    actionButtonPadding: (prominence: ActionButtonProminence) => {
      const basePadding: UnistylesValues = {};
      basePadding.paddingHorizontal =
        actionButton.padding.button.horizontal[prominence];
      basePadding.paddingVertical =
        actionButton.padding.button.vertical[prominence];
      return basePadding;
    },
  }),
);
