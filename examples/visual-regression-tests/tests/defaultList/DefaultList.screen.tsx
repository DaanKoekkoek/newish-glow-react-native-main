import {
  Main,
  Section,
  Grid,
  DefaultList,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DefaultListDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <DefaultList variant="bullet" size="default">
              <DefaultList.Item icon="checkmark">Bullet</DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="icon" size="default">
              <DefaultList.Item icon="checkmark">Icon</DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default">
              <DefaultList.Item icon="checkmark">
                Icon colored default
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="blue">
              <DefaultList.Item icon="checkmark">
                Icon colored blue
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="green">
              <DefaultList.Item icon="checkmark">
                Icon colored green
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="orange">
              <DefaultList.Item icon="checkmark">
                Icon colored orange
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="red">
              <DefaultList.Item icon="checkmark">
                Icon colored red
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="yellow">
              <DefaultList.Item icon="checkmark">
                Icon colored yellow
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="purple">
              <DefaultList.Item icon="checkmark">
                Icon colored purple
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="iconColored" size="default" palette="pink">
              <DefaultList.Item icon="checkmark">
                Icon colored pink
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="numbered" size="default">
              <DefaultList.Item icon="checkmark">Numbered</DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="bullet" size="sm">
              <DefaultList.Item icon="checkmark">
                bullet, size: small
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
          <Grid.Column>
            <DefaultList variant="icon" size="sm">
              <DefaultList.Item icon="checkmark">
                icon, size: small
              </DefaultList.Item>
            </DefaultList>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
