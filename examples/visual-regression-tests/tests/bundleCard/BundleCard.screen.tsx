import {
  Main,
  Section,
  Grid,
  Stack,
  BundleCard,
} from "@odido-portals/glow-react-native";
import React from "react";

export function BundleCardScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack gap="sm">
              <BundleCard
                variant="default"
                onPressButton={() => {}}
                topLabel="Product name"
                bottomLabel="Bundle name"
                graphProps={{
                  percentage: 20,
                  value: "10",
                  label: "days left",
                }}
              />
              <BundleCard
                variant="runningLow"
                onPressButton={() => {}}
                topLabel="Product name"
                bottomLabel="Bundle name"
                graphProps={{
                  percentage: 20,
                  value: "10",
                  label: "days left",
                }}
              />
              <BundleCard
                onPressButton={() => {}}
                topLabel="Product name"
                bottomLabel="Bundle name"
                variant="empty"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
