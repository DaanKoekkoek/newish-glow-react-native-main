import { ViewWithBoxShadow } from "_utility";
import { TextLink } from "components/TextLink";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Platform, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { AutoSuggestion } from "./Input.types";
import { InputSuggestion } from "./InputSuggestion";

const CODE_KEY_ARROW_UP = 38;
const CODE_KEY_ARROW_DOWN = 40;
const CODE_KEY_ENTER = 13;
const NOT_SELECTED = -1;

export interface InputDropdownRef {
  onKeyPress: (keyCode: number) => void;
}

interface Props {
  value?: string;
  testID?: string;
  isFocused?: boolean;
  withLabel: boolean;
  withSearch: boolean;
  autoSuggestions: AutoSuggestion[];
  autoSuggestCategory?: boolean;
  onSearch?: () => void;
  onSuggestionSelect?: (text: string) => void;
}

export const InputDropdown = React.forwardRef<InputDropdownRef, Props>(
  (
    {
      value,
      testID,
      withLabel,
      withSearch,
      isFocused,
      autoSuggestCategory = false,
      autoSuggestions = [],
      onSuggestionSelect,
      onSearch,
    },
    ref,
  ) => {
    const { styles } = useStyles(stylesheet);
    const [selectedIndex, setSelectedIndex] = useState(NOT_SELECTED);

    useEffect(() => {
      setSelectedIndex(NOT_SELECTED);
    }, [isFocused, value]);

    const matches = useMemo(() => {
      if (!value || value?.length < 2) {
        return [];
      }

      return autoSuggestions
        .filter(
          (item) =>
            item.text.toLowerCase().includes(value.toLowerCase()) ||
            (autoSuggestCategory &&
              item.category?.toLowerCase().includes(value.toLowerCase())),
        )
        .slice(0, 5);
    }, [value, autoSuggestions, autoSuggestCategory]);

    const onHover = (hovered: boolean, index: number) => {
      if (hovered) {
        setSelectedIndex(index);
      } else {
        setSelectedIndex(NOT_SELECTED);
      }
    };

    useImperativeHandle(ref, () => {
      return {
        onKeyPress(keyCode) {
          if (!isFocused) {
            return;
          }

          if (keyCode === CODE_KEY_ARROW_DOWN) {
            setSelectedIndex((prev) =>
              prev + 1 >= matches.length ? 0 : prev + 1,
            );
          }

          if (keyCode === CODE_KEY_ARROW_UP) {
            setSelectedIndex((prev) =>
              prev - 1 < 0 ? matches.length - 1 : prev - 1,
            );
          }

          if (keyCode === CODE_KEY_ENTER && selectedIndex !== NOT_SELECTED) {
            onSuggestionSelect?.(matches[selectedIndex].text);
          }
        },
      };
    }, [isFocused, matches, onSuggestionSelect, selectedIndex]);

    return matches.length && isFocused ? (
      <ViewWithBoxShadow
        testID={testID}
        shadowStylePreset="right"
        style={[
          styles.container,
          withLabel ? styles.positionTopWithLabel : styles.positionTop,
        ]}
      >
        {withSearch && (
          <Paragraph style={styles.header} size="xs">
            Zoek op
          </Paragraph>
        )}
        <View>
          {matches.map((item, index) => {
            return (
              <View key={item.value}>
                {autoSuggestCategory &&
                  item.category !== matches[index - 1]?.category && (
                    <Paragraph
                      testID={`${testID}-category-${item.category}`}
                      style={styles.category}
                      size="xs"
                    >
                      {item.category}
                    </Paragraph>
                  )}
                <InputSuggestion
                  key={item.value}
                  isFocused={selectedIndex === index}
                  text={item.text}
                  highlight={value}
                  withSearch={withSearch}
                  onHover={(hovered) => onHover(hovered, index)}
                  onSuggestionSelect={onSuggestionSelect}
                />
              </View>
            );
          })}
        </View>
        {withSearch && (
          <TextLink size="xs" onPress={onSearch}>
            {`Zoek op ‘${value}’`}
            <Icon size="sm" name="arrow-right" />
          </TextLink>
        )}
      </ViewWithBoxShadow>
    ) : null;
  },
);

const borderSize = (border: number) =>
  Platform.OS === "android" ? border * 2 : 0;

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        input,
        foundations: {
          typography: { textStyles },
        },
      },
    },
  }) => ({
    container: {
      columnGap: input.gap.horizontal.default,
      borderRadius: input.atoms.dropdown.radius.default,
      backgroundColor: input.atoms.dropdown.color.background.default,
      paddingVertical: input.atoms.dropdown.padding.list.horizontal,
      paddingHorizontal: input.atoms.dropdown.padding.list.horizontal,
      position: "absolute",
      width: "100%",
      gap: input.atoms.dropdown.gap.horizontal,
    },
    positionTop: {
      top:
        input.atoms.field.padding.vertical.default * 2 +
        (Platform.OS === "ios"
          ? textStyles.v1.paragraph.lineHeight.xs
          : textStyles.v1.paragraph.lineHeight.sm) +
        borderSize(input.borderWidth.default),
    },
    positionTopWithLabel: {
      top:
        input.gap.vertical.default +
        textStyles.v1.paragraph.lineHeight.sm +
        input.atoms.field.padding.vertical.default * 2 +
        (Platform.OS === "ios"
          ? textStyles.v1.paragraph.lineHeight.xs
          : textStyles.v1.paragraph.lineHeight.sm) +
        borderSize(input.borderWidth.default),
    },
    category: {
      color: input.atoms.dropdown.color.text.subtle,
    },
    header: {
      color: input.atoms.dropdown.color.text.subtle,
    },
  }),
);
