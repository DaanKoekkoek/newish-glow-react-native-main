import { Status, Main, Grid, Section } from "@odido-portals/glow-react-native";
import React from "react";

export function StatusScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Status type="success" statusText="success" />
            <Status type="warning" statusText="warning" />
            <Status type="error" statusText="error" />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
