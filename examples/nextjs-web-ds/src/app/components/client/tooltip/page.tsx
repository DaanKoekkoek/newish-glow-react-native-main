"use client";

import { Icon } from "@odido-portals/glow-react-web/icon";
import { Paragraph } from "@odido-portals/glow-react-web/paragraph";
import { Stack } from "@odido-portals/glow-react-web/stack";
import { Tooltip } from "@odido-portals/glow-react-web/tooltip";

import BaseLayout from "../../../BaseLayout";

export default function TooltipPage() {
  return (
    <BaseLayout title="Tooltip">
      <Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>Hover over this tooltip</Paragraph>
          <Tooltip
            key="tooltip-1"
            description="This is a tooltip for the shopping cart"
            animated
          >
            <Icon name="status-info" size="sm" />
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Paragraph>Click on this tooltip</Paragraph>
          <Tooltip
            key="tooltip-2"
            description="This is a tooltip for the shopping cart"
            closeButton
            animated
          >
            <Icon name="status-info" size="sm" />
          </Tooltip>
        </Stack>
      </Stack>
    </BaseLayout>
  );
}
