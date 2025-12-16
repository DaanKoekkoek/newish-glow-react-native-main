import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { Addon } from "foundations/Addon/Addon";

import { AddonList } from "./AddonList";
import meta, { WithImage } from "./AddonList.stories";

const WithImageStory = composeStory(WithImage, meta);

describe("<AddonList />", () => {
  it("add on list items and buttons are displayed", () => {
    render(
      <AddonList
        onListItemClick={() => {}}
        items={[
          {
            title: "Item 1",
            variant: "added",
            attention: { text: "Free for 3 months", variant: "success" },
            description:
              "Enjoy The Lord of the Rings trilogy and more. Testing testing very long title to see what happens. Testing testing very long title to see what happens. Testing testing very long title to see what happens.",
            actionLabel: "Button",
            addOn: <Addon name="HBO Max" size="sm" />,
          },
          {
            title: "Item 2",
            variant: "added",
            attention: { text: "Free for 3 months", variant: "success" },
            actionLabel: "Button",
            addOn: <Addon name="Netflix" size="sm" />,
          },
        ]}
      />,
    );

    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
  });

  it("all 5 items are present", () => {
    render(<WithImageStory {...WithImageStory.args} />);

    for (let i = 1; i <= 5; i++) {
      const title = screen.getByText(`Item ${i}`);
      expect(title).toBeTruthy();
    }
  });
});
