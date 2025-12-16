import {
  Main,
  Section,
  Grid,
  Paragraph,
  Divider,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DividerScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Paragraph>prominence: default, variant: default</Paragraph>
            <Divider />
          </Grid.Column>
          <Grid.Column>
            <Paragraph>prominence: default, variant: strong</Paragraph>
            <Divider variant="strong" />
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Paragraph>prominence: subtle, variant: default</Paragraph>
            <Divider prominence="subtle" />
          </Grid.Column>
          <Grid.Column>
            <Paragraph>prominence: subtle, variant: strong</Paragraph>
            <Divider prominence="subtle" variant="strong" />
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "#000" }}>
        <Grid>
          <Grid.Column>
            <Divider inverted />
          </Grid.Column>
          <Grid.Column>
            <Divider prominence="subtle" variant="strong" inverted />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
