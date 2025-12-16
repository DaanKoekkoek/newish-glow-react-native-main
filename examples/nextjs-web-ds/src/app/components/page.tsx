"use client";

import { Column, Grid } from "@odido-portals/glow-react-web/grid";
import { Strong } from "@odido-portals/glow-react-web/strong";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";

import BaseLayout from "../BaseLayout";
import { BoxLayout } from "../BoxLayout";

import { usePersistentStateReadOnly } from "@/app/hooks";
import { routes } from "@/app/routes";

export default function ComponentsPage() {
  const componentsRoute = routes.find((r) => r.href === "/components");

  const allSublinks =
    componentsRoute?.groups?.flatMap((group) => group.sublinks) || [];

  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");

  return (
    <BaseLayout title="All Components" grid="custom-with-section">
      <Grid>
        <Column>
          <BoxLayout
            renderPrefix={(route) => (
              <Strong size="xxs">
                {route.href.includes("client") ? "client-only" : "SSR-friendly"}
              </Strong>
            )}
            items={allSublinks}
            prominence={brand === "sim-wallet" ? "outline" : "color"}
            getPalette={(route) =>
              route.href.includes("client") ? "red" : "default"
            }
          />
        </Column>
      </Grid>
    </BaseLayout>
  );
}
