import {
  Main,
  Section,
  Grid,
  Stack,
  Heading,
} from "@odido-portals/glow-react-native";
import React from "react";

export function HeadingDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Heading size="xl">Heading text</Heading>
          </Grid.Column>
          <Grid.Column>
            <Heading size="sm" alignment="center">
              Heading text alignment center
            </Heading>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Heading size="xs">Heading text size xs</Heading>
              <Heading size="sm">Heading text size sm</Heading>
              <Heading size="md">Heading text size md</Heading>
              <Heading size="lg">Heading text size lg</Heading>
              <Heading size="xl">Heading text size xl</Heading>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
