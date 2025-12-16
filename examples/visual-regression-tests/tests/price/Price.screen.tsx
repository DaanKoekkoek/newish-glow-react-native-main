import type { PriceProps, PriceSize } from "@odido-portals/glow-react-native";
import {
  Main,
  Section,
  Grid,
  Price,
  Stack,
} from "@odido-portals/glow-react-native";
import React from "react";

interface PricesProps extends PriceProps {
  sizes: PriceSize[];
}

const defaultProps: PriceProps = {
  value: "10,00",
  fromValue: "15,00",
  showFrequency: true,
  showCurrency: true,
  showVAT: true,
};

const Prices: React.FC<Omit<PricesProps, "value">> = ({ sizes, ...props }) => {
  return (
    <>
      {sizes.map((size, index) => (
        <Price
          beforeText={size}
          key={index}
          size={size}
          {...defaultProps}
          {...props}
        />
      ))}
    </>
  );
};

export function PriceDemoScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <Prices sizes={["sm", "default"]} />
              </Stack>
              <Stack direction="row">
                <Prices sizes={["lg", "xl"]} />
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section paddingTop="none">
        <Grid>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <Prices sizes={["sm", "default"]} state="disabled" />
              </Stack>
              <Stack direction="row">
                <Prices sizes={["lg", "xl"]} state="disabled" />
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
      <Section style={{ backgroundColor: "black" }}>
        <Grid>
          <Grid.Column>
            <Stack>
              <Stack direction="row">
                <Prices sizes={["sm", "default"]} inverted />
              </Stack>
              <Stack direction="row">
                <Prices sizes={["lg", "xl"]} inverted />
              </Stack>
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
