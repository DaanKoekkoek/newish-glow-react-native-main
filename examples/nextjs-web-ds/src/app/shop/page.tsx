"use client";

import { Column, Grid } from "@odido-portals/glow-react-web/grid";

import BaseLayout from "../BaseLayout";
import { BoxLayout } from "../BoxLayout";

import { routes } from "@/app/routes";

export default function ShopPage() {
  const shopRoute = routes.find((r) => r.href === "/shop");

  const allSublinks = shopRoute?.sublinks || [];

  return (
    <BaseLayout title="Shop" grid="custom-with-section">
      <Grid>
        <Column>
          <BoxLayout items={allSublinks} prominence="outline" />
        </Column>
      </Grid>
    </BaseLayout>
  );
}
