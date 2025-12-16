import {
  DefaultCard,
  Section,
  Grid,
  Main,
  Title,
  Paragraph,
  Icon,
} from "@odido-portals/glow-react-native";
import React from "react";

export function DefaultCardScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <DefaultCard
              title={<Title text="Title" size="default" />}
              paragraph={<Paragraph>Paragraph</Paragraph>}
              visual="none"
              highlightText="highlightText"
              price={{
                priceProps: { value: "10,00", size: "xl" },
                description: "Description",
                disclaimer: "Disclaimer",
                moreInfo: <Icon name="status-info" />,
              }}
              badgeText="badge"
            />
          </Grid.Column>
          <Grid.Column>
            <DefaultCard
              title={<Title text="Title" size="default" />}
              paragraph={<Paragraph>Paragraph</Paragraph>}
              visual="image"
              image={{
                src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
                alt: "Alt text",
                ratio: "2/1",
              }}
              highlightText="highlightText"
              price={{
                priceProps: { value: "10,00", size: "xl" },
                description: "Description",
                disclaimer: "Disclaimer",
                moreInfo: <Icon name="status-info" />,
              }}
              badgeText="badge"
              variant="outline"
              palette="orange"
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
