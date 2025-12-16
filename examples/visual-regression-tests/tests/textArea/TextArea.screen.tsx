import {
  Main,
  Section,
  Grid,
  TextArea,
} from "@odido-portals/glow-react-native";
import React from "react";

export function TextAreaScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <TextArea
              label={{ text: "Label", optional: false }}
              placeholder="Type something here..."
              helperText="Helper text"
              numberOfLines={3}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
