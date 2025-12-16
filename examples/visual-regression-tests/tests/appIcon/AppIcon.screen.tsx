import {
  Main,
  Section,
  Grid,
  Stack,
  AppIcon,
} from "@odido-portals/glow-react-native";
import React from "react";

export function AppIconScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <AppIcon app="Klik & Klaar" brand="Odido" />
                <AppIcon app="Klik & Klaar" brand="Odido" disabled />
              </Stack>
              <Stack direction="row">
                <AppIcon app="TV" brand="Odido" />
                <AppIcon app="TV" brand="Odido" disabled />
              </Stack>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <AppIcon app="TV Anywhere" brand="Odido" />
                <AppIcon app="TV Anywhere" brand="Odido" disabled />
              </Stack>
              <Stack direction="row">
                <AppIcon app="Thuis Veilig Online" brand="Odido" />
                <AppIcon app="Thuis Veilig Online" brand="Odido" disabled />
              </Stack>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <AppIcon app="Overal Veilig Online" brand="Odido" />
                <AppIcon app="Overal Veilig Online" brand="Odido" disabled />
              </Stack>
              <Stack direction="row">
                <AppIcon app="Hosted Voice" brand="Odido" />
                <AppIcon app="Hosted Voice" brand="Odido" disabled />
              </Stack>
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <AppIcon app="Essential" brand="Odido" />
                <AppIcon app="Essential" brand="Odido" disabled />
              </Stack>
              <Stack direction="row">
                <AppIcon app="Klantkampioen" brand="Odido" />
                <AppIcon app="Klantkampioen" brand="Odido" disabled />
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
