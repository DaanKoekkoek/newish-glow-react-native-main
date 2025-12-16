import {
  Stack,
  Main,
  Section,
  Grid,
  InputField,
} from "@odido-portals/glow-react-native";
import React from "react";

export function InputDatePickerScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <InputField type="date" value="20/10/2010" />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
