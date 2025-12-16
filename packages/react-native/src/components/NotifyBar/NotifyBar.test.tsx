import { composeStory } from "@storybook/react";
import { render, fireEvent } from "_test-utils";
import React from "react";

import Meta, {
  Basic,
  WithAction,
  Success,
  Error,
  FullExample,
} from "./NotifyBar.stories";

const BasicNotifyBarTest = composeStory(Basic, Meta);
const ActionNotifyBarTest = composeStory(WithAction, Meta);
const SuccessNotifyBarTest = composeStory(Success, Meta);
const ErrorNotifyBarTest = composeStory(Error, Meta);
const FullNotifyBarTest = composeStory(FullExample, Meta);

describe("<NotifyBar />", () => {
  it("renders default story and checks close button", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<BasicNotifyBarTest onClose={onCloseMock} />);
    expect(getByText("This is a default notification.")).toBeTruthy();

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders with action button and checks both action and close buttons", () => {
    const actionMock = jest.fn();
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <ActionNotifyBarTest onActionPress={actionMock} onClose={onCloseMock} />,
    );

    const actionButton = getByText("Refresh");
    fireEvent.press(actionButton);
    expect(actionMock).toHaveBeenCalled();

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders success state correctly and checks close button", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <SuccessNotifyBarTest onClose={onCloseMock} />,
    );
    expect(getByText("This is a success notification.")).toBeTruthy();

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders error state correctly and checks close button", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<ErrorNotifyBarTest onClose={onCloseMock} />);
    expect(getByText("This is an error notification.")).toBeTruthy();

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders full example with multiple interactions", () => {
    const onCloseMock = jest.fn();
    const onActionMock = jest.fn();
    const { getByText } = render(
      <FullNotifyBarTest
        onClose={onCloseMock}
        onActionPress={onActionMock}
        actionText="Undo"
      />,
    );

    const actionButton = getByText("Undo");
    fireEvent.press(actionButton);
    expect(onActionMock).toHaveBeenCalled();

    const closeButton = getByText("Close");
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  // Snapshot tests for all the variants of the component
  describe.each([
    ["Basic", BasicNotifyBarTest],
    ["WithAction", ActionNotifyBarTest],
    ["Success", SuccessNotifyBarTest],
    ["Error", ErrorNotifyBarTest],
    ["FullExample", FullNotifyBarTest],
  ])("%s Callout", (_, Story) => {
    test("renders a stable snapshot", () => {
      const { toJSON } = render(<Story {...Story.args} />);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
