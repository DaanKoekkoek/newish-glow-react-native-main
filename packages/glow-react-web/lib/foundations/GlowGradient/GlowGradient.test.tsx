import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import meta, { Basic } from "./GlowGradient.stories";
import { ThemeProvider } from "components/ThemeProvider";

const GlowGradientBasic = composeStory(Basic, meta);

describe("<GlowGradient />", () => {
  it("a stable snapshot", () => {
    const { container } = render(
      <GlowGradientBasic {...Basic.args} className="custom-glow-class" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("snapshot with mask true", () => {
    const { container } = render(
      <GlowGradientBasic {...Basic.args} className="custom-glow-class" mask />,
    );
    expect(container).toMatchSnapshot();
  });

  it("snapshot with another brand", () => {
    const { container } = render(
      <ThemeProvider brand={"simpel"}>
        <GlowGradientBasic {...Basic.args} className="custom-glow-class" />,
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
