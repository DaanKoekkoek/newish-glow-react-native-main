import {
  Grid,
  LargeSticker,
  Main,
  ProductHero,
  Status,
} from "@odido-portals/glow-react-native";
import React from "react";

export function ProductHeroScreen() {
  return (
    <Main>
      <Grid>
        <Grid.Column>
          <ProductHero
            image={{
              src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
              alt: "Alt text",
              ratio: "16/9",
            }}
            status={<Status statusText="status" type="success" />}
            largeSticker={{
              type: "usp",
              list: (
                <LargeSticker.List variant="icon">
                  <LargeSticker.ListItem icon="checkmark">
                    List item
                  </LargeSticker.ListItem>
                  <LargeSticker.ListItem icon="checkmark">
                    List item
                  </LargeSticker.ListItem>
                  <LargeSticker.ListItem icon="checkmark">
                    List item
                  </LargeSticker.ListItem>
                </LargeSticker.List>
              ),
            }}
          />
        </Grid.Column>
        <Grid.Column style={{ marginTop: 10 }}>
          <ProductHero
            image={{
              src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
              alt: "Alt text",
              ratio: "16/9",
            }}
            variant="promo"
            status={<Status statusText="status" type="success" />}
            largeSticker={{
              type: "default",
              description: `Describe your\npromotion`,
              price: (
                <LargeSticker.Price
                  value="10"
                  showAsterisk
                  beforeText="vanaf"
                />
              ),
            }}
          />
        </Grid.Column>
      </Grid>
    </Main>
  );
}
