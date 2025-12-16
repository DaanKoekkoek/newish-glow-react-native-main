import { composeStory } from "@storybook/react";
import { render, fireEvent, waitFor } from "_test-utils";
import React from "react";

import meta, { Basic } from "./Tooltip.stories";

const Tooltip = composeStory(Basic, meta);

describe("<Tooltip />", () => {
  it("Tooltip renders correctly", () => {
    const { toJSON } = render(<Tooltip {...Tooltip.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the description text", async () => {
    const { getByText } = render(
      <Tooltip description="Description" testID="Tooltip1" closeIcon />,
    );

    getByText("Description");
  });

  it("renders not the close icon", async () => {
    const { queryAllByTestId } = render(
      <Tooltip description="Description" testID="Tooltip1" />,
    );

    expect(queryAllByTestId("Tooltip1")[2]).toBeUndefined();
  });

  it("renders the close icon", async () => {
    const { queryAllByTestId } = render(
      <Tooltip description="Description" testID="Tooltip1" closeIcon />,
    );

    expect(queryAllByTestId("Tooltip1")[2]).toBeDefined();
  });

  it("closes the tooltip when the close button is pressed", async () => {
    const { getAllByTestId, getAllByRole } = render(
      <Tooltip
        description="Description"
        testID="Tooltip1"
        animated
        closeIcon
      />,
    );

    expect(getAllByTestId("Tooltip1")[0]).toHaveAnimatedStyle({
      opacity: 0,
    });

    fireEvent.press(getAllByRole("button")[0]);

    await waitFor(() => {
      expect(getAllByTestId("Tooltip1")[0]).toHaveAnimatedStyle({
        opacity: 1,
      });
    });

    fireEvent.press(getAllByRole("button")[0]);

    await waitFor(() => {
      expect(getAllByTestId("Tooltip1")[0]).toHaveAnimatedStyle({
        opacity: 0,
      });
    });
  });
});
