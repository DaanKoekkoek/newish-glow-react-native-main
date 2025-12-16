import {
  Main,
  Section,
  Grid,
  Stack,
  Button,
} from "@odido-portals/glow-react-native";
import React from "react";

export function ButtonDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Button onPress={() => {}} size="sm" fill>
              Default button (fill)
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Button onPress={() => {}} size="sm">
                Default button
              </Button>
              <Button onPress={() => {}}>Default button</Button>
              <Button onPress={() => {}} size="lg">
                Default button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "black" }}>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button onPress={() => {}} inverted size="sm">
                Default button
              </Button>
              <Button onPress={() => {}} inverted>
                Default button
              </Button>
              <Button onPress={() => {}} inverted size="lg">
                Default button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button onPress={() => {}} state="disabled" size="sm">
                Default button
              </Button>
              <Button onPress={() => {}} state="disabled">
                Default button
              </Button>
              <Button onPress={() => {}} state="disabled" size="lg">
                Default button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ButtonEmphasisedScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Button onPress={() => {}} prominence="emphasised" size="sm" fill>
              Emphasised button (fill)
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Button onPress={() => {}} prominence="emphasised" size="sm">
                Emphasised button
              </Button>
              <Button onPress={() => {}} prominence="emphasised">
                Emphasised button
              </Button>
              <Button onPress={() => {}} prominence="emphasised" size="lg">
                Emphasised button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "black" }}>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button
                onPress={() => {}}
                inverted
                prominence="emphasised"
                size="sm"
              >
                Emphasised button
              </Button>
              <Button onPress={() => {}} inverted prominence="emphasised">
                Emphasised button
              </Button>
              <Button
                onPress={() => {}}
                inverted
                prominence="emphasised"
                size="lg"
              >
                Emphasised button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button
                onPress={() => {}}
                state="disabled"
                prominence="emphasised"
                size="sm"
              >
                Emphasised button
              </Button>
              <Button
                onPress={() => {}}
                state="disabled"
                prominence="emphasised"
              >
                Emphasised button
              </Button>
              <Button
                onPress={() => {}}
                state="disabled"
                prominence="emphasised"
                size="lg"
              >
                Emphasised button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ButtonSecondaryScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Button onPress={() => {}} size="sm" prominence="secondary" fill>
              Secondary button (fill)
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <Button onPress={() => {}} size="sm" prominence="secondary">
                Secondary button
              </Button>
              <Button onPress={() => {}} prominence="secondary">
                Secondary button
              </Button>
              <Button onPress={() => {}} size="lg" prominence="secondary">
                Secondary button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "black" }}>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button
                onPress={() => {}}
                inverted
                prominence="secondary"
                size="sm"
              >
                Secondary button
              </Button>
              <Button onPress={() => {}} inverted prominence="secondary">
                Secondary button
              </Button>
              <Button
                onPress={() => {}}
                inverted
                prominence="secondary"
                size="lg"
              >
                Secondary button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button
                onPress={() => {}}
                state="disabled"
                prominence="secondary"
                size="sm"
              >
                Secondary button
              </Button>
              <Button
                onPress={() => {}}
                state="disabled"
                prominence="secondary"
              >
                Secondary button
              </Button>
              <Button
                onPress={() => {}}
                state="disabled"
                prominence="secondary"
                size="lg"
              >
                Secondary button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ButtonLoadingScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Button size="lg" state="loading">
                Loading button
              </Button>
              <Button size="sm" state="loading" prominence="secondary">
                Loading button
              </Button>
              <Button state="loading" prominence="emphasised">
                Loading button
              </Button>
              <Button state="loading" inverted>
                Loading button
              </Button>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
