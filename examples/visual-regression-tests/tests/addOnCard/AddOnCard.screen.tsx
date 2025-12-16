import {
  Main,
  AddOnCard,
  Grid,
  Section,
} from "@odido-portals/glow-react-native";
import React from "react";

export const AddOnCardHorizontalScreen = () => {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <AddOnCard
              id="1"
              direction="horizontal"
              title="Title"
              addon="Netflix"
              highlight="Highlight"
              price={{
                showFrequency: true,
                beforeText: "from",
                value: "10,00",
              }}
              onPress={() => {}}
              state="default"
            />
          </Grid.Column>
          <Grid.Column>
            <AddOnCard
              id="2"
              direction="horizontal"
              title="Title"
              addon="Netflix"
              price={{
                showFrequency: true,
                beforeText: "from",
                value: "10,00",
              }}
              onPress={() => {}}
              state="default"
            />
          </Grid.Column>
          <Grid.Column>
            <AddOnCard
              id="3"
              direction="horizontal"
              title="Title"
              addon="Netflix"
              selected
              highlight="Highlight"
              price={{
                showFrequency: true,
                beforeText: "from",
                value: "10,00",
              }}
              onPress={() => {}}
              state="default"
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
};

export const AddOnCardVerticalScreen = () => (
  <Main>
    <Section>
      <Grid>
        <Grid.Column>
          <AddOnCard
            id="1"
            direction="vertical"
            title="Title"
            addon="Netflix"
            description="Description"
            promotion="Promotion"
            price={{
              showFrequency: true,
              beforeText: "from",
              value: "10,00",
            }}
            onPress={() => {}}
            state="default"
          />
        </Grid.Column>
      </Grid>
    </Section>
  </Main>
);
