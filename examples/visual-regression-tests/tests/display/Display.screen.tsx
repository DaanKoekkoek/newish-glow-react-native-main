import {
  Display,
  Main,
  Section,
  Grid,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DisplayDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Display>Display text</Display>
          </Grid.Column>
          <Grid.Column>
            <Display size="sm" alignment="center">
              Display text center
            </Display>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Display size="sm">Display text sm</Display>
              <Display size="md">Display text md</Display>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
