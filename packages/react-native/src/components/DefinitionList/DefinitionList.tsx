import { LI, UL } from "@expo/html-elements";
import { mergeTestIds } from "_utility";
import { Paragraph, Strong } from "foundations/index";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type {
  DefinitionListProps,
  DefinitionListItemProps,
} from "./DefinitionList.types";

/**
 * `DefinitionList` is a component that renders a list of terms and their descriptions,
 * similar to a traditional HTML definition list (`<dl>`). It utilizes custom list elements
 * (`UL` and `LI` from `@expo/html-elements`) for semantic structure and supports styling
 * customization through a `color` prop.
 */
const DefinitionList = ({
  color = "default",
  children,
  testID,
}: DefinitionListProps) => {
  const { styles } = useStyles(stylesheet, {
    color: color === "default" ? undefined : color,
  });

  const definitionListTestID = mergeTestIds(testID, "def-list");
  const definitionListItemTestID = mergeTestIds(testID, "def-list-item");

  return (
    <UL testID={definitionListTestID} style={styles.list}>
      {React.Children.map(children, (child, index) => {
        const element = child as React.ReactElement;
        if (!React.isValidElement(element)) return null;

        return (
          <LI testID={definitionListItemTestID} style={styles.item} key={index}>
            {(element.props as { title?: string }).title && (
              <Strong size="xs" style={styles.itemTitle}>
                {(element.props as { title?: string }).title}
              </Strong>
            )}
            {(element.props as { description?: string }).description && (
              <Paragraph size="sm" style={styles.itemDescription}>
                {(element.props as { description?: string }).description}
              </Paragraph>
            )}
          </LI>
        );
      })}
    </UL>
  );
};

/**
 * Placeholder component for `DefinitionListItem`. Intended for use as a semantic
 * and structural element within `DefinitionList`. Actual rendering logic is
 * handled by `DefinitionList`, which extracts and uses the props of this component.
 *
 * This component is used within `DefinitionList` and is not intended for standalone use.
 */
const DefinitionListItem = (_props: DefinitionListItemProps) => null;

DefinitionListItem.displayName = "DefinitionList.Item";

DefinitionList.Item = DefinitionListItem;

const version = "v1";

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        lists: {
          definitionList: { [version]: definitionList },
        },
      },
    },
  }) => ({
    list: {
      flexDirection: "column",
      gap: definitionList.gap.vertical,
    },
    item: {
      flexDirection: "column",
      gap: definitionList.gap.vertical,
    },
    itemTitle: {
      variants: {
        color: {
          inverted: {
            color: definitionList.color.text.inverted,
          },
          default: {
            color: definitionList.color.text.default,
          },
        },
      },
    },
    itemDescription: {
      variants: {
        color: {
          inverted: {
            color: definitionList.color.text.inverted,
          },
          default: {
            color: definitionList.color.text.default,
          },
        },
      },
    },
  }),
);

export { DefinitionList, DefinitionListItem };
