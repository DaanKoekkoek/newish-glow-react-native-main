import {
  Stack,
  Main,
  Section,
  Grid,
  NumberInput,
} from "@odido-portals/glow-react-native";
import React from "react";

export function NumberInputScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <NumberInput id="id-1" />
              <NumberInput id="id-1-small" size="sm" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <NumberInput id="id-3" state="disabled" />
              <NumberInput id="id-4" state="error" />
              <NumberInput id="id-2" state="success" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
