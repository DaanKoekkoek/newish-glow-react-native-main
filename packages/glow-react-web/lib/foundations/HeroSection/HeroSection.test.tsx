import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import { axe } from "jest-axe";
import meta, { Default } from "./HeroSection.stories";

const HeroSectionStory = composeStory(Default, meta);

describe("HeroSection", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<HeroSectionStory {...Default.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { asFragment } = render(<HeroSectionStory {...Default.args} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a heading with formatted title", () => {
    render(<HeroSectionStory {...Default.args} />);
    expect(screen.getAllByTestId("heading")[0]).toHaveTextContent(
      "Title highlight",
    );
  });

  it("renders description when passed as a string", () => {
    render(<HeroSectionStory {...Default.args} />);
    expect(screen.getByText("Short description")).toBeInTheDocument();
  });

  it("applies single palette class to the section", () => {
    render(<HeroSectionStory {...Default.args} palette="purple" />);
    const heroes = screen.getAllByTestId("hero");
    heroes.forEach((hero) => {
      expect(hero.className).toMatch(/has-palette-purple/);
    });
  });

  it("applies first palette in array as class to the section", () => {
    render(<HeroSectionStory {...Default.args} />);
    const hero = screen.getAllByTestId("hero")[0];
    expect(hero.className).toMatch(/has-palette-red/);
  });
});
