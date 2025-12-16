import type { Meta, StoryObj } from "@storybook/react";

import type { LoginScreenProps } from "./Login";
import { LoginScreen } from "./Login";

const meta: Meta<LoginScreenProps> = {
  title: "Examples/Login",
  component: LoginScreen,
  args: {
    title: "Inloggen bij Odido.",
    description:
      "T-Mobile en Tele2 zijn nu Odido. Goed om te weten: er verandert niks aan je abonnement. En inloggen doe je gewoon met dezelfde gegevens. Wel zo makkelijk.",
  },
};

export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Page: Story = {
  tags: ["no-grid"],
};
