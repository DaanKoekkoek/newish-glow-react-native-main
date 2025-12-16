import {
  Grid,
  Main,
  PhoneBrand,
  Section,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

export function PhoneBrandScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <PhoneBrand brand="Apple" />
              <PhoneBrand brand="Apple" state="inactive" />
              <PhoneBrand brand="Alcatel" />
              <PhoneBrand brand="Alcatel" state="inactive" />
              <PhoneBrand brand="Emporia" />
              <PhoneBrand brand="Emporia" state="inactive" />
              <PhoneBrand brand="Fairphone" />
              <PhoneBrand brand="Fairphone" state="inactive" />
              <PhoneBrand brand="Google" />
              <PhoneBrand brand="Google" state="inactive" />
              <PhoneBrand brand="Motorola" />
              <PhoneBrand brand="Motorola" state="inactive" />
              <PhoneBrand brand="Oppo" />
              <PhoneBrand brand="Oppo" state="inactive" />
              <PhoneBrand brand="Samsung" />
              <PhoneBrand brand="Samsung" state="inactive" />
              <PhoneBrand brand="Xiaomi" />
              <PhoneBrand brand="Xiaomi" state="inactive" />
              <PhoneBrand brand="Android" />
              <PhoneBrand brand="Android" state="inactive" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
