import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { stickybarDummyData } from "./mockedData";
import {
  Divider,
  StickyBar,
  type StickyBarLayout,
  type StickyBarPosition,
} from "components/index";
import { Main, Section, Grid, Paragraph } from "foundations/index";
import { Placeholder } from "_internals/Placeholder";

const Sections = () =>
  Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
    <Section key={i} variant={i % 2 === 1 ? "default" : "default"}>
      <Grid mobileSmall={6}>
        <Grid.Column>
          <Paragraph>Column 1</Paragraph>
        </Grid.Column>
        <Grid.Column>
          <Paragraph>Column 2</Paragraph>
        </Grid.Column>
      </Grid>
    </Section>
  ));

export const StickyBarScreen = ({
  position,
  layout,
}: {
  position: StickyBarPosition;
  layout: StickyBarLayout;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Main
      hasStickybar
      headerComponent={
        <>
          <View
            style={{
              paddingVertical: 8,
              backgroundColor: "white",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Grid>
              <Grid.Column>
                <Paragraph>Header</Paragraph>
              </Grid.Column>
            </Grid>
          </View>
          <Divider />
        </>
      }
      footerComponent={
        <>
          <View
            style={{
              paddingVertical: 8,
              backgroundColor: "blue",
              justifyContent: "center",
              height: 200,
            }}
          >
            <Grid>
              <Grid.Column>
                <Paragraph style={{ color: "white" }}>Footer</Paragraph>
              </Grid.Column>
            </Grid>
          </View>
          <Divider />
        </>
      }
      safeAreaInsets={insets}
    >
      <Sections />
      <StickyBar
        position={position}
        width="default"
        layout={layout}
        button={{
          text: "Button text",
          onPress: () => console.log("Checkout pressed!"),
        }}
        modal={{
          title: "Cart title",
          children: stickybarDummyData().modal,
        }}
      >
        <Placeholder />
      </StickyBar>
    </Main>
  );
};
