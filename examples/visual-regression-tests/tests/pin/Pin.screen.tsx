import { Pin, Main, Grid, Section } from "@odido-portals/glow-react-native";
import React from "react";

export function PinDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Pin length={4} code={["1", "2", "3", "4"]} />
          </Grid.Column>
          <Grid.Column>
            <Pin length={5} code={["1", "2", "3", "4", "5"]} />
          </Grid.Column>
          <Grid.Column>
            <Pin length={6} code={["1", "2", "3", "4", "5", "6"]} />
          </Grid.Column>
          <Grid.Column>
            <Pin
              length={4}
              code={["1", "2", "3", "4"]}
              state="loading"
              loadingMessage="Loading message"
            />
          </Grid.Column>
          <Grid.Column>
            <Pin
              length={4}
              code={["1", "2", "3", "4"]}
              state="success"
              successMessage="Success message"
            />
          </Grid.Column>
          <Grid.Column>
            <Pin
              length={4}
              code={["1", "2", "3", "4"]}
              state="error"
              errorMessage="Error message"
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
