import { render, fireEvent } from "_test-utils";
import React from "react";

import { FeatureCard } from "./FeatureCard";

describe("FeatureCard component", () => {
  it("renders a text card correctly", () => {
    const { toJSON } = render(
      <FeatureCard
        title="test title"
        type="text"
        description="test description"
        onPress={() => {}}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders a visual card correctly", () => {
    const { toJSON } = render(
      <FeatureCard
        title="test title"
        description="test description"
        image={{
          src: "https://assets.odido.nl/305x450/8ca7287522/dvi-front-back_apple_iphone_15_kleur3_305x450_v1.png",
          alt: "alt",
        }}
        onPress={() => {}}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders a background visual card correctly", () => {
    const { toJSON } = render(
      <FeatureCard
        title="test title"
        description="test description"
        type="backgroundImage"
        image={{
          src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
          alt: "alt",
        }}
        onPress={() => {}}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test("Renders title and description", () => {
    const title = "Test Title";
    const description = "Test description";
    const { queryByText } = render(
      <FeatureCard
        title={title}
        description={description}
        onPress={() => {}}
      />,
    );
    expect(queryByText(title)).toBeDefined();
    expect(queryByText(description)).toBeDefined();
  });

  test("Press event handler is called when the FeatureCard is pressed", () => {
    const mockOnPress = jest.fn();
    const { queryByTestId } = render(
      <FeatureCard title="Test" type="text" onPress={mockOnPress} />,
    );
    const featureCardOverlay = queryByTestId("feature-card");
    // @ts-ignore
    fireEvent(featureCardOverlay, "click");
    expect(mockOnPress).toHaveBeenCalled();
  });

  test("Renders Image component when variant is 'visual'", () => {
    const { queryByTestId } = render(
      <FeatureCard
        onPress={() => {}}
        title="Test title"
        image={{
          src: "https://assets.odido.nl/305x450/8ca7287522/dvi-front-back_apple_iphone_15_kleur3_305x450_v1.png",
          alt: "alt",
        }}
        type="visual"
      />,
    );

    expect(queryByTestId("visual")).toBeDefined();
  });
});
