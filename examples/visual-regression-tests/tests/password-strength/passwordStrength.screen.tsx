import {
  PasswordStrength,
  Main,
  Section,
  Grid,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

export function PasswordStrengthScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <PasswordStrength password="hola" />
              <PasswordStrength password="hola!1" />
              <PasswordStrength password="hola!1Aloh" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
