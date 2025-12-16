import {
  Main,
  Section,
  Grid,
  Badge,
  DefaultList,
  Selector,
  TextLink,
  Icon,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SelectorScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Selector
              onPress={() => {}}
              title="Default Selector"
              state="default"
              highlight="Highlight"
              variant="default"
            />
          </Grid.Column>
          <Grid.Column>
            <Selector
              selected
              onPress={() => {}}
              highlight="Highlight"
              badge={<Badge text="Badge" />}
              title="Selector with badge, highlight and secondary action"
              state="default"
              variant="default"
              secondaryAction={
                <TextLink
                  children={[<Icon name="add" />, "Text link"]}
                  href="#"
                />
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Selector
              onPress={() => {}}
              title="Compact Selector"
              state="default"
              variant="compact"
            />
          </Grid.Column>
          <Grid.Column>
            <Selector
              onPress={() => {}}
              title="Extended Selector"
              state="default"
              variant="extended"
              list={
                <DefaultList variant="icon">
                  <DefaultList.Item icon="checkmark">
                    List item
                  </DefaultList.Item>
                  <DefaultList.Item icon="checkmark">
                    List item
                  </DefaultList.Item>
                  <DefaultList.Item icon="checkmark">
                    List item
                  </DefaultList.Item>
                </DefaultList>
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Selector
              onPress={() => {}}
              title="Disabled Selector"
              state="inactive"
              variant="default"
            />
          </Grid.Column>
          <Grid.Column>
            <Selector
              onPress={() => {}}
              title="Selected Selector"
              state="default"
              variant="default"
              selected
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
