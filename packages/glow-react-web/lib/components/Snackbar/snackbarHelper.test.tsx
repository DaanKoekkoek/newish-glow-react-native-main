// snackbarHelper.test.tsx
import { SnackOptions } from "./Snackbar.types";
import { snackbarHelper } from "./snackbarHelper";
import { toast as sonnerToast } from "sonner";

// Mock the Sonner API
jest.mock("sonner", () => ({
  toast: {
    custom: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("snackbarHelper", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls sonnerToast.custom with correct options for a default snack", () => {
    const options: SnackOptions = {
      message: "Test message",
      type: "default",
      id: "123",
      cancelButtonText: "Cancel",
    };

    snackbarHelper(options);

    // Verify that sonnerToast.custom was called once
    expect(sonnerToast.custom).toHaveBeenCalledTimes(1);

    // Get the arguments passed to custom()
    const callArgs = (sonnerToast.custom as jest.Mock).mock.calls[0];
    const toastOptions = callArgs[1];

    // Ensure that toastOptions includes the correct position and id
    expect(toastOptions).toMatchObject({
      position: "bottom-center", // since options.position not provided, defaults to bottom-center
      duration: 5000, // default duration for non-loading types
      id: options.id,
    });
  });

  it("sets duration to Infinity for loading snacks", () => {
    const options: SnackOptions = {
      message: "Loading",
      type: "loading",
      id: "456",
    };

    snackbarHelper(options);

    expect(sonnerToast.custom).toHaveBeenCalled();
    const toastOptions = (sonnerToast.custom as jest.Mock).mock.calls[0][1];
    expect(toastOptions.duration).toBe(Infinity);
  });

  it("calls sonnerToast.dismiss when snackbarHelper.dismiss is invoked", () => {
    snackbarHelper.dismiss("789");
    expect(sonnerToast.dismiss).toHaveBeenCalledWith("789");
  });
});
