import {
  Main,
  Section,
  Grid,
  Stack,
  Pill,
} from "@odido-portals/glow-react-native";
import React, { useState } from "react";
import { View, Pressable } from "react-native";

export function PillScreen() {
  const [disabled, setDisabled] = useState(false);

  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <View>
                <Pressable
                  testID="disableButton"
                  onPress={() => setDisabled(true)}
                />

                <Pill title="Default Pill" value="value" variant="default" />
              </View>
              <Pill
                title="Disabled default Pill"
                value="value"
                variant="default"
                disabled
              />
              <Pill variant="logo" brand="Apple" value="value" />
              <Pill variant="logo" brand="Apple" value="value" disabled />
              <Pill
                title="Selected Pill"
                value="value"
                variant="default"
                testID="pillId1"
              />
              <Pill
                title="Disabled selected Pill"
                value="value"
                variant="default"
                testID="pillId2"
                disabled={disabled}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
