import { composeStory } from "@storybook/react";

import meta, { Default, Image, Emphasised, Subtle } from "./Section.stories";
import { render, screen, within } from "@testing-library/react";

const SectionBasic = composeStory(Default, meta);
const SectionEmphasised = composeStory(Emphasised, meta);
const SectionImage = composeStory(Image, meta);
const SectionSubtle = composeStory(Subtle, meta);

describe("<Section />", () => {
  it("renders with default props", () => {
    render(<SectionBasic {...Default.args} />);

    const section = screen.getByTestId("section");
    expect(section).toBeTruthy();
  });

  it("renders children as expected", () => {
    render(
      <SectionBasic
        {...Default.args}
        children={<div data-testid="mock-div!">hola</div>}
      />,
    );

    const section = screen.getByTestId("section");
    const children = within(section).queryByTestId("mock-div!");
    expect(children).toBeTruthy();
  });

  it("removes top padding when paddingTop is set to `none`", async () => {
    render(<SectionBasic {...Default.args} paddingTop="none" />);

    const section = screen.getByTestId("section");

    expect(section.classList.contains("section-padding-top-none")).toBe(true);
  });

  it("renders Image component when image prop is provided and variant is set to `image`", async () => {
    const mockImage = "https://assets.odido.nl/mocks/image.jpg";
    render(
      <SectionImage
        {...Image.args}
        image={{
          src: mockImage,
          alt: "mock",
        }}
      />,
    );

    const section = screen.getByTestId("section");

    expect(section.style["backgroundImage"]).toBe(`url(${mockImage})`);
  });

  it('renders GlowGradient when variant is "emphasised"', async () => {
    render(<SectionEmphasised {...Emphasised.args} />);

    const section = screen.getByTestId("section");
    const glowGradient = within(section).getByTestId("glow-gradient");
    expect(glowGradient).toBeTruthy();
  });

  it('doesn\'t render GlowGradient when variant is NOT "emphasised"', async () => {
    render(<SectionBasic {...Default.args} />);

    const section = screen.getByTestId("section");
    const glowGradient = within(section).queryByTestId("glow-gradient");
    expect(glowGradient).toBeNull();
  });

  it('applies palette when variant is "subtle" and palette is provided', async () => {
    render(<SectionSubtle {...Subtle.args} palette="purple" />);

    const section = screen.getByTestId("section");
    expect(section.classList.contains("section-palette-purple")).toBe(true);
  });
});
