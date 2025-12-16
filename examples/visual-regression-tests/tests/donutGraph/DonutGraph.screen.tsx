import {
  Main,
  Section,
  Grid,
  Stack,
  DonutGraph,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DonutGraphDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid containerStyle={{ backgroundColor: "#858585" }}>
          <Grid.Column>
            <Stack>
              <DonutGraph percentage={50} label="days left" value="10" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function DonutGraphLargeScreen() {
  return (
    <Main>
      <Section>
        <Grid containerStyle={{ backgroundColor: "#858585" }}>
          <Grid.Column>
            <Stack>
              <DonutGraph
                percentage={100}
                size="lg"
                label="days left"
                value="20"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
