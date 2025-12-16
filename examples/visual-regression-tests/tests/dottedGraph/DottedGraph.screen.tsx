import {
  Main,
  Section,
  Grid,
  Stack,
  DottedGraph,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DottedGraphDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid containerStyle={{ backgroundColor: "#858585" }}>
          <Grid.Column>
            <Stack>
              <DottedGraph
                variant={24}
                percentage={12}
                label="days left"
                value="10"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function DottedGraphLargeScreen() {
  return (
    <Main>
      <Section>
        <Grid containerStyle={{ backgroundColor: "#858585" }}>
          <Grid.Column>
            <Stack>
              <DottedGraph
                variant={48}
                percentage={1}
                size="lg"
                label="days left"
                value="10"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
