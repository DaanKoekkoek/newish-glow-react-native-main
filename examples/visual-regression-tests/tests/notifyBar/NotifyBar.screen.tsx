import {
  Main,
  Section,
  Grid,
  Stack,
  NotifyBar,
} from "@odido-portals/glow-react-native";
import React from "react";

export function NotifyBarScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <NotifyBar
                message="message, icon: status-info, state: default"
                icon="status-info"
                actionText="Call to action"
                closeText="Close"
                onActionPress={() => {}}
                onClose={() => {}}
                state="default"
              />
              <NotifyBar
                message="message, state: default"
                onClose={() => {}}
                onActionPress={() => {}}
                actionText="Call to action"
                closeText="Close"
                state="default"
              />
              <NotifyBar
                message="message, state: success"
                onClose={() => {}}
                onActionPress={() => {}}
                actionText="Call to action"
                closeText="Close"
                state="success"
              />
              <NotifyBar
                message="message, state: error"
                onClose={() => {}}
                onActionPress={() => {}}
                actionText="Call to action"
                closeText="Close"
                state="error"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
