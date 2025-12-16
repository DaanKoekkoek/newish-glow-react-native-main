import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";

import { Snackbar } from "./Snackbar";
import type { SnackbarProps, Snack, SnackbarPosition } from "./Snackbar.types";
import { snackbarHelper } from "./snackbarHelper";
import { useSnackbarStore } from "./snackbarStore";
import { Button } from "../Button";

export const mockSnack = (args: Partial<Snack>): Snack => ({
  ...args,
  context: args.context || "persists",
  createdAt: Date.now(),
  id: args.id || String(new Date().getTime()),
  message: args.message || "Loading...",
  cancelButtonText: args.cancelButtonText,
  position: args.position || "bottom",
  type: args.type || "loading",
  visible: args.visible || true,
});

export const SnackbarPlayground = (
  args: SnackbarProps & { position: SnackbarPosition },
) => {
  const [count, setCount] = React.useState(1);
  const { snacks } = useSnackbarStore();

  const addDefaultSnack = useCallback(() => {
    snackbarHelper(
      mockSnack({
        position: args.position,
        id: String(count),
        type: "default",
        message: "Your message goes here...",
        icon: { name: "chat", solid: true },
      }),
    );

    setCount((prev) => prev + 1);
  }, [args.position, count]);

  const addLoadingSnack = useCallback(() => {
    snackbarHelper({
      cancelButtonText: "Cancel",
      position: args.position,
      id: String(count),
      type: "loading",
      message: "Loading...",
    });

    setCount((prev) => prev + 1);
  }, [args.position, count]);

  const updateFirstLoadingSnack = useCallback(() => {
    const firstLoadingSnack = snacks.find((snack) => snack.type === "loading");

    if (firstLoadingSnack) {
      snackbarHelper({
        ...firstLoadingSnack,
        message: "Updated loading message...",
      });
    }
  }, [snacks]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height:
          Platform.OS === "web" ? Dimensions.get("window").height : "100%",
        alignItems: "center",
        padding: 8,
        gap: 8,
      }}
    >
      <Button onPress={addLoadingSnack} size="sm">
        + 1 loading snack
        <Button.Icon name="loading" />
      </Button>
      <Button onPress={addDefaultSnack} prominence="secondary" size="sm">
        + 1 default snack
        <Button.Icon name="chat" solid />
      </Button>
      <Button
        onPress={updateFirstLoadingSnack}
        prominence="emphasised"
        size="sm"
      >
        Update loading snack
        <Button.Icon name="loading" />
      </Button>
      <Snackbar {...args} />
    </View>
  );
};
