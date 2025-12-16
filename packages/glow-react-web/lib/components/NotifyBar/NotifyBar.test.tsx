import { composeStory } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";

import meta, {
  Basic,
  Success,
  Error,
  WithAction,
  WithClose,
  FullExample,
} from "./NotifyBar.stories";

const BasicNotifyBar = composeStory(Basic, meta);
const SuccessNotifyBar = composeStory(Success, meta);
const ErrorNotifyBar = composeStory(Error, meta);
const WithActionNotifyBar = composeStory(WithAction, meta);
const WithCloseNotifyBar = composeStory(WithClose, meta);
const FullExampleNotifyBar = composeStory(FullExample, meta);

describe("<NotifyBar />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(<BasicNotifyBar {...BasicNotifyBar.args} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with the default state", () => {
    render(<BasicNotifyBar {...BasicNotifyBar.args} />);
    expect(screen.getByRole("alert")).toHaveClass("state-default");
  });

  it("renders with the succes state", () => {
    render(<SuccessNotifyBar {...SuccessNotifyBar.args} />);
    expect(screen.getByRole("alert")).toHaveClass("state-success");
  });

  it("renders with the error state", () => {
    render(<ErrorNotifyBar {...ErrorNotifyBar.args} />);
    expect(screen.getByRole("alert")).toHaveClass("state-error");
  });

  it("displays the correct message", () => {
    const testMessage = "Test notification message";
    render(<BasicNotifyBar {...BasicNotifyBar.args} children={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("renders with the correct icon", () => {
    render(<BasicNotifyBar {...BasicNotifyBar.args} icon="3d" />);
    const icon = screen.getByTestId("notify-bar-icon");
    expect(icon).toBeInTheDocument();
  });

  it("calls onActionPress when action button is clicked", () => {
    const onActionPress = jest.fn();
    render(
      <WithActionNotifyBar
        {...WithActionNotifyBar.args}
        onActionPress={onActionPress}
      />,
    );

    const actionButton = screen.getByText(
      WithActionNotifyBar.args?.actionText || "",
    );
    fireEvent.click(actionButton);
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <WithCloseNotifyBar
        {...WithCloseNotifyBar.args}
        onClose={onClose}
        closeText="Close"
      />,
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders a full example with all features", () => {
    const onActionPress = jest.fn();
    const onClose = jest.fn();

    render(
      <FullExampleNotifyBar
        {...FullExampleNotifyBar.args}
        onActionPress={onActionPress}
        onClose={onClose}
      />,
    );

    // Verify message
    expect(
      screen.getByText(
        "This is a notification with both an action and a close button and an icon.",
      ),
    ).toBeInTheDocument();

    // Verify buttons
    const actionButton = screen.getByText(
      FullExampleNotifyBar.args?.actionText || "",
    );
    expect(actionButton).toBeInTheDocument();

    if (FullExampleNotifyBar.args?.closeText) {
      const closeButton = screen.getByText(FullExampleNotifyBar.args.closeText);
      expect(closeButton).toBeInTheDocument();
    }

    // Verify icon
    const icon = screen.getByTestId("notify-bar-icon");
    expect(icon).toBeInTheDocument();
  });
});
