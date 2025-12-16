import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import { axe } from "jest-axe";
import meta, { Default } from "./EmphasizedHeroSection.stories";

const EmphasizedHeroSectionStory = composeStory(Default, meta);

describe("<EmphasizedHeroSection />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(
      <EmphasizedHeroSectionStory {...Default.args} />,
    );
    jest.useRealTimers();
    const results = await axe(container);
    jest.useFakeTimers();
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", async () => {
    const { asFragment } = render(
      <EmphasizedHeroSectionStory {...Default.args} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the custom background when specified", () => {
    const customContent = <div data-testid="custom-content">Custom</div>;
    render(
      <EmphasizedHeroSectionStory
        {...Default.args}
        background="custom"
        custom={customContent}
      />,
    );
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("renders the visual media correctly", () => {
    render(<EmphasizedHeroSectionStory {...Default.args} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("does not render default gradient if background is custom", () => {
    render(
      <EmphasizedHeroSectionStory {...Default.args} background="custom" />,
    );
    const gradientGrid = screen.queryByTestId("grid-gradient-grid");
    expect(gradientGrid).not.toBeInTheDocument();
  });

  it("applies inverted class when order is 'inverted'", () => {
    render(<EmphasizedHeroSectionStory {...Default.args} order="inverted" />);
    const container = screen.getByTestId("emphasized-hero-section-container");
    expect(container).toHaveClass("is-inverted");
  });
});
