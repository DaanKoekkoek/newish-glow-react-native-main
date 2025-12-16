import { composeStory } from "@storybook/react";
import { render, fireEvent, waitFor, act } from "_test-utils";
import React from "react";
import { Image } from "react-native";

import { Modal } from "./Modal";
import meta, {
  Basic,
  Right,
  Bottom,
  WithoutFooter,
  WithSnackbar,
} from "./Modal.stories";
import { Button } from "../Button";

const ModalBasic = composeStory(Basic, meta);
const ModalRight = composeStory(Right, meta);
const ModalBottom = composeStory(Bottom, meta);
const ModalWithoutFooter = composeStory(WithoutFooter, meta);
const ModalWithSnackbar = composeStory(WithSnackbar, meta);

describe.each([
  ["Basic", ModalBasic],
  ["Right", ModalRight],
  ["Bottom", ModalBottom],
  ["WithoutFooter", ModalWithoutFooter],
])("%s Modal", (_, Story) => {
  test("renders a stable snapshot", async () => {
    const { toJSON } = render(<Story {...Story.args} />);
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});

describe("<Modal />", () => {
  let mockPrefetch: jest.SpyInstance;

  beforeEach(() => {
    mockPrefetch = jest.spyOn(Image, "prefetch").mockResolvedValue(true);
  });

  afterEach(() => {
    mockPrefetch.mockRestore();
  });

  it("opens the modal when trigger is pressed", async () => {
    const { getByTestId, getAllByTestId } = render(
      <ModalBasic {...Basic.args} />,
    );
    const modalButton = getAllByTestId("button")[0];

    fireEvent.press(modalButton);

    await waitFor(() => {
      expect(getByTestId("modal")).toBeDefined();
    });
  });

  it("closes the modal when the backdrop is pressed", async () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <ModalBasic {...Basic.args} />,
    );
    const modalButton = getAllByTestId("button")[0];

    fireEvent.press(modalButton);

    const backdrop = getByTestId("backdrop");

    fireEvent.press(backdrop);

    await waitFor(() => {
      expect(queryByTestId("modal")).not.toBeInTheDocument();
    });
  });

  it("contains the snackbar when the 'hasSnackbar' prop is true", async () => {
    const { queryByTestId, getByTestId, getAllByTestId, rerender } = render(
      <ModalBasic {...ModalWithSnackbar.args} hasSnackbar={false} />,
    );

    const modalTrigger = getAllByTestId("button")[0];

    await act(() => {
      fireEvent.press(modalTrigger);
    });

    expect(queryByTestId("snackbar")).toBeNull();

    rerender(<ModalBasic {...ModalWithSnackbar.args} hasSnackbar />);

    await act(() => {
      fireEvent.press(modalTrigger);
    });

    expect(getByTestId("snackbar")).toBeTruthy();
  });

  it("contains a custom header when customHeader is set", async () => {
    const { getByTestId, getAllByTestId } = render(
      <Modal
        title="Custom header modal"
        trigger={<Button>Custom header modal</Button>}
        customHeader={<Modal.CustomHeader children={<>Custom content</>} />}
      />,
    );

    const modalButton = getAllByTestId("button")[0];

    fireEvent.press(modalButton);

    expect(getByTestId("modal-custom-header")).toBeDefined();
  });
});
