"use client";

import { Display } from "@odido-portals/glow-react-web/display";
import { Column, Grid } from "@odido-portals/glow-react-web/grid";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Section } from "@odido-portals/glow-react-web/section";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { TextLink } from "@odido-portals/glow-react-web/text-link";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";

import { BoxLayout } from "./BoxLayout";
import { usePersistentStateReadOnly } from "./hooks";

import { routes } from "@/app/routes";

export default function Home() {
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");

  return (
    <>
      <Section variant={brand === "sim-wallet" ? "subtle" : "emphasised"}>
        <Grid>
          <Column>
            <Stack>
              <Display>Examples</Display>
              <Paragraph>
                Built entirely using the glow-react-web package from{" "}
                <TextLink href="https://design.odido.nl/react">
                  design system 3.0
                </TextLink>
                .
              </Paragraph>
            </Stack>
          </Column>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Column>
            <BoxLayout items={routes} prominence="outline" />
          </Column>
        </Grid>
      </Section>
    </>
  );
}
