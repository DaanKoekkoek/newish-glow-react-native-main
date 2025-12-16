import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Strong } from "foundations/Strong";
import { findAll } from "highlight-words-core";
import { useMemo } from "react";
import { Platform, Pressable, Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props {
  text: string;
  highlight?: string;
  isFocused?: boolean;
  withSearch: boolean;
  onHover: (hovered: boolean) => void;
  onSuggestionSelect?: (value: string) => void;
}
export const InputSuggestion: React.FC<Props> = ({
  text,
  isFocused,
  withSearch,
  highlight = "",
  onSuggestionSelect,
  onHover,
}) => {
  const { styles } = useStyles(stylesheet);

  const chunks = useMemo(
    () =>
      findAll({
        searchWords: [highlight],
        textToHighlight: text,
      }),
    [text, highlight],
  );

  return (
    <Pressable
      testID={`input-dropdown-suggestion-${text}`}
      key={text}
      role="button"
      {...Platform.select({
        web: {
          onPointerDown: () => onSuggestionSelect?.(text),
        },
        ios: {
          onPress: () => onSuggestionSelect?.(text),
        },
        android: {
          onPress: () => onSuggestionSelect?.(text),
        },
      })}
      onHoverIn={() => onHover(true)}
      onHoverOut={() => onHover(false)}
      style={[styles.container, isFocused && styles.containerFocused]}
    >
      {withSearch && <Icon name="search" size="sm" />}
      <Paragraph style={isFocused && styles.labelFocused} size="sm">
        {chunks.map((chunk) => {
          const result = text.substring(chunk.start, chunk.end);

          return chunk.highlight ? (
            <Text key={result} style={styles.highlighted}>
              {result}
            </Text>
          ) : (
            <Strong style={isFocused && styles.labelFocused} key={result}>
              {result}
            </Strong>
          );
        })}
      </Paragraph>
    </Pressable>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    container: {
      alignItems: "center",
      columnGap: input.gap.horizontal.default,
      flexDirection: "row",
      paddingHorizontal: input.atoms.dropdown.padding.item.horizontal,
      paddingVertical: input.atoms.dropdown.padding.item.vertical,
    },
    containerFocused: {
      backgroundColor:
        typeof input.atoms.dropdown.color.background.hover === "string"
          ? input.atoms.dropdown.color.background.hover
          : input.atoms.dropdown.color.background.hover.default,
      borderRadius: input.atoms.dropdown.radius.hover,
    },
    labelFocused: {
      color: input.atoms.dropdown.color.text.hover,
    },
    highlighted: {
      backgroundColor:
        typeof input.atoms.dropdown.color.background.match === "string"
          ? input.atoms.dropdown.color.background.match
          : input.atoms.dropdown.color.background.match.default,
    },
  }),
);
