import { render, within } from "_test-utils";
import { Price } from "components/Price";
import IMAGES from "foundations/Image/Image.mock";
import React from "react";
import type { ViewStyle } from "react-native";

import { Background } from "./Background";

describe("<Background />", () => {
  it("renders with default props", async () => {
    const { findByTestId } = render(
      <Background>
        <Price value="100" />
      </Background>,
    );

    const background = await findByTestId(`background`);
    expect(background).toBeTruthy();
  });

  it("renders Image component when image prop is provided and variant is set to `image`", async () => {
    const { findByTestId } = render(
      <Background
        variant="image"
        image={{
          src: "https://assets.odido.nl/2560x800/b6c27355a4/background-lightglow1.webp",
          alt: "Alt",
          localSrc: IMAGES["tophero-app-only-deal"],
        }}
      >
        <Price value="100" />
      </Background>,
    );

    const background = await findByTestId(`background`);
    const image = await within(background).findByTestId("image");

    expect(image).toBeTruthy();
  });

  it('renders GlowGradient when variant is "emphasised"', async () => {
    const { findByTestId } = render(
      <Background variant="emphasised">
        <Price value="100" />
      </Background>,
    );

    const background = await findByTestId(`background`);
    const glowGradient = within(background).findByTestId("glow-gradient");
    expect(glowGradient).toBeTruthy();
  });

  it("applies background styles", async () => {
    const { findByTestId } = render(
      <Background backgroundStyle={{ backgroundColor: "blue" }}>
        <Price value="100" />
      </Background>,
    );

    const background = await findByTestId(`background`);
    const styles = Array.isArray(background.props.style)
      ? background.props.style
      : [background.props.style];

    const hasBackgroundColor = styles.some(
      (style: ViewStyle) => style?.backgroundColor != null,
    );
    expect(hasBackgroundColor).toBe(true);
  });
});
