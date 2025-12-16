import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";

import meta, { Default, Budget } from "./BundleWidget.stories";

const BundleWidgetStory = composeStory(Default, meta);
const BundleWidgetBudgetStory = composeStory(Budget, meta);

describe("<BundleWidget />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <BundleWidgetStory {...BundleWidgetStory.args} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(
      <BundleWidgetStory {...BundleWidgetStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the remaining value correctly with comma if not an integer", () => {
    render(<BundleWidgetStory remaining={6.5} />);
    expect(screen.getByText("6,5")).toBeInTheDocument();
  });

  it("renders the remaining value as integer without comma", () => {
    render(<BundleWidgetStory remaining={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders the title and bundleType", () => {
    render(<BundleWidgetStory title="My Bundle" bundleType="internet-speed" />);
    expect(screen.getByText("My Bundle")).toBeInTheDocument();
    expect(screen.getByText("Mbit/s")).toBeInTheDocument();
  });

  it("renders the total amount with bundleType", () => {
    render(
      <BundleWidgetStory total={200} description="200 MB" bundleType="data" />,
    );
    expect(screen.getByText("200 MB")).toBeInTheDocument();
  });

  it("renders the icon when `showIcon` is true", () => {
    render(<BundleWidgetStory showIcon={true} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders a button if provided", async () => {
    const handleClick = jest.fn();
    render(
      <BundleWidgetStory
        button={{
          children: "Click me",
          onClick: handleClick,
          icon: { name: "plus" },
        }}
      />,
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders price when type is 'budget'", () => {
    render(<BundleWidgetBudgetStory {...BundleWidgetBudgetStory.args} />);
    expect(screen.getByText("Voor: 28,93")).toBeInTheDocument();
  });
});
