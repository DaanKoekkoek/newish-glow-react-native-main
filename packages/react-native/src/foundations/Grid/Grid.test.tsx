import { composeStory } from "@storybook/react";
import { render } from "_test-utils";
import React from "react";

import meta, { Basic, WidthOnColumn } from "./Grid.stories";

const GridWithProps = composeStory(Basic, meta);
const ColumnWithProps = composeStory(WidthOnColumn, meta);

describe("<Grid />", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<GridWithProps {...Basic.args} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("sets attributes correctly in grid.column", () => {
    const { getAllByTestId } = render(
      <ColumnWithProps {...WidthOnColumn.args} />,
    );
    const column = getAllByTestId("column");
    expect(column[0].props.mobileSmall).toBe(6);
    expect(column[1].props.desktop).toBe(4);
  });
});
