import { useArgs } from "@storybook/preview-api";
import type { Meta } from "@storybook/react";
import { Grid, Main, Section, Stack } from "foundations/index";
import React, { useState } from "react";
import { useStyles } from "react-native-unistyles";

import { AddOnCard } from "./AddOnCard";
import { createAddOnCardPropMocks } from "./AddOnCard.mocks";
import type { AddOnCardProps } from "./AddOnCard.types";

const meta: Meta<AddOnCardProps> = {
  title: "DesignSystem/Components/Card/AddOnCard",
  component: AddOnCard,
  argTypes: {
    direction: {
      control: {
        type: "radio",
        options: ["vertical", "horizontal"],
      },
    },
    title: {
      control: {
        type: "text",
      },
      required: true,
    },
    description: { type: "string" },
    highlight: { type: "string" },
    promotion: { type: "string" },
    addon: {
      control: "select",
      options: [
        "Amazon Prime",
        "HBO Max",
        "Wifi Plus",
        "Visual Voicemail",
        "Videoland",
        "Viaplay",
        "SkyShowtime",
        "Podimo",
        "Netflix",
        "Apple One",
        "Deezer",
        "Extra Veilig Online",
        "Multi-sim",
      ],
    },
    onPress: { action: "onPress" },
    selected: { control: { type: "boolean" } },
    state: { control: { type: "select", options: ["default", "inactive"] } },
  },
  args: {
    id: "1",
    state: "default",
    direction: "vertical",
    onPress: () => {},
    selected: false,
    title: "Title",
    price: {
      showFrequency: true,
      beforeText: "vanaf",
      value: "10,00",
    },
    addon: "Netflix",
  },
  decorators: [(Story) => <Story />],
  render: function Render({ onPress, ...args }) {
    const [{ selected }, updateArgs] = useArgs();

    const handlePress = () => {
      updateArgs({ selected: !selected });
    };

    return <AddOnCard onPress={handlePress} {...args} />;
  },
};

export default meta;

type Story = typeof meta;

export const Vertical: Story = {
  args: {
    addon: "Amazon Prime",
  } as AddOnCardProps,
};

export const WithButtonIcon: Story = {
  args: {
    addon: "Amazon Prime",
    button: {
      selected: {
        text: "Wijzig",
        icon: {
          name: "edit",
        },
      },
      unselected: {
        text: "Voeg toe",
        icon: {
          name: "add",
        },
      },
    },
  } as AddOnCardProps,
};

export const VerticalHighlighted: Story = {
  args: {
    addon: "Amazon Prime",
    highlight: "Highlight",
  } as AddOnCardProps,
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  } as AddOnCardProps,
};

export const HorizontalHighlighted: Story = {
  args: {
    direction: "horizontal",
    highlight: "Highlight",
  } as AddOnCardProps,
};

export const GridExample: Story = {
  tags: ["no-grid"],
  parameters: {
    controls: {
      exclude: [
        "id",
        "onPress",
        "title",
        "description",
        "promotion",
        "buttonText",
        "highlight",
        "applyHighlightOffset",
        "visualVariant",
        "direction",
        "selected",
        "state",
        "price",
      ],
    },
  },
  render: function Render() {
    const [selectedCards, setSelectedCards] = useState<Record<string, boolean>>(
      {},
    );

    const { breakpoint } = useStyles();
    const handlePress = (id: string) => {
      setSelectedCards((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    const isHorizontal = ["mobile", "smallMobile", "tablet", "laptop"].includes(
      breakpoint as string,
    );

    return (
      <Main>
        <Section>
          <Grid laptop={8}>
            <Grid.Column>
              <Stack direction="row" wrap="wrap">
                {createAddOnCardPropMocks(4).map((props, i) => {
                  const id = `${i}`;

                  return (
                    <AddOnCard
                      {...props}
                      id={id}
                      selected={selectedCards[id]}
                      onPress={() => handlePress(id)}
                      applyHighlightOffset={i % 1 === 0 && !isHorizontal}
                      highlight={i % 2 === 0 ? "Highlight" : undefined}
                      promotion={i % 2 === 1 ? "Promotion text" : undefined}
                      direction={isHorizontal ? "horizontal" : "vertical"}
                    />
                  );
                })}
              </Stack>
            </Grid.Column>
          </Grid>
        </Section>
      </Main>
    );
  },
};
