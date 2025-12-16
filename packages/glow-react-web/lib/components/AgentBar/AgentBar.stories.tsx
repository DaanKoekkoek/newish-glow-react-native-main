import type { Meta, StoryObj } from "@storybook/react";

import { AgentBar } from "./AgentBar";

const meta: Meta<typeof AgentBar> = {
  title: "DesignSystem/Components/Navigation/AgentBar",
  component: AgentBar,
  argTypes: {},
  args: {
    appointmentLink: { href: "#", label: "Terugbelafspraak" },
    logoutLink: { href: "#", label: "Uitloggen" },
    telesalesLink: { href: "#", label: "Telesales" },
    userId: "ID017517",
    agentId: { extension: "Inbound Renewal Care", label: "[99505]" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
