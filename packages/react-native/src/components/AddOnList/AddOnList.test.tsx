import { composeStory } from "@storybook/react";
import { render, screen } from "_test-utils";
import { Addon } from "foundations/Addon/Addon";
import type { GestureResponderEvent } from "react-native";

import { AddOnList } from "./AddOnList";
import meta, { WithImage } from "../AddOnList/AddOnList.stories";

const WithImageStory = composeStory(WithImage, meta);

describe("<AddOnList />", () => {
  it("add on list items and buttons are displayed", () => {
    const { getByText, getAllByRole } = render(
      <AddOnList>
        <AddOnList.Item
          title="Item 1"
          isFirstChild
          variant="default"
          isLastChild={false}
          actionLabel="Button"
          addOn={<Addon name="Amazon Prime" size="sm" />}
          onPress={(e: number | GestureResponderEvent) => {
            if (typeof e === "number") {
              console.log("Handling number:", e);
            }
          }}
        />
        <AddOnList.Item
          title="Item 2"
          variant="default"
          isFirstChild={false}
          isLastChild
          actionLabel="Button"
          addOn={<Addon name="Amazon Prime" size="sm" />}
          onPress={(e: number | GestureResponderEvent) => {
            if (typeof e === "number") {
              console.log("Handling number:", e);
            }
          }}
        />
      </AddOnList>,
    );

    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
    expect(getAllByRole("button").length).toEqual(2);
  });

  it("a title is present", () => {
    render(<WithImageStory {...WithImageStory.args} />);

    const titleElement = screen.getByTestId("heading");

    expect(titleElement).toBeTruthy();
  });
});
