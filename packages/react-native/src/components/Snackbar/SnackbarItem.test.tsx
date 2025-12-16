import { render, fireEvent, act } from "_test-utils";
import React from "react";

import { SnackbarItem } from "./Snackbar";
import { mockSnack } from "./Snackbar.mocks";
import type { SnackbarItemStatusType } from "./Snackbar.types";

describe("<SnackbarItem />", () => {
  const mockDismissSnack = jest.fn();
  const mockOnLayout = jest.fn();

  const defaultMocks = {
    dismissSnack: mockDismissSnack,
    onLayout: mockOnLayout,
    windowWidth: 600,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has custom testID as data attribute when provided", () => {
    const { queryByTestId } = render(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "loading",
          message: "Loading...",
        })}
        testID="custom-test-id"
      />,
    );
    expect(queryByTestId("custom-test-id")).toBeTruthy();
  });

  it("has the message text", () => {
    const { getByText } = render(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "default",
          message: "foo",
        })}
      />,
    );
    expect(getByText("foo")).toBeDefined();
  });

  it("contains the icon when type === 'default' and the snack contains the 'icon' props", () => {
    const { queryByTestId, rerender } = render(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "default",
          message: "foo",
        })}
      />,
    );

    expect(queryByTestId("has-icon")).toBeNull();

    rerender(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "default",
          message: "foo",
          icon: { name: "chat" },
        })}
      />,
    );

    expect(queryByTestId("chat-icon")).toBeDefined();
  });

  it("has the cancel button and the loading spinner if the snack 'type' is equal to 'loading'", () => {
    const { queryByRole, queryByTestId, rerender } = render(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "default",
          message: "foo",
        })}
      />,
    );

    expect(queryByRole("button")).toBeNull();
    expect(queryByTestId("loading-icon")).toBeNull();

    rerender(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "loading",
          message: "Loading...",
        })}
      />,
    );

    expect(queryByRole("button")).toBeDefined();
    expect(queryByTestId("loading-icon")).toBeDefined();
  });

  it.each([
    ["error", "status-error"],
    ["success", "status-success"],
    ["loading", "loading"],
  ])(
    "renders the %i icon corresponding with the status, the test id should be %i",
    (type, iconName) => {
      const { getByTestId } = render(
        <SnackbarItem
          {...defaultMocks}
          snack={mockSnack({
            type: type as SnackbarItemStatusType,
            message: type,
          })}
        />,
      );

      expect(getByTestId(`${iconName}-icon`)).toBeDefined();
    },
  );

  it("calls the dismissSnack (function) prop when the cancel button is pressed", async () => {
    const { getByRole } = render(
      <SnackbarItem
        {...defaultMocks}
        snack={mockSnack({
          type: "loading",
          message: "Loading...",
        })}
      />,
    );

    expect(mockDismissSnack).toHaveBeenCalledTimes(0);

    await act(() => {
      fireEvent.press(getByRole("button"));
    });

    expect(mockDismissSnack).toHaveBeenCalledTimes(1);
  });
});
