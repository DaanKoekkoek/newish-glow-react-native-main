import {
  SegmentedTab,
  Main,
  Section,
  Grid,
} from "@odido-portals/glow-react-native";
import React from "react";
import { View, Text } from "react-native";

export function SegmentedTabScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <SegmentedTab onTabChange={() => console.log("on tab change")}>
              <SegmentedTab.Buttons
                backgroundPalette="purple"
                shadowPalette="orange"
                options={[
                  {
                    label: "Label",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label2",
                    icon: "mobile-phone",
                  },
                  {
                    label: "Label3",
                    icon: "mobile-phone",
                  },
                ]}
              />
              <SegmentedTab.Panel
                child={
                  <View>
                    <Text>Tab 1</Text>
                  </View>
                }
                index={0}
              />
              <SegmentedTab.Panel
                child={
                  <View>
                    <Text>Tab 2</Text>
                  </View>
                }
                index={1}
              />
              <SegmentedTab.Panel
                child={
                  <View>
                    <Text>Tab 3</Text>
                  </View>
                }
                index={2}
              />
            </SegmentedTab>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
