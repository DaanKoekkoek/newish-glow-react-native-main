import {
  Main,
  Section,
  Grid,
  SubscriptionHero,
  TextLink,
  Box,
  TopNavigation,
  Paragraph,
} from "@odido-portals/glow-react-native";
import React from "react";

export function TopNavigationDefaultScreen() {
  return (
    <Main hasTopNavigation>
      <Section palette="blue" variant="subtle" paddingTop="none">
        <Grid>
          <Grid.Column>
            <TopNavigation
              title="Internet Klik&Klaar"
              showTitle
              action={{
                left: (
                  <TextLink href="#">
                    <TextLink.Icon name="chevron-left" />
                  </TextLink>
                ),
              }}
            />
            <SubscriptionHero
              title="Internet"
              titleSecondary="Klik&Klaar"
              actions={[
                <SubscriptionHero.Action icon="24h" onPress={() => {}} />,
                <SubscriptionHero.Action
                  icon="accessoires"
                  onPress={() => {}}
                />,
                <SubscriptionHero.Action icon="3d" onPress={() => {}} />,
              ]}
            />
          </Grid.Column>
          <Grid.Column>
            <Box testID="box">
              <Paragraph>Box component</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function TopNavigationMirrorColorScreen() {
  return (
    <Main hasTopNavigation>
      <Section palette="blue" variant="subtle" paddingTop="none">
        <Grid>
          <Grid.Column>
            <TopNavigation
              title="Internet Klik&Klaar"
              palette="blue"
              showTitle
              action={{
                left: (
                  <TextLink href="#">
                    <TextLink.Icon name="chevron-left" />
                  </TextLink>
                ),
              }}
            />
            <SubscriptionHero
              title="Internet"
              titleSecondary="Klik&Klaar"
              actions={[
                <SubscriptionHero.Action
                  icon="4g-for-home"
                  onPress={() => {}}
                />,
                <SubscriptionHero.Action
                  icon="accessoires"
                  onPress={() => {}}
                />,
                <SubscriptionHero.Action icon="3d" onPress={() => {}} />,
              ]}
            />
          </Grid.Column>
          <Grid.Column>
            <Box>
              <Paragraph>Box component</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
