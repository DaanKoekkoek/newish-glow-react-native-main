import {
  Main,
  Section,
  Grid,
  SkeletonLoader,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SkeletonLoaderScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <SkeletonLoader size="sm" />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
