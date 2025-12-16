"use client";

import { Button } from "@odido-portals/glow-react-web/button";
import {
  Snackbar,
  snackbarHelper,
} from "@odido-portals/glow-react-web/snackBar";

import BaseLayout from "../../../BaseLayout";

export default function CounterPage() {
  return (
    <BaseLayout title="Counter">
      <div>
        <Button
          onClick={() =>
            snackbarHelper({
              cancelButtonText: "Cancel",
              position: "bottom",
              type: "loading",
              message: "Loading...",
            })
          }
        >
          Snackbar
        </Button>
        <Snackbar />
      </div>
    </BaseLayout>
  );
}
