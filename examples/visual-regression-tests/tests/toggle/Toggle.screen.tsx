import {
  Toggle,
  Main,
  Section,
  Grid,
  Paragraph,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

export function ToggleDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack direction="row" wrap="wrap">
              <Toggle ariaLabel="Toggle label" onPress={() => {}} />
              <Toggle ariaLabel="Toggle label" onPress={() => {}} size="lg" />
              <Toggle
                ariaLabel="Toggle label"
                onPress={() => {}}
                size="xl"
                label
              />
              <Toggle
                ariaLabel="Toggle label"
                onPress={() => {}}
                size="xl"
                label
                isSelected
              />
              <Toggle
                ariaLabel="Toggle label"
                onPress={() => {}}
                size="xl"
                label
                isSelected
                isHovered
              />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <>
                <Paragraph>isSelected: true</Paragraph>
                <Toggle
                  ariaLabel="Toggle label"
                  onPress={() => {}}
                  isSelected
                />
              </>
              <>
                <Paragraph>inactive: true</Paragraph>
                <Toggle ariaLabel="Toggle label" onPress={() => {}} inactive />
              </>
              <>
                <Paragraph>isSelected: true, inactive: true</Paragraph>
                <Toggle
                  ariaLabel="Toggle label"
                  onPress={() => {}}
                  isSelected
                  inactive
                />
              </>
              <>
                <Paragraph>isSelected: true, isHovered: true</Paragraph>
                <Toggle
                  ariaLabel="Toggle label"
                  onPress={() => {}}
                  isSelected
                  isHovered
                />
              </>
              <>
                <Paragraph>
                  isSelected: true, isHovered: true, inactive: true
                </Paragraph>
                <Toggle
                  ariaLabel="Toggle label"
                  onPress={() => {}}
                  isSelected
                  isHovered
                  inactive
                />
              </>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
