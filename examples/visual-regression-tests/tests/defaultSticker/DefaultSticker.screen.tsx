import {
  DefaultSticker,
  Main,
  Grid,
  Section,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DefaultStickerScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack wrap="wrap" direction="row">
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="blue"
              />
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="green"
              />
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="red"
              />
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="purple"
              />
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="orange"
              />
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="yellow"
              />
              <DefaultSticker
                type="default"
                text="Describe your promotion"
                variant="default"
                palette="pink"
              />
            </Stack>
          </Grid.Column>
          <Grid.Column>
            <DefaultSticker
              type="default"
              text="Describe your promotion"
              variant="emphasised"
            />
          </Grid.Column>
          <Grid.Column>
            <Stack wrap="wrap" direction="row">
              <DefaultSticker
                type="image"
                image={{
                  src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
                  alt: "alt",
                  imageStyle: { height: 56, width: 112 },
                }}
              />
              <DefaultSticker
                type="image"
                image={{
                  src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
                  alt: "alt",
                  imageStyle: { height: 56, width: 112 },
                }}
                variant="emphasised"
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
