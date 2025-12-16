import {
  Checkbox,
  Main,
  Grid,
  Section,
} from "@odido-portals/glow-react-native";
import React from "react";

export function CheckboxScreen() {
  const defaultCheckboxProps = {
    legend: {
      text: "Legend",
      optional: true,
      info: () => {},
    },
    id: "id-here",
    onPress: () => {},
  };

  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Checkbox
              label="default"
              checked={false}
              {...defaultCheckboxProps}
            />
          </Grid.Column>
          <Grid.Column>
            <Checkbox checked label="checked" {...defaultCheckboxProps} />
          </Grid.Column>
          <Grid.Column>
            <Checkbox
              checked
              state="inactive"
              label="in-active and checked"
              {...defaultCheckboxProps}
            />
          </Grid.Column>
          <Grid.Column>
            <Checkbox
              state="error"
              errorMessage="This is an error"
              label="error"
              {...defaultCheckboxProps}
            />
          </Grid.Column>
          <Grid.Column>
            <Checkbox
              errorMessage="This is an error"
              label="Indeterminate"
              checked
              indeterminate
              {...defaultCheckboxProps}
            />
          </Grid.Column>
          <Grid.Column>
            <Checkbox
              errorMessage="This is an error"
              label="Indeterminate"
              checked={false}
              state="inactive"
              indeterminate
              {...defaultCheckboxProps}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
