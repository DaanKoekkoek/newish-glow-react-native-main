import {
  FeatureCard,
  Section,
  Grid,
  Main,
} from "@odido-portals/glow-react-native";
import React from "react";

export function FeatureCardTextScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <FeatureCard
              type="text"
              title="Title"
              description="Description"
              onPress={() => console.log("test")}
            />
          </Grid.Column>
          <Grid.Column>
            <FeatureCard
              type="text"
              title="Title"
              style="alternate"
              description="Compact and alternate style card"
              variant="compact"
              onPress={() => console.log("test")}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function FeatureCardBackgroundScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <FeatureCard
              title="Title"
              type="backgroundImage"
              description="Description"
              image={{
                src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
                alt: "alt",
              }}
              onPress={() => {}}
            />
          </Grid.Column>
          <Grid.Column>
            <FeatureCard
              title="Title"
              type="backgroundImage"
              style="alternate"
              description="Compact and alternate style card"
              variant="compact"
              image={{
                src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
                alt: "alt",
              }}
              onPress={() => {}}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function FeatureCardImageScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <FeatureCard
              title="Title"
              description="Default card"
              image={{
                src: "https://assets.odido.nl/305x450/8ca7287522/dvi-front-back_apple_iphone_15_kleur3_305x450_v1.png",
                alt: "alt",
              }}
              onPress={() => {}}
            />
          </Grid.Column>
          <Grid.Column>
            <FeatureCard
              title="Title"
              description="Compact and alternate style card"
              style="alternate"
              variant="compact"
              image={{
                src: "https://assets.odido.nl/305x450/8ca7287522/dvi-front-back_apple_iphone_15_kleur3_305x450_v1.png",
                alt: "alt",
              }}
              onPress={() => {}}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}

export function FeatureCardOdidoPaletteScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <FeatureCard
              title="Title"
              description="Default card"
              type="visual"
              image={{
                src: "https://assets.odido.nl/305x450/8ca7287522/dvi-front-back_apple_iphone_15_kleur3_305x450_v1.png",
                alt: "alt",
              }}
              onPress={() => {}}
              palette="yellow"
            />
          </Grid.Column>
          <Grid.Column>
            <FeatureCard
              title="Title"
              description="Compact and alternate style card"
              style="alternate"
              type="visual"
              variant="compact"
              image={{
                src: "https://assets.odido.nl/305x450/8ca7287522/dvi-front-back_apple_iphone_15_kleur3_305x450_v1.png",
                alt: "",
              }}
              palette="green"
              onPress={() => {}}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
