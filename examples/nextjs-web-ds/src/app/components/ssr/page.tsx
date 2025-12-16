"use client";

import { Grid, Column } from "@odido-portals/glow-react-web/grid";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";

import BaseLayout from "../../BaseLayout";

import { BoxLayout } from "@/app/BoxLayout";
import { usePersistentStateReadOnly } from "@/app/hooks";
import { routes } from "@/app/routes";

export default function SsrPage() {
  const componentsRoute = routes.find((r) => r.href === "/components");
  const ssrGroup = componentsRoute?.groups?.find((g) => g.key === "ssr");
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");

  return (
    <BaseLayout title="SSR components" grid="custom-with-section">
      <Grid>
        <Column>
          <BoxLayout
            items={ssrGroup?.sublinks ?? []}
            prominence={brand === "sim-wallet" ? "outline" : "color"}
          />
        </Column>
      </Grid>
    </BaseLayout>
  );
}
