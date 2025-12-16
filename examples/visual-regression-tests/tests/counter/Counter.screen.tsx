import {
  Main,
  Section,
  Grid,
  Stack,
  Counter,
} from "@odido-portals/glow-react-native";
import React from "react";

const fixedNow = new Date("2023-01-19T00:00:00Z");

const targetDate = new Date(fixedNow);
targetDate.setDate(fixedNow.getDate() + 2);

const hoursDate = new Date(fixedNow);
hoursDate.setHours(fixedNow.getHours() + 24);

export function CounterDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Counter
                targetDate={targetDate.toISOString()}
                variant="default"
                digits={4}
                size="default"
              />
              <Counter
                targetDate={targetDate.toISOString()}
                variant="default"
                digits={4}
                size="large"
              />
              <Counter
                targetDate={targetDate.toISOString()}
                prominence="subtle"
                variant="default"
                digits={4}
                size="large"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function CounterHoursScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Counter
                targetDate={hoursDate.toISOString()}
                variant="hoursOnly"
                size="default"
              />
              <Counter
                targetDate={hoursDate.toISOString()}
                variant="hoursOnly"
                size="large"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
