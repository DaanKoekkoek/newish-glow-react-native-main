import {
  Badge,
  BadgeStatus,
  Section,
  Main,
  Grid,
  Stack,
  Paragraph,
} from "@odido-portals/glow-react-native";
import React from "react";

export function BadgeDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Badge text="default" />
              <Badge text="prominence: subtle" prominence="subtle" />
              <Badge text="prominence: outline" prominence="outline" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack wrap="wrap" direction="row">
              <Badge text="blue" palette="blue" />
              <Badge text="green" palette="green" />
              <Badge text="red" palette="red" />
              <Badge text="orange" palette="orange" />
              <Badge text="yellow" palette="yellow" />
              <Badge text="pink" palette="pink" />
              <Badge text="purple" palette="purple" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack wrap="wrap" direction="row">
              <Badge text="blue" palette="blue" prominence="subtle" />
              <Badge text="green" palette="green" prominence="subtle" />
              <Badge text="red" palette="red" prominence="subtle" />
              <Badge text="orange" palette="orange" prominence="subtle" />
              <Badge text="yellow" palette="yellow" prominence="subtle" />
              <Badge text="pink" palette="pink" prominence="subtle" />
              <Badge text="purple" palette="purple" prominence="subtle" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack wrap="wrap" direction="row">
              <Badge text="blue" palette="blue" prominence="outline" />
              <Badge text="green" palette="green" prominence="outline" />
              <Badge text="red" palette="red" prominence="outline" />
              <Badge text="orange" palette="orange" prominence="outline" />
              <Badge text="yellow" palette="yellow" prominence="outline" />
              <Badge text="pink" palette="pink" prominence="outline" />
              <Badge text="purple" palette="purple" prominence="outline" />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack direction="row">
              <Badge text="Badge" inactive />
              <Badge text="Badge" prominence="subtle" inactive />
              <Badge text="Badge" prominence="outline" inactive />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function BadgeStatusScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack alignItems="flex-start">
              <>
                <Paragraph>count: 1</Paragraph>
                <BadgeStatus count={1} />
              </>
              <>
                <Paragraph>count: 999</Paragraph>
                <BadgeStatus count={999} />
              </>
              <>
                <Paragraph>variant: error</Paragraph>
                <BadgeStatus variant="error" />
              </>
              <>
                <Paragraph> variant: success</Paragraph>
                <BadgeStatus variant="success" />
              </>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
