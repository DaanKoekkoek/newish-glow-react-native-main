import type { BreakpointKeys } from "_theming/breakpoints";
import { Button } from "components/Button";
import { TextLink } from "components/TextLink";
import { useThemeProviderContext } from "components/ThemeProvider";
import { Icon } from "foundations/Icon";
import { View } from "react-native";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";

import { LocalNavigationStyles } from "./LocalNavigation.styles";
import type {
  Action,
  ActionPosition,
  Prominence,
  Variant,
} from "./LocalNavigation.types";

const buttonContent = ({
  showTitle,
  position,
  action,
  componentType,
}: {
  showTitle: boolean;
  position: ActionPosition;
  action?: Action;
  componentType: "TextLink" | "Button";
}) => {
  const buttonChildren = [];

  if (position === "right" && showTitle && action) {
    buttonChildren.push(action.title);
  }

  if (action) {
    const IconComponent = componentType === "Button" ? Button.Icon : Icon;

    buttonChildren.push(<IconComponent name={action.icon} />);
  }

  if (position === "left" && showTitle && action) {
    buttonChildren.push(action.title);
  }

  return buttonChildren;
};

const SHOW_TITLE_BREAKPOINTS = new Set<BreakpointKeys>([
  "tablet",
  "desktop",
  "laptop",
]);

export const ActionButton = ({
  action,
  position = "left",
  prominence,
  variant,
  testID,
}: {
  action?: Action;
  position: ActionPosition;
  prominence: Prominence;
  variant: Variant;
  testID?: string;
}) => {
  const { styles } = useStyles(LocalNavigationStyles, {
    position,
  });
  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const { brand } = useThemeProviderContext();

  const textLinkPalette = brand === "switch" ? "neutral" : undefined;

  const showTitle =
    variant === "default" ||
    (variant === "compact" && SHOW_TITLE_BREAKPOINTS.has(breakpoint));

  if (prominence === "emphasised") {
    return (
      <View style={[styles.action, styles.actionCompactButton]}>
        {/* Additional View wraper is needed to override align-self property */}
        {action && (
          <View>
            <Button
              testID={`${testID}-button-${position}`}
              inverted
              size="sm"
              onPress={action.onPress}
            >
              {buttonContent({
                position,
                showTitle,
                action,
                componentType: "Button",
              })}
            </Button>
          </View>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.action,
        variant === "compact" && styles.actionCompactTextLink,
      ]}
    >
      {/* Additional View wraper is needed to override align-self property */}
      {action && (
        <View>
          <TextLink
            size="sm"
            palette={textLinkPalette}
            onPress={action.onPress}
          >
            {buttonContent({
              position,
              showTitle,
              action,
              componentType: "TextLink",
            })}
          </TextLink>
        </View>
      )}
    </View>
  );
};
