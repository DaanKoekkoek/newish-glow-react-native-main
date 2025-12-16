import { composeStory } from "@storybook/react";
import { render } from "@testing-library/react";

import meta, { Basic, Outline, Color } from "./HorizontalCard.stories";

const DefaultStory = composeStory(Basic, meta);
const OutlineStory = composeStory(Outline, meta);
const ColorStory = composeStory(Color, meta);

describe("<HorizontalCard />", () => {
  describe("Snapshot Tests", () => {
    it("renders default variant correctly", () => {
      const { container } = render(<DefaultStory />);
      expect(container).toMatchSnapshot();
    });

    it("renders outline variant with palette", () => {
      const { container } = render(<OutlineStory />);
      expect(container).toMatchSnapshot();
    });

    it("renders color variant with palette", () => {
      const { container } = render(<ColorStory />);
      expect(container).toMatchSnapshot();
    });

    it("renders with icon position right", () => {
      const { container } = render(<DefaultStory iconPosition="right" />);
      expect(container).toMatchSnapshot();
    });

    it("renders without optional props", () => {
      const { container } = render(
        <DefaultStory title={undefined} textLink={undefined} />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
