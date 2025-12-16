import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { Status } from "./Status";
import meta, { Basic } from "./Status.stories";

const StatusStory = composeStory(Basic, meta);

describe("<Status />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(<StatusStory {...StatusStory.args} />);
    expect(container).toMatchSnapshot();
  });

  it("renders success status with correct styles", () => {
    render(
      <Status
        type="success"
        statusText="Operation successful"
        testID="success-status"
      />,
    );
    expect(screen.getByTestId("success-status-indicator")).toHaveClass(
      "success",
    );
    expect(screen.getByText("Operation successful")).toBeInTheDocument();
  });

  it("renders warning status with correct styles", () => {
    render(
      <Status
        type="warning"
        statusText="Proceed with caution"
        testID="warning-status"
      />,
    );
    expect(screen.getByTestId("warning-status-indicator")).toHaveClass(
      "warning",
    );
    expect(screen.getByText("Proceed with caution")).toBeInTheDocument();
  });

  it("renders error status with correct styles", () => {
    render(
      <Status type="error" statusText="Action failed" testID="error-status" />,
    );
    expect(screen.getByTestId("error-status-indicator")).toHaveClass("error");
    expect(screen.getByText("Action failed")).toBeInTheDocument();
  });

  it("applies the testID prop correctly", () => {
    render(
      <Status
        type="success"
        statusText="Operation successful"
        testID="custom-test-id"
      />,
    );
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });
});
