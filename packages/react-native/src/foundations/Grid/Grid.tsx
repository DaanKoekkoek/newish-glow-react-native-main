import {
  useAllowedChildren,
  usePropAcrossBreakpoints,
  useWindowDimensions,
} from "_global-hooks";
import type { BreakpointKeys } from "_theming/breakpoints";
import React, { createContext, useContext } from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { useStyles, UnistylesRuntime } from "react-native-unistyles";

import { gridStyles } from "./Grid.styles";
import type {
  ColumnProps,
  FluidPerBreakpoint,
  GridContextProps,
  GridDirectionPerBreakpoint,
  GridProps,
} from "./Grid.types";

/* NOTE: `propagateBreakpoints` is used as a function to pass a column size (1-12) from the lowest breakpoint up to the largest breakpoint.
 * This allows you to reduce the amount of props required, for example:
 * You only have to write this: <Grid mobileSmall={6} desktop={12} />
 * Instead of this: <Grid mobileSmall={6} mobile={6} tablet={6} laptop={6} desktop={12} />
 */
const propagateBreakpoints = (props: GridProps | ColumnProps) => {
  const {
    mobileSmall = 12,
    mobile = mobileSmall,
    tablet = mobile,
    laptop = tablet,
    desktop = laptop,
  } = props;

  return {
    mobileSmall,
    mobile,
    tablet,
    laptop,
    desktop,
  };
};

const GridContext = createContext<GridContextProps | null>(null);

export const useGridContext = () => {
  const currentGridContext = useContext(GridContext);
  if (!currentGridContext) {
    throw new Error(
      "<Grid.Column> components must be rendered within a <Grid>",
    );
  }
  return currentGridContext;
};

const Grid = ({
  variant = "default",
  direction = "row",
  fluid = false,
  children,
  rowStyle,
  containerStyle,
  ...props
}: GridProps) => {
  const columnDirectionPerBreakpoint: GridDirectionPerBreakpoint =
    usePropAcrossBreakpoints(direction);

  const fluidPerBreakpoint: FluidPerBreakpoint =
    usePropAcrossBreakpoints(fluid);

  const { width } = useWindowDimensions();

  const breakpoint = UnistylesRuntime.breakpoint as BreakpointKeys;
  const gridColumns = propagateBreakpoints(props);
  const gridChildren = useAllowedChildren(children, [Grid.Column]);

  const { styles } = useStyles(gridStyles);

  return (
    <GridContext.Provider value={{ gridColumns, breakpoint }}>
      <View
        testID="container"
        style={[
          styles.container,
          styles.containerPadding(breakpoint) as ViewStyle,
          containerStyle,
        ]}
      >
        <View
          testID="grid"
          style={[
            styles.grid,
            styles.gridFluid(fluidPerBreakpoint, breakpoint),
            styles.gridMaxWidth(variant, breakpoint, width, fluidPerBreakpoint),
            styles.gridColumnDirection(
              columnDirectionPerBreakpoint,
              breakpoint,
            ),
            rowStyle,
          ]}
        >
          {gridChildren.map((child) => (
            <Column key={child.key} {...child.props}>
              {child.props.children}
            </Column>
          ))}
        </View>
      </View>
    </GridContext.Provider>
  );
};

const Column = (props: ColumnProps) => {
  const { children } = props;
  const { gridColumns, breakpoint } = useGridContext();
  const { styles } = useStyles(gridStyles);

  const columns = {
    mobileSmall: props.mobileSmall || gridColumns?.mobileSmall || 12,
    mobile: props.mobile || props.mobileSmall || gridColumns?.mobile || 12,
    tablet:
      props.tablet ||
      props.mobile ||
      props.mobileSmall ||
      gridColumns?.tablet ||
      12,
    laptop:
      props.laptop ||
      props.tablet ||
      props.mobile ||
      props.mobileSmall ||
      gridColumns?.laptop ||
      12,
    desktop:
      props.desktop ||
      props.laptop ||
      props.tablet ||
      props.mobile ||
      props.mobileSmall ||
      gridColumns?.desktop ||
      12,
  };

  return (
    <View
      {...props}
      testID="column"
      style={[
        styles.column,
        styles.columnGap(breakpoint),
        styles.columnMaxWidth(columns, breakpoint),
        props.style,
      ]}
    >
      {children}
    </View>
  );
};

Column.displayName = "Grid.Column";

Grid.Column = Column;

export { Grid };
