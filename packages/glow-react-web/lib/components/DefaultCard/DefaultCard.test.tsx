import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Default } from "./DefaultCard.stories";

const DefaultCardStory = composeStory(Default, meta);

describe("<DefaultCard />", () => {
  it("renders a stable snapshot", () => {
    const { asFragment } = render(
      <DefaultCardStory
        {...DefaultCardStory.args}
        type="image"
        image={{ src: "test-image.jpg", alt: "test image" }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the highlight text when passed", () => {
    render(
      <DefaultCardStory
        {...DefaultCardStory.args}
        highlightText="This is a highlight"
      />,
    );
    expect(screen.getByText("This is a highlight")).toBeInTheDocument();
  });

  it("does not render highlight text when not passed", () => {
    render(<DefaultCardStory {...DefaultCardStory.args} />);
    expect(screen.queryByText("This is a highlight")).not.toBeInTheDocument();
  });

  it("renders badge when badgeText is passed", () => {
    render(<DefaultCardStory {...DefaultCardStory.args} badgeText="New" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("does not render badge when badgeText is not passed", () => {
    render(<DefaultCardStory {...DefaultCardStory.args} />);
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  it("renders an image when 'type' is 'image' and image is passed", () => {
    const imageMock = { src: "test-image.jpg", alt: "test image" };
    render(
      <DefaultCardStory
        {...DefaultCardStory.args}
        type="image"
        image={imageMock}
      />,
    );
    expect(screen.getByAltText("test image")).toBeInTheDocument();
  });

  it("renders an illustration when 'type' is 'illustration' and image is passed", () => {
    const imageMock = {
      src: "test-illustration.jpg",
      alt: "test illustration",
    };
    render(
      <DefaultCardStory
        {...DefaultCardStory.args}
        type="illustration"
        image={imageMock}
      />,
    );
    expect(screen.getByAltText("test illustration")).toBeInTheDocument();
  });

  it("renders icon when 'type' is 'icon' and icon is passed", () => {
    render(
      <DefaultCardStory {...DefaultCardStory.args} type="icon" icon="key" />,
    );
    expect(screen.getAllByTestId("icon")[0]).toBeInTheDocument();
  });

  it("applies the correct class for 'emphasised' variant", () => {
    render(
      <DefaultCardStory {...DefaultCardStory.args} variant="emphasised" />,
    );
    const element = screen.getByTestId("default-card");
    expect(element).toHaveClass("default-card-variant-emphasised");
  });

  it("applies the correct class for 'default' palette", () => {
    render(<DefaultCardStory {...DefaultCardStory.args} palette="default" />);
    const element = screen.getByTestId("default-card");
    expect(element).toHaveClass("has-default-palette");
  });

  it("renders children content", () => {
    render(
      <DefaultCardStory {...DefaultCardStory.args}>
        <div>Child content</div>
      </DefaultCardStory>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders price context when price is passed", () => {
    const priceMock = { value: "99,99" };
    const { asFragment } = render(
      <DefaultCardStory {...DefaultCardStory.args} price={priceMock} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
