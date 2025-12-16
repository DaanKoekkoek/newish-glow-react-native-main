import { useState } from "react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { SummaryList, SummaryListItem, SummaryListAction } from "./SummaryList";

const meta: Meta<typeof SummaryListAction> = {
  title: "DesignSystem/Components/Lists/SummaryList/Action",
  component: SummaryListAction,
  argTypes: {
    children: {
      description: "Renders the action as a `<Button />` component.",
    },
    icon: {
      description:
        "Renders the action as a `<ActionButtonIcon />` component, or `<Button />` when `children` is passed in as well. If `children` and `icon` aren't passed as property, the action is rendered as a `<NumberInput />`",
    },
    numberInput: {
      onChange: {
        action: "onChange",
      },
    },
    onClick: {
      type: "function",
      description:
        "Only applicable for when the action is rendered as a `<Button />` or `<ActionButtonIcon />`",
    },
    supportText: {
      control: "text",
      description: "Ondersteunende tekst onder de header van de actie.",
      defaultValue: "",
    },
  },
  decorators: [
    (Story, args) => (
      <SummaryList>
        <SummaryListItem
          heading="Heading"
          subheading="Subheading"
          supportText="SupportText"
          image={{ name: "Amazon Prime" }}
          actions={<Story {...args} />}
        />
      </SummaryList>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AsButton: Story = {
  args: {
    children: "Wijzig",
    icon: "edit",
    supportText: "SupportText",
  },
};

export const AsActionButtonIcon: Story = {
  args: {
    icon: "plus",
    supportText: "SupportText",
  },
};

export const AsNumberInput: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    const logChange = action("onChange");

    return (
      <SummaryListAction
        numberInput={{
          onChange: (amount) => {
            logChange(amount);
            setValue(amount);
          },
          value: value,
        }}
        supportText="SupportText"
      />
    );
  },
};
