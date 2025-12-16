import { Grid } from "foundations/Grid";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";

import { SubscriptionHero } from "../SubscriptionHero";

export const mockTopNavigation = () => {
  return {
    header: (
      <Grid containerStyle={{ minHeight: 60 }}>
        <Grid.Column style={{ justifyContent: "center" }}>
          <Paragraph>Header</Paragraph>
        </Grid.Column>
      </Grid>
    ),
    footer: (
      <Grid>
        <Grid.Column>
          <Paragraph>Footer</Paragraph>
        </Grid.Column>
      </Grid>
    ),
    subscriptionHero: (
      <SubscriptionHero
        title="Internet"
        titleSecondary="Klik&Klaar"
        palette="blue"
        actions={[
          <SubscriptionHero.Action
            icon="24h"
            key="action-1"
            onPress={function noRefCheck() {}}
          >
            action 1
          </SubscriptionHero.Action>,
          <SubscriptionHero.Action
            icon="3d"
            key="action-1"
            onPress={function noRefCheck() {}}
          >
            action 2
          </SubscriptionHero.Action>,
          <SubscriptionHero.Action
            icon="4g-for-home"
            key="action-1"
            onPress={function noRefCheck() {}}
          >
            action 3
          </SubscriptionHero.Action>,
        ]}
      />
    ),
    content: (
      <Stack>
        {Array.from({ length: 8 }).map((_, index) => (
          <Paragraph key={index}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            molestie sem vitae mi mattis, quis interdum arcu aliquet. Nullam
            pellentesque ex id imperdiet facilisis. Integer sodales hendrerit
            nulla vel dignissim. Nullam gravida dignissim orci, vitae rhoncus
            urna ultrices vitae. Donec sed libero sagittis, venenatis lectus ac,
            congue mi. Sed condimentum molestie felis sed vulputate. Donec
            convallis convallis est, non laoreet odio congue sit amet.
          </Paragraph>
        ))}
      </Stack>
    ),
  };
};
