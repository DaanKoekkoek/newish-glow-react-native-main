import { Background } from "_internals/Background";
import { useThemeProviderContext } from "components/ThemeProvider";
import { Display } from "foundations/Display";
import { Heading } from "foundations/Heading";
import { Paragraph } from "foundations/Paragraph";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { ActionButton } from "./ActionButton";
import { LocalNavigationStyles } from "./LocalNavigation.styles";
import type { LocalNavigationProps } from "./LocalNavigation.types";

export const LocalNavigation: React.FC<LocalNavigationProps> = ({
  prominence = "default",
  titleSize = "default",
  palette = "default",
  glow = "Glow1",
  title,
  leftAction,
  rightAction,
  testID,
  ...props
}) => {
  const { styles } = useStyles(LocalNavigationStyles);
  const { theme } = useThemeProviderContext();
  const variant = props.variant;
  const backgroundVariant = prominence === "subtle" ? "default" : prominence;
  const titleSizeVariant = titleSize === "default" ? "lg" : "xl";
  let paragraph;

  if (variant === "default") {
    paragraph = props.paragraph;
  }

  return (
    <Background
      backgroundStyle={[
        styles.compoundStyleWithPalette(prominence, palette),
        styles.background,
      ]}
      variant={backgroundVariant}
      brightness={theme}
      glow={glow}
    >
      <View
        style={[
          variant === "default" && styles.containerDefault,
          variant === "compact" && styles.containerCompact,
        ]}
      >
        <View>
          <View
            style={[
              styles.actions,
              variant === "default" && styles.actionsDefault(prominence),
            ]}
          >
            <ActionButton
              testID={`${testID}-left-action`}
              position="left"
              action={leftAction}
              variant={variant}
              prominence={prominence}
            />
            {variant === "compact" && (
              <Heading
                testID={`${testID}-title`}
                style={[
                  styles.compactTitle(prominence),
                  //@ts-expect-error top padding value
                  styles.compactTitleFont(titleSize),
                ]}
                size={titleSizeVariant}
              >
                {title}
              </Heading>
            )}
            <ActionButton
              testID={`${testID}-right-action`}
              position="right"
              action={rightAction}
              variant={variant}
              prominence={prominence}
            />
          </View>
        </View>
        {variant === "default" && (
          <View style={styles.textContainer}>
            {titleSize === "default" && (
              <Heading testID={`${testID}-title`} size="xl">
                {title}
              </Heading>
            )}
            {titleSize === "lg" && (
              <Display testID={`${testID}-title`} size="md">
                {title}
              </Display>
            )}
            {paragraph && (
              <Paragraph testID={`${testID}-paragraph`}>{paragraph}</Paragraph>
            )}
          </View>
        )}
      </View>
    </Background>
  );
};
