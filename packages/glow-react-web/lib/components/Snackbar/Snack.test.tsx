import { composeStory } from "@storybook/react";

import meta, { Default, Error, Success, Loading } from "./Snackbar.stories";
import { render, screen, fireEvent } from "@testing-library/react";
import { Snack } from "./Snack";

const SnackDefault = composeStory(Default, meta);
const SnackError = composeStory(Error, meta);
const SnackSuccess = composeStory(Success, meta);
const SnackLoading = composeStory(Loading, meta);

describe.each([
  ["Default", SnackDefault],
  ["Error", SnackError],
  ["Success", SnackSuccess],
  ["Loading", SnackLoading],
])("%s Snack", (_, Story) => {
  test("renders a stable snapshot", () => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });

  it("renders a loading snack with a spinner and cancel button, and calls onDismiss when clicked", () => {
    const onDismiss = jest.fn();
    render(
      <Snack
        message="Loading..."
        id="4"
        type="loading"
        cancelButtonText="Cancel"
        onDismiss={onDismiss}
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    // Check that a button with "Cancel" text is rendered
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onDismiss).toHaveBeenCalledWith("4");
  });
});
