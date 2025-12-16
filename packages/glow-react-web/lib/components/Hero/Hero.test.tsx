import { render, screen } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import { axe } from "jest-axe";
import meta, { Default } from "./Hero.stories";

const HeroStory = composeStory(Default, meta);

describe("<Hero />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<HeroStory {...Default.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", async () => {
    const { asFragment } = render(<HeroStory {...Default.args} />);
    await screen.findByTestId("image");

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders heading title and subtitle using testIDs", () => {
    render(<HeroStory {...Default.args} />);

    expect(screen.getByTestId("hero-heading-title")).toBeInTheDocument();
    expect(screen.getByTestId("hero-heading-subtitle")).toBeInTheDocument();
  });

  it("renders description and footnote using testIDs", () => {
    render(<HeroStory {...Default.args} />);

    expect(screen.getByTestId("hero-description")).toBeInTheDocument();
    expect(screen.getByTestId("hero-footnote")).toBeInTheDocument();
  });

  it("renders the callToAction (buttons) using testIDs", () => {
    render(<HeroStory {...Default.args} />);

    const buttons = screen.getAllByTestId("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("Button");
    expect(buttons[1]).toHaveTextContent("Button");
  });

  it("renders sticker if description is present", () => {
    render(
      <HeroStory
        {...Default.args}
        variant="solid"
        sticker={{ description: "content", type: "default" }}
      />,
    );
    expect(screen.getByTestId("hero-sticker")).toBeInTheDocument();
  });

  it("renders image based on variant", () => {
    render(<HeroStory {...Default.args} />);

    expect(screen.getByTestId("hero-image")).toBeInTheDocument();
  });
});
