"use client";

import { Carousel } from "@odido-portals/glow-react-web/carousel";
import { Grid, Column } from "@odido-portals/glow-react-web/grid";
import { HorizontalCard } from "@odido-portals/glow-react-web/horizontal-card";
import { Icon } from "@odido-portals/glow-react-web/icon";

import BaseLayout from "../../../BaseLayout";

export default function CarouselPage() {
  return (
    <BaseLayout title="Carousel" grid="custom-with-section">
      <Grid fluid noGutters>
        <Column>
          <Carousel
            centerSlide
            slidesToShow={{
              mobileSmall: 1,
              mobile: 2,
              tablet: 3,
              laptop: 4,
              desktop: 5,
            }}
          >
            <HorizontalCard
              variant="color"
              icon="4g-for-home"
              title="Title"
              textLink={{
                size: "sm",
                children: ["Link ", <Icon key="icon" name="arrow-right" />],
              }}
            >
              Carousel slide - horizontal card
            </HorizontalCard>
            <HorizontalCard
              variant="color"
              icon="4g-for-home"
              title="Title"
              textLink={{
                size: "sm",
                children: ["Link ", <Icon key="icon" name="arrow-right" />],
              }}
            >
              Carousel slide - horizontal card
            </HorizontalCard>
            <HorizontalCard
              variant="color"
              icon="4g-for-home"
              title="Title"
              textLink={{
                size: "sm",
                children: ["Link ", <Icon key="icon" name="arrow-right" />],
              }}
            >
              Carousel slide - horizontal card
            </HorizontalCard>
            <HorizontalCard
              variant="color"
              icon="4g-for-home"
              title="Title"
              textLink={{
                size: "sm",
                children: ["Link ", <Icon key="icon" name="arrow-right" />],
              }}
            >
              Carousel slide - horizontal card
            </HorizontalCard>
            <HorizontalCard
              variant="color"
              icon="4g-for-home"
              title="Title"
              textLink={{
                size: "sm",
                children: ["Link ", <Icon key="icon" name="arrow-right" />],
              }}
            >
              Carousel slide - horizontal card
            </HorizontalCard>
            <HorizontalCard
              variant="color"
              icon="4g-for-home"
              title="Title"
              textLink={{
                size: "sm",
                children: ["Link ", <Icon key="icon" name="arrow-right" />],
              }}
            >
              Carousel slide - horizontal card
            </HorizontalCard>
          </Carousel>
        </Column>
      </Grid>
    </BaseLayout>
  );
}
