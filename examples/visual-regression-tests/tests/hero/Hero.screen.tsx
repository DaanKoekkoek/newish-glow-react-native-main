import {
  SubscriptionHero,
  Grid,
  Section,
  Main,
} from "@odido-portals/glow-react-native";
import React from "react";

export function SubscriptionHeroScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <SubscriptionHero
              title="Title"
              titleSecondary="Secondary title"
              palette="green"
              image={{
                src: "https://assets.odido.nl/900x750/b35a24c0c1/tophero_app_only_deals-010224.webp",
                alt: "alt text",
              }}
              list={[
                <SubscriptionHero.ListItem children="List item 1" />,
                <SubscriptionHero.ListItem children="List item 2" />,
                <SubscriptionHero.ListItem children="List item 3" />,
              ]}
              actions={[
                <SubscriptionHero.Action
                  onPress={() => {}}
                  icon="24h"
                  children="label 1"
                />,
                <SubscriptionHero.Action
                  onPress={() => {}}
                  icon="3d"
                  children="label 2"
                />,
                <SubscriptionHero.Action
                  onPress={() => {}}
                  icon="4g-for-home"
                  children="label 3"
                />,
              ]}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
