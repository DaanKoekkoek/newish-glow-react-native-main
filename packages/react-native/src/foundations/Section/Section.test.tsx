import { composeStory } from "@storybook/react";
import { render, within } from "_test-utils";
import React from "react";
import type { ViewStyle } from "react-native";

import meta, { Default, Emphasised, Image, Subtle } from "./Section.stories";

const SectionBasic = composeStory(Default, meta);
const SectionEmphasised = composeStory(Emphasised, meta);
const SectionImage = composeStory(Image, meta);
const SectionSubtle = composeStory(Subtle, meta);

describe("<Section />", () => {
  it("renders with default props", async () => {
    const { findByTestId } = render(<SectionBasic {...Default.args} />);

    const section = await findByTestId(`section`);
    expect(section).toBeTruthy();
  });

  it("removes bottom padding when paddingBottom is set to `none`", async () => {
    const { findByTestId } = render(
      <SectionBasic {...Default.args} paddingBottom="none" />,
    );

    const section = await findByTestId(`section`);
    const styles = Array.isArray(section.props.style)
      ? section.props.style
      : [section.props.style];

    const hasNoPadding = styles.some(
      (style: ViewStyle) => style?.paddingBottom === 0,
    );
    expect(hasNoPadding).toBe(true);
  });

  it("removes top padding when paddingTop is set to `none`", async () => {
    const { findByTestId } = render(
      <SectionBasic {...Default.args} paddingTop="none" />,
    );

    const section = await findByTestId(`section`);
    const styles = Array.isArray(section.props.style)
      ? section.props.style
      : [section.props.style];

    const hasNoPadding = styles.some(
      (style: ViewStyle) => style?.paddingTop === 0,
    );
    expect(hasNoPadding).toBe(true);
  });

  it("renders Image component when image prop is provided and variant is set to `image`", async () => {
    const { findByTestId } = render(<SectionImage {...Image.args} />);

    const section = await findByTestId(`section`);
    const image = await within(section).findByTestId("image");

    expect(image).toBeTruthy();
  });

  it('renders GlowGradient when variant is "emphasised"', async () => {
    const { findByTestId } = render(<SectionEmphasised {...Emphasised.args} />);

    const section = await findByTestId(`section`);
    const glowGradient = within(section).findByTestId("glow-gradient");
    expect(glowGradient).toBeTruthy();
  });

  it('applies palette when variant is "subtle" and palette is provided', async () => {
    const { findByTestId } = render(<SectionSubtle {...Subtle.args} />);

    const section = await findByTestId(`section`);
    const styles = Array.isArray(section.props.style)
      ? section.props.style
      : [section.props.style];

    const hasBackgroundColor = styles.some(
      (style: ViewStyle) => style?.backgroundColor != null,
    );
    expect(hasBackgroundColor).toBe(true);
  });
});
