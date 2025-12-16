import type { Meta, StoryObj } from "@storybook/react";

import { Snackbar } from "./Snackbar";
import { Snack } from "./Snack";
import { SnackbarPlayground } from "./Snackbar.mocks";
import type { SnackOptions } from "./Snackbar.types";
import { Stack } from "foundations/Stack";

const meta: Meta<typeof Snackbar> = {
  title: "DesignSystem/Components/Notifications/Snackbar",
  component: Snackbar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
  argTypes: {
    topOffset: {
      table: {
        disable: true,
      },
    },
  },
  render: function Render() {
    return <SnackbarPlayground position="bottom" />;
  },
};

const SnackDecorator: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    style={{
      height: "100vh",
    }}
  >
    {children}
  </Stack>
);

export const Default: StoryObj<typeof Snack> = {
  args: {
    message: "Default Snack",
  },
  render: function Render(args: SnackOptions) {
    return (
      <SnackDecorator>
        <Snack
          type="default"
          message={args.message}
          icon={{ name: "chat", solid: true }}
        />
      </SnackDecorator>
    );
  },
};

export const Success: StoryObj<typeof Snack> = {
  args: {
    message: "Your profile changes are saved!",
  },
  render: function Render(args: SnackOptions) {
    return (
      <SnackDecorator>
        <Snack type="success" message={args.message} />
      </SnackDecorator>
    );
  },
};

export const Error: StoryObj<typeof Snack> = {
  args: {
    message: "Payment error occurred",
  },
  render: function Render(args: SnackOptions) {
    return (
      <SnackDecorator>
        <Snack type="error" message={args.message} />
      </SnackDecorator>
    );
  },
};

export const Loading: StoryObj<typeof Snack> = {
  args: {
    message: "Loading...",
  },
  render: function Render(args: SnackOptions) {
    return (
      <SnackDecorator>
        <Snack
          type="loading"
          message={args.message}
          cancelButtonText="Cancel"
        />
      </SnackDecorator>
    );
  },
};
