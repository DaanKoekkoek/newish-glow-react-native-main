import {
  Main,
  Section,
  Grid,
  Stack,
  Logos,
} from "@odido-portals/glow-react-native";
import React from "react";

export function LogosDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Logos brand="odido" size="default" />
              <Logos brand="odido" size="lg" />
              <Logos brand="odido" size="xl" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Logos brand="ben" size="default" />
              <Logos brand="ben" size="lg" />
              <Logos brand="ben" size="xl" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Logos brand="simpel" size="default" />
              <Logos brand="simpel" size="lg" />
              <Logos brand="simpel" size="xl" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function LogosInvertedScreen() {
  return (
    <Main>
      <Section style={{ backgroundColor: "#000" }}>
        <Grid>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Logos brand="odido" size="default" variant="inverted" />
              <Logos brand="odido" size="lg" variant="inverted" />
              <Logos brand="odido" size="xl" variant="inverted" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Logos brand="ben" size="default" variant="inverted" />
              <Logos brand="ben" size="lg" variant="inverted" />
              <Logos brand="ben" size="xl" variant="inverted" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Logos brand="simpel" size="default" variant="inverted" />
              <Logos brand="simpel" size="lg" variant="inverted" />
              <Logos brand="simpel" size="xl" variant="inverted" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
