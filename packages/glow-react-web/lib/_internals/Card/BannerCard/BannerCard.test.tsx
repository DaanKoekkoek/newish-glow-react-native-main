import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";
import meta, { Default } from "./BannerCard.stories";
import { axe } from "jest-axe";

const BannerCardStory = composeStory(Default, meta);

describe("<BannerCard />", () => {
  it("should not have any accessibility violations", async () => {
    const { container } = render(<BannerCardStory {...BannerCardStory.args} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("renders a stable snapshot", () => {
    const { container } = render(<BannerCardStory {...BannerCardStory.args} />);
    expect(container).toMatchSnapshot();
  });
});
