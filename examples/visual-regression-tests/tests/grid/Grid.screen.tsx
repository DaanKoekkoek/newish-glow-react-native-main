import {
  Grid,
  Box,
  Paragraph,
  Main,
  Section,
} from "@odido-portals/glow-react-native";
import React from "react";

const Grids = (amount: number, currentGrid: number) => {
  return Array.from({ length: amount }, (_, index) => (
    <Grid.Column key={index}>
      <Box size="sm" prominence="color">
        <Paragraph>{currentGrid}</Paragraph>
      </Box>
    </Grid.Column>
  ));
};

export function GridDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>{Grids(1, 1)}</Grid>
        <Grid mobileSmall={6}>{Grids(2, 2)}</Grid>
        <Grid mobileSmall={4}>{Grids(3, 3)}</Grid>
        <Grid mobileSmall={3}>{Grids(4, 4)}</Grid>
        <Grid mobileSmall={2}>{Grids(6, 5)}</Grid>
      </Section>
    </Main>
  );
}

export function GridColumnDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column mobileSmall={5}>
            <Box prominence="color">
              <Paragraph>5</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column mobileSmall={7}>
            <Box prominence="color">
              <Paragraph>7</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column>
            <Box prominence="color">
              <Paragraph>12</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column mobileSmall={6}>
            <Box prominence="outline">
              <Paragraph>6</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column mobileSmall={6}>
            <Box prominence="outline">
              <Paragraph>6</Paragraph>
            </Box>
          </Grid.Column>
          <Grid.Column mobileSmall={6}>
            <Box prominence="outline">
              <Paragraph>6</Paragraph>
            </Box>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
