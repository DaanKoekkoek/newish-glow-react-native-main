import {
  Callout,
  Button,
  Main,
  Grid,
  Section,
} from "@odido-portals/glow-react-native";
import React from "react";

export function CalloutScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Callout
              status="default"
              title="title (status: default)"
              description="description"
              triggers={[
                <Button onPress={() => {}}>Button 1</Button>,
                <Button onPress={() => {}}>Button 2</Button>,
              ]}
            />
          </Grid.Column>
          <Grid.Column>
            <Callout
              status="error"
              title="title (status: error)"
              description="description"
              triggers={[
                <Button onPress={() => {}}>Button 1</Button>,
                <Button onPress={() => {}}>Button 2</Button>,
              ]}
            />
          </Grid.Column>
          <Grid.Column>
            <Callout
              status="success"
              title="title (status: success)"
              description="description"
              triggers={[
                <Button onPress={() => {}}>Button 1</Button>,
                <Button onPress={() => {}}>Button 2</Button>,
              ]}
            />
          </Grid.Column>
          <Grid.Column>
            <Callout
              status="warning"
              title="title (status: warning)"
              description="description"
              triggers={[
                <Button onPress={() => {}}>Button 1</Button>,
                <Button onPress={() => {}}>Button 2</Button>,
              ]}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
