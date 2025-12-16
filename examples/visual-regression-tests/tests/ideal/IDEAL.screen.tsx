import { Main, Section, Grid, IDEAL } from "@odido-portals/glow-react-native";
import React from "react";

export function IdealScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <IDEAL />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
