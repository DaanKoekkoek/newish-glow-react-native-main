import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, {
  Basic,
  BlackFriday,
  ContentOptions,
} from "./PromotionalCard.stories";

// Compose stories for testing
const BasicStory = composeStory(Basic, meta);
const BlackFridayStory = composeStory(BlackFriday, meta);
const ContentOptionsStory = composeStory(ContentOptions, meta);

describe("<PromotionalCard />", () => {
  describe("Snapshot Tests", () => {
    it("renders basic variant correctly", () => {
      const { asFragment } = render(<BasicStory {...BasicStory.args} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("renders Black Friday variant correctly", () => {
      const { asFragment } = render(
        <BlackFridayStory {...BlackFridayStory.args} countdown={undefined} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("renders content options variant correctly", async () => {
      const { asFragment } = render(
        <ContentOptionsStory {...ContentOptionsStory.args} />,
      );
      await screen.findByTestId("image");
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
