import {
  Spinner,
  Stack,
  Section,
  Grid,
  Main,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SpinnerScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Spinner />
              <Spinner size="sm" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
