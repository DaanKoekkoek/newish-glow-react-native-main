import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";

import meta, {
  Default as DefaultStory,
  ThreeSlides as ThreeSlidesStory,
} from "./Carousel.stories";
import { TextLink } from "components/TextLink";

expect.extend(toHaveNoViolations);

const Default = composeStory(DefaultStory, meta);
const ThreeSlides = composeStory(ThreeSlidesStory, meta);

describe("<Carousel />", () => {
  it("should not have any accessibility violations", async () => {
    render(<Default {...Default.args} />);
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    render(<Default {...Default.args} />);
    expect(document.body).toMatchSnapshot();
  });

  it("renders all slides", () => {
    render(<Default {...Default.args} />);
    const images = screen.getAllByAltText("image");
    expect(images).toHaveLength(10);
  });

  it("calls click handler on link", async () => {
    const mockClick = jest.fn();

    render(
      <Default {...Default.args}>
        <TextLink onClick={mockClick}>Link</TextLink>
      </Default>,
    );

    const link = screen.getAllByTestId("text-link")[0];
    await userEvent.click(link);
    expect(mockClick).toHaveBeenCalled();
  });

  it("does not render carousel controls if slides < slidesToShow", () => {
    render(<ThreeSlides {...ThreeSlides.args} />);

    const controllerWrapper = screen.getAllByTestId("visible")[0];
    expect(controllerWrapper).toHaveClass("visible-below-laptop");
  });
});
