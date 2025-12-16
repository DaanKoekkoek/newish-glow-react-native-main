import {
  Stack,
  Main,
  Section,
  Grid,
  TimePicker,
} from "@odido-portals/glow-react-native";
import React from "react";

const hoursOptions = [
  {
    label: "12",
    value: "12",
  },
  {
    label: "13",
    value: "13",
  },
  {
    label: "14",
    value: "14",
  },
  {
    label: "15",
    value: "15",
  },
  {
    label: "16",
    value: "16",
  },
  {
    label: "17",
    value: "17",
  },
  {
    label: "18",
    value: "18",
  },
  {
    label: "19",
    value: "19",
  },
  {
    label: "20",
    value: "20",
  },
];

export function TimePickerScreen() {
  return (
    <Main>
      <Section>
        <Grid>
          <Grid.Column>
            <Stack>
              <TimePicker
                label={{ text: "Label", optional: false }}
                hoursOptions={hoursOptions}
                placeholderHours="Hours"
                placeholderMinutes="Minutes"
                helperText="Helper text"
              />
              <TimePicker
                label={{ text: "Label", optional: true }}
                hoursOptions={hoursOptions}
                disabled
                placeholderHours="Hours"
                placeholderMinutes="Minutes"
                helperText="Helper text"
              />
              <TimePicker
                label={{ text: "Label", optional: true }}
                hoursOptions={hoursOptions}
                placeholderHours="Hours"
                placeholderMinutes="Minutes"
                helperText="Helper text"
                validated={{ success: true }}
              />
              <TimePicker
                label={{ text: "Label", optional: true }}
                hoursOptions={hoursOptions}
                placeholderHours="Hours"
                placeholderMinutes="Minutes"
                helperText="Helper text"
                validated={{ success: false, message: "Something went wrong!" }}
              />
            </Stack>
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
}
