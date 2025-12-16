"use client";

import { Main } from "@odido-portals/glow-react-web/main";
import type { MySectionProps } from "@odido-portals/glow-react-web/my-section";
import {
  MySection,
  MySectionGrid,
} from "@odido-portals/glow-react-web/my-section";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";
import React from "react";

import type { BaseType } from "../base.types";

import { CodeSnippet } from "@/app/CodeSnippet";
import { usePersistentStateReadOnly } from "@/app/hooks";

type MyBaseLayout = BaseType & {
  titles?: MySectionProps["title"][];
};

export default function BaseLayout({ children, titles, code }: MyBaseLayout) {
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");
  return (
    <Main>
      {React.Children.toArray(children).map((child, index) => {
        return (
          <MySection
            variant={brand === "sim-wallet" ? "subtle" : "default"}
            title={titles ? titles[index] : undefined}
            key={index}
          >
            <MySectionGrid>{child}</MySectionGrid>
          </MySection>
        );
      })}
      {code && (
        <MySection>
          <MySectionGrid>
            <CodeSnippet code={code} />
          </MySectionGrid>
        </MySection>
      )}
    </Main>
  );
}
