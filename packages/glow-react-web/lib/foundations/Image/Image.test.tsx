import { render, screen } from "@testing-library/react";
import { Image } from "./Image";
import { ImageSource } from "./Image.types";

test("renders <source> elements with correct srcSet and media attributes", () => {
  const srcSet = [
    { src: "https://example.com/image-640w.jpg 640w", breakpoint: "mobile" },
    { src: "https://example.com/image-1200w.jpg 1200w", breakpoint: "tablet" },
  ] as ImageSource[];

  render(
    <Image renderType="foreground" sources={srcSet} alt="Responsive Image" />,
  );

  const sources = screen.getAllByTestId("image-source");

  expect(sources).toHaveLength(srcSet.length);

  expect(sources[0]).toHaveAttribute("media", "(max-width: 360px)");
  expect(sources[1]).not.toHaveAttribute("media");

  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img).toHaveAttribute("alt", "Responsive Image");
});

test("renders background image with background properties", () => {
  render(
    <Image
      renderType="background"
      resizeMode="cover"
      loading={{ type: "eager" }}
      src="https://example.com/background-image.jpg"
      alt="Background Image"
    />,
  );

  const div = screen.getByRole("img");
  expect(div).toHaveStyle(
    "background-image: url(https://example.com/background-image.jpg)",
  );
  expect(div).toHaveStyle("background-size: cover");
});

test("applies a ratio class", () => {
  render(
    <Image
      ratio="4/3"
      src="https://example.com/image.jpg"
      alt="Image with custom ratio"
      loading={{ type: "eager" }}
    />,
  );
  const imgContainer = screen.getByTestId("image");
  expect(imgContainer).toHaveClass("ratio-4-3");
});

test("applies the correct resizeMode for foreground image", () => {
  render(
    <Image
      renderType="foreground"
      src="https://example.com/image.jpg"
      resizeMode="contain"
      alt="Image with contain resize mode"
    />,
  );

  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img).toHaveStyle("object-fit: contain");
});

test("applies the correct resizeMode for background image", () => {
  render(
    <Image
      renderType="background"
      src="https://example.com/image.jpg"
      resizeMode="cover"
      loading={{ type: "eager" }}
      alt="Image with cover resize mode"
    />,
  );

  const div = screen.getByRole("img");

  expect(div).toHaveStyle("background-size: cover");
});

test("renders image with children elements", () => {
  render(
    <Image
      renderType="foreground"
      src="https://example.com/image.jpg"
      alt="Image with children"
    >
      <span>Some children</span>
    </Image>,
  );

  const childElement = screen.getByText("Some children");
  expect(childElement).toBeInTheDocument();
});
