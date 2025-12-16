import {
  Checkbox,
  CheckboxGroup,
  Main,
  Grid,
  Section,
} from "@odido-portals/glow-react-native";
import React from "react";

export function CheckboxGroupScreen() {
  const defaultCheckboxProps = {
    id: "id-here",
    onPress: () => {},
  };

  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <CheckboxGroup
              legend={{
                text: "Basic",
                optional: true,
                info: () => {},
              }}
              state="default"
              helperText="Helper text here"
            >
              <Checkbox
                {...defaultCheckboxProps}
                checked
                state="default"
                label="Option 1"
              />
              <Checkbox
                {...defaultCheckboxProps}
                checked={false}
                state="default"
                label="Option 2"
              />
              <Checkbox
                {...defaultCheckboxProps}
                checked={false}
                state="default"
                label="Option 3"
              />
            </CheckboxGroup>
          </Grid.Column>
          <Grid.Column>
            <CheckboxGroup
              legend={{
                text: "In-active",
                optional: true,
                info: () => {},
              }}
              helperText="Helper text here"
            >
              <Checkbox
                {...defaultCheckboxProps}
                checked
                state="inactive"
                label="Option 1"
              />
              <Checkbox
                {...defaultCheckboxProps}
                state="inactive"
                label="Option 2"
              />
              <Checkbox
                {...defaultCheckboxProps}
                state="inactive"
                label="Option 3"
              />
            </CheckboxGroup>
          </Grid.Column>
          <Grid.Column>
            <CheckboxGroup
              legend={{
                text: "Error",
                optional: true,
                info: () => {},
              }}
              state="error"
              errorMessage="Error message here"
            >
              <Checkbox
                {...defaultCheckboxProps}
                state="error"
                label="Option 1"
              />
              <Checkbox
                {...defaultCheckboxProps}
                state="error"
                label="Option 2"
              />
              <Checkbox
                {...defaultCheckboxProps}
                state="error"
                label="Option 3"
              />
            </CheckboxGroup>
          </Grid.Column>
          <Grid.Column>
            <CheckboxGroup
              legend={{
                text: "Indeterminate",
                optional: true,
                info: () => {},
              }}
              errorMessage="Error message here"
            >
              <Checkbox
                {...defaultCheckboxProps}
                checked
                indeterminate
                label="Option 1"
              />
              <Checkbox
                {...defaultCheckboxProps}
                indeterminate
                state="inactive"
                checked={false}
                label="Option 2"
              />
            </CheckboxGroup>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
