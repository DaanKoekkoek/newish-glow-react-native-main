import {
  Main,
  Grid,
  Section,
  RadioButtonGroup,
} from "@odido-portals/glow-react-native";
import React from "react";

export function RadioButtonGroupScreen() {
  const defaultRadioButtonGroupProps = {
    accessibilityLabel: "group-name-here",
    onPress: () => {},
    legend: {
      text: "Legend",
      helperText: "Helper text here",
      optional: true,
      info: () => {
        alert("Indeterminate got clicked");
      },
    },
    options: [
      { id: "1", value: "1", label: "Option 1", checked: true },
      { id: "2", value: "2", label: "Option 2" },
      { id: "3", value: "3", label: "Option 3" },
    ],
  };

  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <RadioButtonGroup
              {...defaultRadioButtonGroupProps}
              state="default"
            />
          </Grid.Column>
          <Grid.Column>
            <RadioButtonGroup
              {...defaultRadioButtonGroupProps}
              state="inactive"
            />
          </Grid.Column>
          <Grid.Column>
            <RadioButtonGroup {...defaultRadioButtonGroupProps} state="error" />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
