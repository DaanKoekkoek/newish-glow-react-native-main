import {
  Main,
  Section,
  Grid,
  Addon,
  AddOnList,
} from "@odido-portals/glow-react-native";
import React from "react";

export function AddOnListScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <AddOnList
              headerText="header"
              children={[
                <AddOnList.Item
                  isFirstChild
                  isLastChild={false}
                  actionLabel="Button"
                  addOn={<Addon name="Amazon Prime" size="sm" />}
                  title="item 1"
                  description="description"
                  onPress={() => {}}
                />,
                <AddOnList.Item
                  isFirstChild={false}
                  isLastChild
                  actionLabel="Button 2"
                  addOn={<Addon name="HBO Max" size="sm" />}
                  title="item 2"
                  description="description 2"
                  onPress={() => {}}
                />,
              ]}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
