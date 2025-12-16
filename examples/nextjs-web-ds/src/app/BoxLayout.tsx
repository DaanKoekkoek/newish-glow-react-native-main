"use client";

import { Box } from "@odido-portals/glow-react-web/box";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { TextLink } from "@odido-portals/glow-react-web/text-link";
import { useRouter } from "next/navigation";
import React from "react";

type RouteItem = {
  href: string;
  title?: string;
  label?: string;
  description?: string;
};

type BoxLayoutProps = {
  items: RouteItem[];
  prominence?: "emphasised" | "color" | "outline" | "default";
  getPalette?: (route: RouteItem) => string | undefined;
  renderPrefix?: (route: RouteItem) => React.ReactNode;
};

export const BoxLayout = ({
  items,
  prominence = "outline",
  getPalette,
  renderPrefix,
}: BoxLayoutProps) => {
  const router = useRouter();

  return (
    <Stack gap="sm" direction="row" wrap="wrap">
      {items.map((route, key) => {
        if (!route.label) return null;

        return (
          <Stack
            size={{ mobileSmall: 12, mobile: 6, tablet: 4, laptop: 3 }}
            alignSelf="stretch"
            key={key}
          >
            <Box
              prominence={prominence}
              palette={getPalette?.(route)}
              size="sm"
              grow
            >
              <Stack gap="sm">
                {renderPrefix && renderPrefix(route)}
                <TextLink onClick={() => router.push(route.href)} stretched>
                  {route.label}
                </TextLink>
                {route.description && (
                  <Paragraph>{route.description}</Paragraph>
                )}
              </Stack>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
};
