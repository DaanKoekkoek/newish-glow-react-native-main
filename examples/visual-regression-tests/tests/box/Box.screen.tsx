import {
  Box,
  Grid,
  Paragraph,
  Main,
  Section,
} from "@odido-portals/glow-react-native";
import React from "react";

export function BoxDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Box prominence="emphasised" gradient="Glow4">
              <Paragraph>prominence: emphasised, gradient: Glow4</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column>
            <Box prominence="outline">
              <Paragraph>prominence: outline</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column>
            <Box prominence="color">
              <Paragraph>prominence: color</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column>
            <Box prominence="color" size="sm">
              <Paragraph>prominence: color, size: sm</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
