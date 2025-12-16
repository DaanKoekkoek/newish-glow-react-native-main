import {
  Main,
  Section,
  Grid,
  Stack,
  AttentionText,
} from "@odido-portals/glow-react-native";
import React from "react";

export function AttentionTextScreen() {
  return (
    <Main>
      <Section>
        <Grid fluid>
          <Grid.Column>
            <Stack>
              <AttentionText icon="status-info">
                This is a default message.
              </AttentionText>
              <AttentionText
                variant="error"
                icon="status-info"
                size="sm"
                children="This is a small error message."
              />
              <AttentionText>Just a message without icon.</AttentionText>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
