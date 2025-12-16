import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import meta, { Default } from "./ProductHero.stories";

const ProductHeroStory = composeStory(Default, meta);

describe("<ProductHero />", () => {
  it("renders a stable snapshot", () => {
    const { container } = render(
      <ProductHeroStory {...ProductHeroStory.args} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the image with correct src and alt attributes", () => {
    render(<ProductHeroStory {...ProductHeroStory.args} />);
    const image = screen.getByTestId("image-img");
    expect(image).toHaveAttribute(
      "src",
      "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
    );
    expect(image).toHaveAttribute("alt", "Alt text");
  });

  it("renders the status component when provided", () => {
    render(<ProductHeroStory {...ProductHeroStory.args} />);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  it("renders the large sticker component when provided", () => {
    render(<ProductHeroStory {...ProductHeroStory.args} />);
    expect(screen.getByText("List item 1")).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(<ProductHeroStory {...ProductHeroStory.args} variant="promo" />);
    const productHero = screen.getByTestId("product-hero-large-sticker");
    expect(productHero).toHaveClass("variant-promo");
  });
});
