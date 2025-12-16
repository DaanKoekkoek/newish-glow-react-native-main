import { UL, LI } from "@expo/html-elements";
import { Attention } from "_internals/Attention";
import { mergeTestIds } from "_utility";
import { useThemeProviderContext } from "components/index";
import { Icon } from "foundations/Icon";
import type { IconNames } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { useSectionContext } from "foundations/Section/SectionContext";
import React, { useState, createContext, useContext } from "react";
import type { GestureResponderEvent } from "react-native";
import { Pressable, Text, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { listStyles } from "./List.style";
import type { ListItemProps, ListProps, ListContextProps } from "./List.types";
import { BadgeStatus } from "../BadgeStatus";
import { Button } from "../Button";
import { BaseButton } from "../Button/BaseButton";
import { Divider } from "../Divider";
import { Toggle } from "../Toggle";

/**
 * List component that renders a list of items using the UL and LI HTML elements.
 * It supports customizable backgrounds and automatically inserts dividers between items.
 */
const ListContext = createContext<ListContextProps>({
  background: "default",
});

export const useListContext = () => useContext(ListContext);

const List = ({
  background = "default",
  children,
  testID,
  palette,
}: ListProps): JSX.Element => {
  const { styles } = useStyles(listStyles, {
    background: background === "default" ? undefined : background,
  });
  const { sectionPalette } = useSectionContext();

  const listTestID = mergeTestIds(testID, testID, "list");
  const listItemTestID = mergeTestIds(testID, "list-item");

  const itemCount = React.Children.count(children);
  const renderChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const isTop = index === 0;
      const isBottom = index === itemCount - 1;
      const isStandalone = itemCount === 1;

      return (
        <LI
          testID={listItemTestID}
          style={[
            isTop && styles.itemTop,
            isBottom && styles.itemBottom,
            isStandalone && styles.itemStandalone,
          ]}
        >
          <View style={styles.itemWrapper}>{child}</View>
          {!isStandalone && !isBottom && (
            <View style={styles.divider}>
              <Divider
                prominence="subtle"
                inverted={background === "default"}
              />
            </View>
          )}
        </LI>
      );
    }
    return child;
  });

  return (
    <ListContext.Provider value={{ background }}>
      <UL
        testID={listTestID}
        style={[
          styles.list,
          styles.listPalette(background, palette || sectionPalette),
        ]}
      >
        {renderChildren}
      </UL>
    </ListContext.Provider>
  );
};

const ListItem = ({
  onPress,
  icon,
  title,
  description1,
  description2,
  detail,
  attention,
  action,
  clickIndicator = "chevron-right",
  notification,
  clickable = false,
  Wrapper = View,
  wrapperProps = {},
}: ListItemProps) => {
  const { background } = useListContext();
  const { styles } = useStyles(listStyles, {
    background: background === "default" ? undefined : background,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleTogglePress = (
    newSelected?: boolean,
    event?: GestureResponderEvent,
  ) => {
    setIsSelected(newSelected || false);
    onPress?.(event);
  };

  const { brand } = useThemeProviderContext();

  const chevronIcon = (
    <Text style={styles.itemIcon2}>
      <Icon
        brand={brand !== "simpel" ? brand : undefined}
        name={clickIndicator}
        size="sm"
        solid={!!isHovered}
      />
    </Text>
  );

  const getActionComponent = () => {
    switch (action?.type) {
      case Button: {
        return (
          <BaseButton
            size="sm"
            onPress={onPress}
            isHovered={isHovered}
            isPressed={false}
            pointerEvents="none"
          >
            {(action as React.ReactElement).props.children}
          </BaseButton>
        );
      }
      case Toggle: {
        return (
          <Toggle
            ariaLabel="list item"
            onPress={handleTogglePress}
            isSelected={isSelected}
            isHovered={isHovered}
          />
        );
      }
    }

    return (
      <>
        {!!action && action}
        {!!notification && <BadgeStatus count={notification} size="default" />}
        {!!clickable && chevronIcon}
      </>
    );
  };

  const itemContent = (
    <View style={styles.itemWrapperContent}>
      <View style={styles.itemContentWrapper}>
        {icon && (
          <Icon
            brand={brand !== "simpel" ? brand : undefined}
            name={icon as IconNames}
            style={styles.itemIcon1}
            size="default"
          />
        )}
        <View style={styles.itemContent}>
          {title && (
            <Paragraph size="sm" style={styles.itemContentTitle}>
              {title}
            </Paragraph>
          )}
          {description1 && (
            <Paragraph size="sm" style={styles.itemContentDescription}>
              {description1}
            </Paragraph>
          )}
          {description2 && (
            <Paragraph size="sm" style={styles.itemContentDescription}>
              {description2}
            </Paragraph>
          )}
          {attention && (
            <Attention
              {...attention}
              style={styles.attention(attention.variant || "information")}
              size="sm"
            />
          )}
        </View>
      </View>
      <View style={styles.itemAction}>
        {detail && (
          <Paragraph size="sm" style={styles.itemContentDetail}>
            {detail}
          </Paragraph>
        )}
        {getActionComponent()}
      </View>
    </View>
  );

  return onPress ? (
    <Pressable
      style={styles.item}
      onPress={(event) => {
        if (action?.type === Toggle) setIsSelected(!isSelected); // Update toggle state
        onPress?.(event);
      }}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      role="button"
    >
      {itemContent}
    </Pressable>
  ) : (
    <Wrapper style={styles.item} {...wrapperProps}>
      {itemContent}
    </Wrapper>
  );
};

ListItem.displayName = "List.Item";

List.Item = ListItem;

export { List };
