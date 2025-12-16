import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, {
  Basic,
  DirectionVertical,
  DirectionHorizontal,
  AlignCenter,
  AlignEnd,
  JustifyCenter,
} from "./Stack.stories";

const StackDefault = composeStory(Basic, meta);
const StackDirectionVertical = composeStory(DirectionVertical, meta);
const StackDirectionHorizontal = composeStory(DirectionHorizontal, meta);
const StackAlignCenter = composeStory(AlignCenter, meta);
const StackAlignEnd = composeStory(AlignEnd, meta);
const StackJustifyCenter = composeStory(JustifyCenter, meta);

const filteredStyle = (style: any) =>
  (Array.isArray(style) ? style : [style]).filter(
    (styleObj) => typeof styleObj === "object" && styleObj !== null,
  );

describe("<Stack />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<StackDefault {...StackDefault.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("direction vertical works", () => {
    const { getByTestId } = render(
      <StackDirectionVertical {...StackDirectionVertical.args} />,
    );

    const stackStyle = getByTestId("stack").props.style;
    let hasColumnDirection = false;
    filteredStyle(stackStyle).forEach((styleObj: { flexDirection: string }) => {
      if (styleObj.flexDirection === "column") {
        hasColumnDirection = true;
      }
    });

    expect(hasColumnDirection).toBe(true);
  });

  it("direction horizontal works", () => {
    const { getByTestId } = render(
      <StackDirectionHorizontal {...StackDirectionHorizontal.args} />,
    );

    const stackStyle = getByTestId("stack").props.style;
    let hasGridDirection = false;
    filteredStyle(stackStyle).forEach((styleObj: { flexDirection: string }) => {
      if (styleObj.flexDirection === "row") {
        hasGridDirection = true;
      }
    });

    expect(hasGridDirection).toBe(true);
  });

  it("can align items: center", () => {
    const { getByTestId } = render(
      <StackAlignCenter {...StackAlignCenter.args} />,
    );

    const stackStyle = getByTestId("stack").props.style;
    let alignItemsValue = "";
    filteredStyle(stackStyle).forEach((styleObj: { alignItems: string }) => {
      if (styleObj.alignItems) {
        alignItemsValue = styleObj.alignItems;
      }
    });

    expect(alignItemsValue).toBe("center");
  });

  it("can align items: flex-end", () => {
    const { getByTestId } = render(<StackAlignEnd {...StackAlignEnd.args} />);
    const stackStyle = getByTestId("stack").props.style;

    let alignItemsValue = "";
    filteredStyle(stackStyle).forEach((styleObj: { alignItems: string }) => {
      if (styleObj.alignItems) {
        alignItemsValue = styleObj.alignItems;
      }
    });

    expect(alignItemsValue).toBe("flex-end");
  });

  it("can justify content: center", () => {
    const { getByTestId } = render(
      <StackJustifyCenter {...StackJustifyCenter.args} />,
    );

    const stackStyle = getByTestId("stack").props.style;
    let justifyContentValue = "";
    filteredStyle(stackStyle).forEach(
      (styleObj: { justifyContent: string }) => {
        if (styleObj.justifyContent) {
          justifyContentValue = styleObj.justifyContent;
        }
      },
    );

    expect(justifyContentValue).toBe("center");
  });
});
