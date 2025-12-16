import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import meta, { Basic } from "./ProgressBar.stories";
import { ProgressBar, ProgressBarStep } from "./ProgressBar";

const ProgressBarStory = composeStory(Basic, meta);

describe("<ProgressBar />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(
      <ProgressBarStory {...ProgressBarStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render 5 steps", () => {
    render(
      <ProgressBar progress={10}>
        <ProgressBarStep active key="1" title="Step 1" testID="step_1" />
        <ProgressBarStep key="2" title="Step 2" testID="step_2" />
        <ProgressBarStep key="3" title="Step 3" testID="step_3" />
        <ProgressBarStep key="4" title="Step 4" testID="step_4" />
      </ProgressBar>,
    );

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`step_${i}`)).toBeDefined();
    }
  });

  it("should highlight the active step", () => {
    render(
      <ProgressBar progress={30}>
        <ProgressBarStep key="1" title="Step 1" testID="step_1" />
        <ProgressBarStep active key="2" title="Step 2" testID="step_2" />
        <ProgressBarStep key="3" title="Step 3" testID="step_3" />
        <ProgressBarStep key="4" title="Step 4" testID="step_4" />
      </ProgressBar>,
    );
    const activeStep = screen.getByTestId("step_2");
    expect(activeStep).toHaveClass("step-active");
  });

  it("should show correct labels", () => {
    render(
      <ProgressBar progress={30}>
        <ProgressBarStep key="1" title="Step 1" testID="step_1" />
        <ProgressBarStep active key="2" title="Step 2" testID="step_2" />
        <ProgressBarStep key="3" title="Step 3" testID="step_3" />
        <ProgressBarStep key="4" title="Step 4" testID="step_4" />
      </ProgressBar>,
    );
    expect(screen.getByTestId("step_1")).toHaveTextContent("Step 1");
    expect(screen.getByTestId("step_2")).toHaveTextContent("Step 2");
    expect(screen.getByTestId("step_3")).toHaveTextContent("Step 3");
  });
});
