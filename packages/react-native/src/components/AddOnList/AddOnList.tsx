import { UL } from "@expo/html-elements";
import { LinearGradient } from "expo-linear-gradient";
import { GlowGradient } from "foundations/GlowGradient";
import { Heading, Image } from "foundations/index";
import React, { useCallback, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { View, useWindowDimensions } from "react-native";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { AddOnListStyles } from "./AddOnList.styles";
import type {
  AddOnListHeaderProps,
  AddOnListListItemProps,
  AddOnListProps,
} from "./AddOnList.types";
import { AddOnListItem } from "./AddOnListItem";

const Header = ({
  headerImage,
  headerText,
  viewHeight,
}: AddOnListHeaderProps) => {
  const { styles } = useStyles(AddOnListStyles);

  if (!headerImage && !headerText) return null;

  return (
    <View style={[styles.header, { height: viewHeight }]}>
      {headerImage ? (
        <View style={styles.imageContainer}>
          <Image
            src={headerImage.src}
            localSrc={headerImage.localSrc}
            ratio="3/1"
            backgroundImageStyle={styles.image}
            type="background"
            alt={headerImage.alt}
          />
          {headerText && (
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.00)", "rgba(0, 0, 0, 0.75)"]}
              locations={[0.5034, 1]}
              style={styles.gradientOverlay}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          )}
        </View>
      ) : (
        <GlowGradient type="Glow1" zIndex={1} brightness="dark" />
      )}
      <Heading style={styles.headingText(Boolean(headerImage))} size="md">
        {headerText}
      </Heading>
    </View>
  );
};

const AddOnList = ({
  headerImage,
  headerText,
  children,
}: AddOnListProps): JSX.Element | null => {
  const {
    theme: {
      screenSizes: { viewport },
    },
  } = useStyles(AddOnListStyles);

  const childrenArray = React.Children.toArray(children);

  const { styles } = useStyles(AddOnListStyles);
  const thereIsAHeader = !!headerImage || !!headerText;

  const { width } = useWindowDimensions();
  const isDesktop = width >= viewport.minWidth.laptop;

  //Initializing the viewHeight state with the breakpoint value for SSR purposes
  const [viewHeight, setViewHeight] = useState(
    (UnistylesRuntime.breakpoints[UnistylesRuntime.breakpoint] ?? 0) / 3,
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setViewHeight(width / 3);
  }, []);

  if (childrenArray.length === 0) return null;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Header
        headerImage={headerImage}
        headerText={headerText}
        viewHeight={viewHeight}
      />
      <UL
        style={styles.list}
        role="list"
        aria-labelledby={thereIsAHeader ? "listHeader" : undefined}
      >
        {React.Children.map(childrenArray, (child, index) => {
          if (React.isValidElement(child) && child.type === AddOnListItem) {
            const element = child as React.ReactElement<AddOnListListItemProps>;

            return (
              <AddOnListItem
                {...element.props}
                key={`${element.props.title}-${index}`}
                isLastChild={index === React.Children.count(childrenArray) - 1}
                isFirstChild={index === 0 && !thereIsAHeader}
                isDesktop={isDesktop}
              />
            );
          } else {
            return <View key={index}>{child}</View>;
          }
        })}
      </UL>
    </View>
  );
};

AddOnList.displayName = "AddOnList";

AddOnList.Item = AddOnListItem;

export { AddOnList };
