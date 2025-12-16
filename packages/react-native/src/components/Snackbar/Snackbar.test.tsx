import { render, fireEvent, act } from "_test-utils";
import React from "react";

import { Snackbar } from "./Snackbar";
import { mockSnack } from "./Snackbar.mocks";
import { useSnackbar } from "./useSnackbar";

jest.mock("./useSnackbar");

describe("<Snackbar />", () => {
  const mockUseSnackbar = useSnackbar as jest.MockedFunction<
    typeof useSnackbar
  >;

  const mockOnSnackHide = jest.fn();
  const mockOnSnackPress = jest.fn();
  const mockOnSnackShow = jest.fn();
  const mockStartPause = jest.fn();
  const mockEndPause = jest.fn();
  const mockUpdateHeight = jest.fn();
  const mockCalculateOffset = jest.fn();
  const mockDuration = 1000;

  const defaultMocks = {
    onSnackHide: mockOnSnackHide,
    onSnackPress: mockOnSnackPress,
    onSnackShow: mockOnSnackShow,
  };

  jest.useFakeTimers();
  jest.spyOn(global, "setTimeout");

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockUseSnackbar.mockReturnValue({
      snacks: [1, 2].map((i) =>
        mockSnack({
          id: `snack-${i}`,
          type: "default",
          message: `foo ${i}`,
          duration: mockDuration,
        }),
      ),
      handlers: {
        startPause: mockStartPause,
        endPause: mockEndPause,
        updateHeight: mockUpdateHeight,
        calculateOffset: mockCalculateOffset,
      },
    });
  });

  it("has custom testID as data attribute when provided", () => {
    const { queryByTestId } = render(
      <Snackbar {...defaultMocks} testID="custom-test-id" />,
    );

    expect(queryByTestId("custom-test-id")).toBeTruthy();
  });

  it("contains the number of snacks returned by the 'useSnackbar' and call the 'onSnackShow' function onDidMount", async () => {
    const { queryAllByTestId } = render(<Snackbar {...defaultMocks} />);

    expect(queryAllByTestId("snackbar-animator")).toHaveLength(2);
  });

  it("calls the functional props onSnackShow, onSnackHide and onSnackPress on interaction", async () => {
    mockUseSnackbar.mockReturnValue({
      snacks: [],
      handlers: {
        startPause: mockStartPause,
        endPause: mockEndPause,
        updateHeight: mockUpdateHeight,
        calculateOffset: mockCalculateOffset,
      },
    });

    const { rerender, queryByTestId } = render(<Snackbar {...defaultMocks} />);

    expect(mockOnSnackShow).toHaveBeenCalledTimes(0);
    expect(mockOnSnackPress).toHaveBeenCalledTimes(0);

    mockUseSnackbar.mockReturnValue({
      snacks: [
        mockSnack({
          id: "snack-1",
          type: "loading",
          message: "Loading...",
          cancelButtonText: "cancel",
          duration: mockDuration,
        }),
      ],
      handlers: {
        startPause: mockStartPause,
        endPause: mockEndPause,
        updateHeight: mockUpdateHeight,
        calculateOffset: mockCalculateOffset,
      },
    });

    rerender(<Snackbar {...defaultMocks} />);

    expect(mockOnSnackShow).toHaveBeenCalledTimes(1);
    expect(mockOnSnackPress).toHaveBeenCalledTimes(0);

    await act(() => {
      fireEvent.press(queryByTestId("snackbar-animator"));
    });

    expect(mockOnSnackPress).toHaveBeenCalledTimes(1);
  });
});
