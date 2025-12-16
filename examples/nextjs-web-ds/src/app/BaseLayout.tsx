"use client";

import { Grid, Column } from "@odido-portals/glow-react-web/grid";
import { LocalNavigation } from "@odido-portals/glow-react-web/local-navigation";
import { Section } from "@odido-portals/glow-react-web/section";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";
import { useRouter, usePathname } from "next/navigation";

import { usePersistentStateReadOnly } from "./hooks";

type BaseLayoutProps = {
  children: React.ReactNode;
  title: string;
  fluid?: boolean;
  grid?: "default" | "custom" | "custom-with-section";
};

export default function BaseLayout({
  children,
  title,
  fluid,
  grid = "default",
}: BaseLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");

  const goBackOneLevel = () => {
    const segments = pathname.split("/").filter(Boolean);
    segments.pop();
    const parentPath = "/" + segments.join("/");
    router.push(parentPath);
  };

  return (
    <>
      <LocalNavigation
        title={title}
        leftAction={{
          title: "Go to previous page",
          onClick: () => goBackOneLevel(),
          icon: "arrow-left",
        }}
        prominence={brand === "sim-wallet" ? "default" : "subtle"}
        variant="default"
      />
      {grid === "custom" && children}
      {grid === "custom-with-section" && (
        <Section variant={brand === "sim-wallet" ? "subtle" : "default"}>
          {children}
        </Section>
      )}
      {grid === "default" && (
        <Section variant={brand === "sim-wallet" ? "subtle" : "default"}>
          <Grid fluid={fluid}>
            <Column>{children}</Column>
          </Grid>
        </Section>
      )}
    </>
  );
}
