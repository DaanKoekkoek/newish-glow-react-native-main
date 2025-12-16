import { composeStory } from "@storybook/react";
import { render, screen } from "@testing-library/react";

import meta, { Basic, ColumnsWithSizes, WidthOnColumn } from "./Grid.stories";

const GridWithProps = composeStory(Basic, meta);

describe("<Grid />", () => {
  it("renders correctly", () => {
    const view = render(<GridWithProps {...Basic.args} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("renders default column when no columnSize passed (grid-column-12)", () => {
    render(<GridWithProps {...Basic.args} />);
    const columns = screen.getAllByTestId("column");

    columns.forEach((item) => {
      expect(item).toHaveClass("grid-column-12");
    });
  });

  it("renders columns with sizes", () => {
    render(<GridWithProps {...ColumnsWithSizes.args} />);
    const columns = screen.getAllByTestId("column");

    columns.forEach((item) => {
      expect(item).toHaveClass("grid-column-6");
    });
  });

  it("renders columns with classnames according to expected column prop sizes", () => {
    render(<GridWithProps {...WidthOnColumn.args} />);
    const columns = screen.getAllByTestId("column");

    const columnPropSizes = [
      { mobileSmall: 6, desktop: 2 },
      { mobileSmall: 6, desktop: 4 },
      { mobileSmall: 12, desktop: 6 },
    ];

    expect(columns.length).toBe(columnPropSizes.length);

    columns.forEach((item, index) => {
      const columnSize = columnPropSizes[index];
      const columnSizeClasses = Object.entries(columnSize).map(
        ([key, value]) =>
          key == "mobileSmall"
            ? `grid-column-${value}`
            : `grid-column-${value}-${key}`,
      );

      columnSizeClasses.forEach((sizeClass) => {
        expect(item).toHaveClass(sizeClass);
      });
    });
  });
});
