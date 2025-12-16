import { render, screen } from "@testing-library/react";
import { DefaultSticker } from "./DefaultSticker";

describe("<DefaultSticker />", () => {
  it("renders with text prop", () => {
    render(<DefaultSticker text="Hello World" testID="default-sticker" />);
    const stickerElement = screen.getByTestId("default-sticker");
    expect(stickerElement).toBeInTheDocument();
    expect(stickerElement).toHaveTextContent("Hello World");
  });

  it("renders with image prop", () => {
    render(
      <DefaultSticker
        type="image"
        image={
          <img
            src="https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP"
            alt="alt text"
          />
        }
        testID="default-sticker"
      />,
    );
    const imageElement = screen.getByRole("img", { name: "alt text" });
    expect(imageElement).toBeInTheDocument();
  });

  it("throws error when neither text nor image prop is provided", () => {
    expect(() => render(<DefaultSticker testID="default-sticker" />)).toThrow(
      "DefaultSticker must have either text or image prop.",
    );
  });

  it("applies class names based on props", () => {
    render(
      <DefaultSticker
        text="Styled Sticker"
        type="default"
        variant="emphasised"
        palette="orange"
        testID="default-sticker"
      />,
    );
    const stickerElement = screen.getByTestId("default-sticker");
    expect(stickerElement).toHaveClass("default-sticker-variant-emphasised");
    expect(stickerElement).toHaveClass("default-sticker-palette-orange");
  });

  it("renders GlowGradient when variant is 'emphasised'", () => {
    render(
      <DefaultSticker
        text="Glow Sticker"
        variant="emphasised"
        testID="default-sticker"
      />,
    );
    const glowGradientElement = screen.getByTestId("glow-gradient");
    expect(glowGradientElement).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <DefaultSticker text="Snapshot Sticker" testID="default-sticker" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with variant emphasised", () => {
    const { asFragment } = render(
      <DefaultSticker
        text="Snapshot Sticker"
        testID="default-sticker"
        variant="emphasised"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with image prop", () => {
    const { asFragment } = render(
      <DefaultSticker
        type="image"
        image={
          <img
            src="https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP"
            alt="alt text"
          />
        }
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot with image prop and variant emphasised", () => {
    const { asFragment } = render(
      <DefaultSticker
        type="image"
        image={<img src="image.png" alt="alt text" />}
        variant="emphasised"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
