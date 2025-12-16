import { usePrefetchImage } from "_global-hooks";
import { resolveThemePrimitives } from "_theming/resolveThemePrimitives";
import { useSectionContext } from "foundations/Section/SectionContext";
import { Display, Heading, Image, Paragraph } from "foundations/index";
import React, { useEffect } from "react";
import { View } from "react-native";
import {
  useStyles,
  createStyleSheet,
  UnistylesRuntime,
} from "react-native-unistyles";

import type {
  SubscriptionHeroProps,
  HeroListItemProps,
  HeroActionProps,
} from "./SubscriptionHero.types";
import { ActionButtonGroup } from "../ActionButton";
import { DefaultList } from "../DefaultList";
import { useSubscriptionHeroContext } from "./SubscriptionHeroContext";
import { useTopNavigationContext } from "../TopNavigation/TopNavigationContext";

const version = "v1";

const SubscriptionHero = ({
  list,
  actions,
  title,
  titleSecondary,
  image,
  palette,
}: SubscriptionHeroProps) => {
  const { styles } = useStyles(stylesheet);
  const { sectionPalette } = useSectionContext();
  const { updateTopNavigationTitle, updateOpacityOffset } =
    useTopNavigationContext();

  const { setHasSubscriptionHero } = useSubscriptionHeroContext();

  const slicedList = React.Children.toArray(list).slice(0, 5);
  const slicedActions = React.Children.toArray(actions).slice(0, 3);
  const isValidImagePath = usePrefetchImage(image?.src || image?.localSrc);

  useEffect(() => {
    if (title) {
      updateTopNavigationTitle?.(
        `${title}${titleSecondary ? ` ${titleSecondary}` : ""}`,
      );
    }

    const colorPalette = palette || sectionPalette;
    if (colorPalette !== undefined) {
      setHasSubscriptionHero({
        colorPalette,
      });
    }

    return () => {
      setHasSubscriptionHero(undefined);
    };
  }, [
    updateTopNavigationTitle,
    title,
    titleSecondary,
    setHasSubscriptionHero,
    palette,
    sectionPalette,
  ]);

  return (
    <View
      testID="subscription-hero"
      style={[
        styles.container,
        styles.backgroundColour(palette || sectionPalette),
      ]}
    >
      <View style={styles.content}>
        <View style={styles.copy}>
          <View
            style={styles.copyHeading}
            onLayout={(event) => {
              const { y, height } = event.nativeEvent.layout;
              updateOpacityOffset?.({ y, height });
            }}
          >
            <Heading size="lg" as="h3">
              {title}
            </Heading>
            <Display size="sm">{titleSecondary}</Display>
          </View>
          <DefaultList variant="icon">
            {slicedList.map((item, index) =>
              React.cloneElement(item as React.ReactElement, { key: index }),
            )}
          </DefaultList>
        </View>
        {!!image && isValidImagePath ? (
          <View style={styles.imageContainer}>
            <Image
              src={image.src}
              localSrc={image.localSrc}
              alt={image.alt}
              imageStyle={styles.image}
              resizeMode={image.resizeMode}
              type="foreground"
              ratio="4/3"
            />
          </View>
        ) : (
          !!image && <Paragraph>{image.alt}</Paragraph>
        )}
      </View>
      <View style={styles.actions}>
        <ActionButtonGroup>
          {slicedActions.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </ActionButtonGroup>
      </View>
    </View>
  );
};

const ListItem = ({ icon, children }: HeroListItemProps) => {
  return (
    <DefaultList.Item icon={!icon ? "checkmark" : icon}>
      {children}
    </DefaultList.Item>
  );
};

ListItem.displayName = "SubscriptionHero.ListItem";
SubscriptionHero.ListItem = ListItem;

const Action = ({ icon, children, onPress }: HeroActionProps) => {
  return (
    <ActionButtonGroup.Button
      onPress={onPress}
      icon={icon}
      label={children ? children : ""}
    />
  );
};

Action.displayName = "SubscriptionHero.Action";
SubscriptionHero.Action = Action;

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: {
        hero: {
          subscriptionHero: { [version]: subscriptionHero },
        },
      },
    },
  }) => ({
    container: {
      rowGap: subscriptionHero.gap.default,
      overflow: "hidden",
      paddingTop: subscriptionHero.padding.top,
      paddingHorizontal: subscriptionHero.padding.horizontal,
      paddingBottom: subscriptionHero.padding.bottom,
      marginHorizontal: subscriptionHero.margin.horizontal,
      borderRadius: subscriptionHero.radius.default,
      minWidth: subscriptionHero.size.minWidth.default,
      maxWidth: subscriptionHero.size.maxWidth.default,
    },
    backgroundColour: (palette) => {
      return resolveThemePrimitives({
        value: subscriptionHero.color.background.default,
        property: "backgroundColor",
        themeName: UnistylesRuntime.themeName,
        selectedVariant: palette ? palette : "blue",
      });
    },
    content: {
      flexDirection: "row",
      minHeight: subscriptionHero.size.minHeight.content,
    },
    copy: {
      maxWidth: subscriptionHero.size.maxWidth.copy,
      minWidth: subscriptionHero.size.minWidth.copy,
      gap: subscriptionHero.gap.default,
      flex: 1,
      zIndex: 1,
      position: "relative",
      alignSelf: "center",
    },
    copyHeading: {
      rowGap: subscriptionHero.gap.sm,
    },
    actions: {
      maxWidth: subscriptionHero.size.maxWidth.actionButtons,
    },
    imageContainer: {
      flex: 1,
      width: subscriptionHero.size.visual.width,
      height: subscriptionHero.size.visual.height,
      marginTop: "auto",
      marginBottom: "auto",
    },
    image: {
      flex: 1,
      width: subscriptionHero.size.visual.width,
      alignSelf: "center",
    },
  }),
);

export { SubscriptionHero };
