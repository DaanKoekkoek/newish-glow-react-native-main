import React, { useCallback } from "react";

import { Snackbar } from "./Snackbar";
import type { Snack, SnackbarPosition } from "./Snackbar.types";
import { snackbarHelper } from "./snackbarHelper";
import { Button } from "../Button";
import { Stack } from "foundations/Stack";
import { Checkbox } from "components/Checkbox";

let loadingSnackId: undefined | string = undefined;

// eslint-disable-next-line react-refresh/only-export-components
export const mockSnack = (args: Partial<Snack>): Snack => ({
  ...args,
  id: args.id || String(new Date().getTime()),
  message: args.message || "Loading...",
  cancelButtonText: args.cancelButtonText,
  position: args.position || "bottom",
  type: args.type || "loading",
});

export const SnackbarPlayground = (args: { position: SnackbarPosition }) => {
  const [count, setCount] = React.useState(1);
  const [position, setPosition] = React.useState(args.position);

  const togglePosition = useCallback(() => {
    setPosition((prev: SnackbarPosition) =>
      prev === "top" ? "bottom" : "top",
    );
  }, []);

  const addDefaultSnack = useCallback(() => {
    snackbarHelper(
      mockSnack({
        position: position,
        id: String(count),
        type: "default",
        message: "Your message goes here...",
        icon: { name: "chat", solid: true },
      }),
    );

    setCount((prev) => prev + 1);
  }, [position, count]);

  const addLoadingSnack = useCallback(() => {
    loadingSnackId = snackbarHelper({
      cancelButtonText: "Cancel",
      position: position,
      id: String(count),
      type: "loading",
      message: "Loading...",
    })?.toString();

    setCount((prev) => prev + 1);
  }, [position, count]);

  const updateLastLoadingSnack = useCallback(() => {
    if (!loadingSnackId) return;
    snackbarHelper({
      message: "Updated loading message...",
      id: loadingSnackId,
      cancelButtonText: "Cancel",
      position: position,
      type: "success",
    });
  }, [position]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
        alignItems: "center",
        padding: 8,
        gap: 8,
      }}
    >
      <Stack justifyContent="center" gap="sm">
        <Button
          onClick={addDefaultSnack}
          icon={{ name: "chat", solid: true }}
          prominence="secondary"
          size="sm"
        >
          Create default snack
        </Button>
        <Button onClick={addLoadingSnack} icon={{ name: "loading" }} size="sm">
          Create loading snack
        </Button>
        <Button
          onClick={updateLastLoadingSnack}
          icon={{ name: "loading" }}
          prominence="emphasised"
          size="sm"
        >
          Update last loading snack
        </Button>
        <Checkbox
          legend={{ label: "Position" }}
          helperText="Change the position of the snack"
          label="Show Snacks at the bottom"
          checked={position === "bottom"}
          id="snack-position-toggle"
          onChange={togglePosition}
        ></Checkbox>
      </Stack>

      <Snackbar />
    </div>
  );
};
