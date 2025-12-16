import {
  Main,
  Section,
  Grid,
  Paragraph,
  Stack,
  Strong,
} from "@odido-portals/glow-react-native";
import React from "react";

export function ParagraphDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Paragraph>
              Text <Strong>and bolded</Strong> default
            </Paragraph>
          </Grid.Column>
          <Grid.Column>
            <Paragraph alignment="center">
              Text <Strong>and bolded</Strong> center
            </Paragraph>
          </Grid.Column>
          <Grid.Column>
            <Paragraph alignment="right">
              Text <Strong>and bolded</Strong> right
            </Paragraph>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Paragraph size="xxs">
                Text <Strong>and bolded</Strong> xxs
              </Paragraph>
              <Paragraph size="xs">
                Text <Strong>and bolded</Strong> xs
              </Paragraph>
              <Paragraph size="sm">
                Text <Strong>and bolded</Strong> sm
              </Paragraph>
              <Paragraph size="default">
                Text <Strong>and bolded</Strong> default
              </Paragraph>
              <Paragraph size="lg">
                Text <Strong>and bolded</Strong> lg
              </Paragraph>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
