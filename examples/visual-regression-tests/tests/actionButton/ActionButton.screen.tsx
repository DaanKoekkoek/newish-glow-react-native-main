import {
  Stack,
  Grid,
  ActionButton,
  ActionButtonGroup,
  ActionButtonIcon,
  Section,
  Main,
} from "@odido-portals/glow-react-native";
import React from "react";

const defaultProps = {
  onPress: () => {},
};

export function ActionButtonDefaultScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <ActionButton icon="24h" label="24h" {...defaultProps} />
              <ActionButton
                icon="24h"
                label="24h"
                prominence="emphasised"
                {...defaultProps}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ActionButtonIconScreen() {
  return (
    <Main>
      <Section>
        <Grid mobileSmall={6}>
          <Grid.Column>
            <Stack>
              <ActionButtonIcon icon="24h" {...defaultProps} />
              <ActionButtonIcon
                icon="24h"
                prominence="emphasised"
                {...defaultProps}
              />
              <ActionButtonIcon icon="24h" {...defaultProps} />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <Stack>
              <ActionButtonIcon icon="24h" size="sm" {...defaultProps} />
              <ActionButtonIcon
                icon="24h"
                prominence="emphasised"
                size="sm"
                {...defaultProps}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function ActionButtonGroupScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <ActionButtonGroup>
              <ActionButtonGroup.Button
                {...defaultProps}
                icon="24h"
                label="24h"
              />
              <ActionButtonGroup.Button
                {...defaultProps}
                icon="4g-for-home"
                label="4g-for-home"
              />
              <ActionButtonGroup.Button
                {...defaultProps}
                icon="5g"
                label="5g"
              />
            </ActionButtonGroup>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
