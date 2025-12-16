import { Main, Section, Grid, AFM } from "@odido-portals/glow-react-native";
import React from "react";

export function AFMScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <AFM />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
