"use client";
import React from "react";
import styles from "./FixedSettingsNavigation.module.scss";
import { Box } from "components/Box";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";
import { TextLink } from "components/TextLink";
import type { FixedSettingsNavigationProps } from "./FixedSettingsNavigation.types";
import { tokenClassNames } from "_utility";

export const FixedSettingsNavigation = React.forwardRef<
  HTMLDivElement,
  FixedSettingsNavigationProps
>(
  (
    {
      initials,
      backToMainHref,
      backToMainLabel,
      serviceHref,
      serviceLabel,
      userLabel,
      userProfileHref = "/my",
      productLabel,
      productIcon,
      style,
      testID = "fixed-settings-navigation",
    },
    ref,
  ) => {
    const containerClasses = tokenClassNames(
      styles,
      "fixed-settings-navigation",
    );

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={containerClasses}
        style={style}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          style={{ height: "40px" }}
        >
          {backToMainHref && backToMainLabel && (
            <TextLink
              size="xs"
              href={backToMainHref}
              textStyle={{ color: "black" }}
              className={styles["top-links"]}
            >
              {backToMainLabel}
            </TextLink>
          )}
          {serviceHref && serviceLabel && (
            <TextLink
              size="xs"
              href={serviceHref}
              textStyle={{ color: "black" }}
              className={styles["top-links"]}
            >
              {serviceLabel}
            </TextLink>
          )}
        </Stack>

        <Box prominence="emphasised" size="sm" style={{ borderRadius: 0 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            className={styles["emphasised-stack"]}
          >
            <a href={userProfileHref} className={styles["user-profile-link"]}>
              <Stack direction={"row"} alignItems={"center"} gap={100}>
                {initials && (
                  <>
                    <div className={styles["user-avatar"]}>
                      <Paragraph>{initials}</Paragraph>
                    </div>
                    <Paragraph
                      size="sm"
                      className={styles["user-account-label"]}
                    >
                      {userLabel}
                    </Paragraph>
                  </>
                )}
              </Stack>
            </a>
            <div style={{ display: "flex", gap: "var(--semantics-gap-100)" }}>
              {productIcon && <Icon name={productIcon} />}
              {productLabel && <Paragraph size="sm">{productLabel}</Paragraph>}
            </div>
          </Stack>
        </Box>
      </div>
    );
  },
);
