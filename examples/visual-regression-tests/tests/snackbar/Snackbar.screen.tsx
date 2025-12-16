import type { Snack } from "@odido-portals/glow-react-native";
import {
  Main,
  Grid,
  Section,
  snackbarHelper,
} from "@odido-portals/glow-react-native";
import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mockSnack = (args: Partial<Snack>): Snack => ({
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

const Decorator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Main hasSnackbar safeAreaInsets={insets}>
      <Section>
        <Grid>
          <Grid.Column>
            <View
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
              }}
            />
          </Grid.Column>
        </Grid>
      </Section>
    </Main>
  );
};

export const SnackbarLoadingScreen = () => {
  snackbarHelper.remove();

  useEffect(() => {
    snackbarHelper(
      mockSnack({
        position: "top",
        type: "loading",
        message: "Loading...",
        cancelButtonText: "Cancel",
        duration: Infinity,
      }),
    );

    return () => {
      snackbarHelper.remove();
    };
  }, []);

  return <Decorator />;
};

export const SnackbarErrorScreen = () => {
  snackbarHelper.remove();

  useEffect(() => {
    snackbarHelper(
      mockSnack({
        position: "top",
        type: "error",
        message: "Payment error occurred!",
        duration: Infinity,
      }),
    );

    return () => {
      snackbarHelper.remove();
    };
  }, []);

  return <Decorator />;
};

export const SnackbarSuccessScreen = () => {
  snackbarHelper.remove();

  useEffect(() => {
    snackbarHelper(
      mockSnack({
        position: "top",
        message: "Your profile changes are saved!",
        type: "success",
        duration: Infinity,
      }),
    );

    return () => {
      snackbarHelper.remove();
    };
  }, []);

  return <Decorator />;
};

export const SnackbarDefaultScreen = () => {
  snackbarHelper.remove();

  useEffect(() => {
    snackbarHelper(
      mockSnack({
        position: "top",
        message: "Your message goes here...",
        type: "default",
        icon: {
          name: "chat",
          solid: true,
        },
        duration: Infinity,
      }),
    );

    return () => {
      snackbarHelper.remove();
    };
  }, []);

  return <Decorator />;
};
