import {
  Main,
  Section,
  Grid,
  Stack,
  StoreButton,
} from "@odido-portals/glow-react-native";
import React from "react";

export function StoreButtonScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <StoreButton brand="Apple" />
                <StoreButton brand="Apple" prominence="secondary" />
              </Stack>
              <Stack direction="row">
                <StoreButton brand="Google" />
                <StoreButton brand="Google" prominence="secondary" />
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "#000" }}>
        <Grid>
          <Grid.Column>
            <Stack direction="row">
              <StoreButton
                brand="Apple"
                prominence="secondary"
                variant="inverted"
              />
              <StoreButton
                brand="Google"
                prominence="secondary"
                variant="inverted"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
