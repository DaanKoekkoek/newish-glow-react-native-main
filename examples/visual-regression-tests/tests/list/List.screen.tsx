import {
  Button,
  List,
  Toggle,
  Price,
  Main,
  Section,
  Grid,
} from "@odido-portals/glow-react-native";
import React from "react";

export function ListDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <List background="default">
              <List.Item
                icon="calendar"
                title="title"
                description1="description1"
                description2="description2"
                attention={{
                  text: "attention (attentionPurpose: success)",
                  variant: "success",
                }}
                detail="detail (notification: 2)"
                notification={2}
              />
              <List.Item
                icon="prepaid"
                title="title (variant: price)"
                attention={{
                  text: "attention (attentionPurpose: information)",
                  variant: "information",
                }}
                onPress={() => {}}
                clickable
                action={
                  <Price
                    beforeText="default"
                    fromValue="€ 100,59"
                    showAsterisk
                    showCurrency
                    showDecimal
                    showFrequency
                    showVAT
                    size="default"
                    state="default"
                    value="€ 100,59"
                  />
                }
              />
              <List.Item
                title="title"
                description1="description1"
                description2="description2"
                attention={{
                  text: "attention (attentionPurpose: error)",
                  variant: "error",
                }}
                action={<Button onPress={() => {}}>Button</Button>}
              />
              <List.Item
                title="title"
                description1="description1"
                description2="description2"
                attention={{
                  text: "attention (attentionPurpose: warning)",
                  variant: "warning",
                }}
                action={<Toggle ariaLabel="toggle" onPress={() => {}} />}
              />
              <List.Item
                title="title (variant: default)"
                detail="detail"
                clickable
                onPress={() => {}}
              />
              <List.Item title="title" />
            </List>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
