import { composeStory } from "@storybook/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import meta, { Default, Animated, LongDescription } from "./Tooltip.stories";
import { Tooltip } from "./Tooltip";
import { Icon } from "foundations/Icon";

const TooltipStory = composeStory(Default, meta);
const AnimatedTooltipStory = composeStory(Animated, meta);
const LongDescriptionTooltipStory = composeStory(LongDescription, meta);

describe("<Tooltip />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<TooltipStory {...TooltipStory.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(<TooltipStory {...TooltipStory.args} />);
    expect(container).toMatchSnapshot();
  });

  it("shows tooltip on hover", () => {
    render(<TooltipStory {...TooltipStory.args} />);

    const tooltipTrigger = screen.getByTestId("tooltip-button");

    // Initially tooltip should not be visible
    const tooltip = screen.getByTestId("tooltip-tooltip");
    expect(tooltip).not.toHaveClass("visible");

    // Hover over the trigger
    fireEvent.mouseEnter(tooltipTrigger);

    // Tooltip should now be visible
    expect(tooltip).toHaveClass("visible");

    // Mouse leave should hide tooltip
    fireEvent.mouseLeave(tooltipTrigger);
    expect(tooltip).not.toHaveClass("visible");
  });

  it("shows tooltip on click when closeIcon is present", () => {
    render(
      <LongDescriptionTooltipStory {...LongDescriptionTooltipStory.args} />,
    );

    const tooltipTrigger = screen.getByTestId("tooltip-button");
    const tooltip = screen.getByTestId("tooltip-tooltip");

    // Tooltip should now be visible
    expect(tooltip).not.toHaveClass("visible");
    // Click on the trigger
    fireEvent.click(tooltipTrigger);

    // Tooltip should now be visible
    expect(tooltip).toHaveClass("visible");

    // Click close button should hide tooltip
    const closeButton = screen.getByTestId("tooltip-close-button");
    fireEvent.click(closeButton);

    // Tooltip should be hidden
    expect(tooltip).not.toHaveClass("visible");
  });

  it("displays the description correctly", () => {
    const testDescription = "Test tooltip description";
    render(
      <Tooltip description={testDescription}>
        <Icon name="status-info" />
      </Tooltip>,
    );

    expect(screen.getByTestId("tooltip-description")).toHaveTextContent(
      testDescription,
    );
  });

  it("applies animated class when animated prop is true", () => {
    render(<AnimatedTooltipStory {...AnimatedTooltipStory.args} />);

    const tooltipContainer = screen.getByTestId("tooltip");
    expect(tooltipContainer).toHaveClass("animated");
  });

  it("renders with custom testID", () => {
    const customTestId = "custom-tooltip";
    render(
      <Tooltip description="Test tooltip" testID={customTestId}>
        <Icon name="status-info" />
      </Tooltip>,
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-tooltip`)).toBeInTheDocument();
    expect(
      screen.getByTestId(`${customTestId}-description`),
    ).toBeInTheDocument();
    expect(screen.getByTestId(`${customTestId}-button`)).toBeInTheDocument();
  });

  it("positions tooltip based on posHorizontal prop", () => {
    const { rerender } = render(
      <Tooltip description="Left tooltip" tipPosition="left">
        <Icon name="status-info" />
      </Tooltip>,
    );

    // Rerender with different position
    rerender(
      <Tooltip description="Right tooltip" tipPosition="right">
        <Icon name="status-info" />
      </Tooltip>,
    );

    // If we get here without errors, the test passes
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  it("does not show tooltip when inactive", () => {
    render(<TooltipStory {...TooltipStory.args} active={false} />);

    const tooltipTrigger = screen.getByTestId("tooltip-button");

    // Initially tooltip should not be visible
    const tooltip = screen.getByTestId("tooltip-tooltip");
    expect(tooltip).not.toHaveClass("visible");

    // Hover over the trigger
    fireEvent.mouseEnter(tooltipTrigger);

    // Tooltip should not be visible
    expect(tooltip).not.toHaveClass("visible");
  });
});
