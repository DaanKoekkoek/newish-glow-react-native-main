"use client";

import "dayjs/locale/en-gb";

import { InputFieldDatePicker } from "@odido-portals/glow-react-web/input-field-datepicker";
import { enGB } from "date-fns/locale";
import { useState } from "react";
import { registerLocale } from "react-datepicker";

import BaseLayout from "../../../BaseLayout";

registerLocale("en-gb", enGB);

export default function InputFieldDatePickerPage() {
  const [v, setValue] = useState<string | undefined>();

  return (
    <BaseLayout title="InputFieldDatePicker">
      <InputFieldDatePicker
        id="date-picker"
        placeholder="Pick a date"
        value={v}
        onChange={(date: string) => setValue(date)}
        locale={{ code: "en-gb", object: enGB }}
      />
    </BaseLayout>
  );
}
