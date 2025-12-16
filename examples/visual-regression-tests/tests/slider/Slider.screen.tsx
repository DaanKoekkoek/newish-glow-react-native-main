import { Main, Section, Grid, Slider } from "@odido-portals/glow-react-native";
import React from "react";

export function SliderScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Slider minValue={0} maxValue={100} />
          </Grid.Column>
          <Grid.Column>
            <Slider minValue={0} value={50} maxValue={100} />
          </Grid.Column>
          <Grid.Column>
            <Slider minValue={0} value={100} maxValue={100} />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
