import {
  Stack,
  Main,
  Section,
  Grid,
  InputField,
} from "@odido-portals/glow-react-native";
import React from "react";

export function InputFieldScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <InputField
                placeholder="placeholder text"
                label={{ text: "label text" }}
                id="id-1"
              />
              <InputField
                type="password"
                value="password#text"
                placeholder="password placeholder text"
                helperText="Helper text"
                label={{ text: "password label text" }}
                id="id-password-1"
              />

              <InputField
                type="date"
                dateFormat="yyyy-mm-dd"
                placeholder="yyyy-mm-dd"
                value="1994-01-10"
                helperText="Helper text"
                label={{ text: "Date label text" }}
                id="id-date-input-1"
              />
              <InputField
                placeholder="placeholder text"
                label={{ text: "label text" }}
                helperText="Helper text"
                id="id-2"
                suffix="@odido.nl"
                validated={{ success: false, message: "Something went wrong!" }}
              />
              <InputField
                placeholder="placeholder text"
                label={{ text: "label text" }}
                helperText="Helper text"
                id="id-3"
                validated={{ success: true }}
              />
              <InputField
                placeholder="placeholder text"
                label={{ text: "label text" }}
                helperText="Helper text"
                id="id-4"
                disabled
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
