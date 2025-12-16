import {
  Main,
  Section,
  Grid,
  Stack,
  Addon,
} from "@odido-portals/glow-react-native";
import React from "react";

export function AddonScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Addon name="Amazon Prime" size="default" />
              <Stack direction="row">
                <Addon name="Amazon Prime" size="sm" />
                <Addon name="Amazon Prime" size="xs" />
              </Stack>
              <Addon name="Amazon Prime" size="default" state="inactive" />
              <Stack direction="row">
                <Addon name="Amazon Prime" size="sm" state="inactive" />
                <Addon name="Amazon Prime" size="xs" state="inactive" />
              </Stack>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Addon name="HBO Max" size="default" />
              <Stack direction="row">
                <Addon name="HBO Max" size="sm" />
                <Addon name="HBO Max" size="xs" />
              </Stack>
              <Addon name="HBO Max" size="default" state="inactive" />
              <Stack direction="row">
                <Addon name="HBO Max" size="sm" state="inactive" />
                <Addon name="HBO Max" size="xs" state="inactive" />
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
