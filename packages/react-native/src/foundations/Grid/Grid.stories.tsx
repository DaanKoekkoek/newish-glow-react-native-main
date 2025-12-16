import type { Meta, StoryObj } from "@storybook/react";
import { Box, Callout } from "components/index";
import React from "react";
import { useStyles } from "react-native-unistyles";

import {
  type GridProps,
  Section,
  Grid,
  Heading,
  Main,
  Paragraph,
  Stack,
} from "../index";
import { MockCard } from "./Grid.Mocks";

const gridDivision = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Columns = (amount: number, currentGrid: number, prefix?: string) => {
  return Array.from({ length: amount }, (_, index) => (
    <Grid.Column key={index}>
      <Box size="sm" prominence="color">
        <Paragraph alignment="center">
          {prefix} {currentGrid > 0 ? currentGrid : index + 1}
        </Paragraph>
      </Box>
    </Grid.Column>
  ));
};

const meta: Meta<GridProps> = {
  title: "DesignSystem/Foundations/Layout/Grid",
  component: Grid,
  argTypes: {
    rowStyle: {
      control: false,
      table: {
        disable: true,
      },
    },
    fluid: {
      description:
        "Removes the max-width and margin from the `Grid`. Can be applied per breakpoint.",
      type: "boolean",
    },
    children: {
      description: "Accepts `Grid.Column` as children",
      control: false,
      table: {
        disable: true,
      },
    },
    variant: {
      description: "Applies a `max-width` properties depending on the variant.",
      options: ["default", "narrow", "box"],
      control: {
        type: "select",
      },
    },
    direction: {
      description:
        "The direction order for the `Grid.Column` items. Can be applied per breakpoint.",
      options: ["row", "row-reverse"],
      control: {
        type: "select",
      },
    },
    desktop: {
      name: "Column size desktop",
      control: "select",
      options: gridDivision,
      description: "Breakpoint desktop: >= 1440",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    laptop: {
      name: "Column size laptop",
      control: "select",
      options: gridDivision,
      description: "Breakpoint laptop: >= 960",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    tablet: {
      name: "Column size tablet",
      control: "select",
      options: gridDivision,
      description: "Breakpoint tablet: >= 530",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    mobile: {
      name: "Column size mobile",
      control: "select",
      options: gridDivision,
      description: "Breakpoint mobile: >= 360",
      table: {
        defaultValue: { summary: 12 },
      },
    },
    mobileSmall: {
      name: "Column size mobileSmall",
      control: "select",
      options: gridDivision,
      description: "Breakpoint mobileSmall: > 0px",
      table: {
        defaultValue: { summary: 12 },
      },
    },
  },
  args: {
    children: [...Columns(2, 0, "Column")],
  },
  render: ({ ...args }) => (
    <Main>
      <Section>
        <Grid {...args} />
      </Section>
    </Main>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    mobileSmall: 6,
    desktop: 6,
  },
};

export const WidthOnColumn: Story = {
  args: {
    children: [
      <Grid.Column mobileSmall={6} desktop={2} key="1">
        <Box prominence="color" size="sm">
          <Paragraph alignment="center">Column 1</Paragraph>
        </Box>
      </Grid.Column>,
      <Grid.Column mobileSmall={6} desktop={4} key="2">
        <Box prominence="color" size="sm">
          <Paragraph alignment="center">Column 2</Paragraph>
        </Box>
      </Grid.Column>,
      <Grid.Column mobileSmall={12} desktop={6} key="3">
        <Box prominence="color" size="sm">
          <Paragraph alignment="center">Column 3</Paragraph>
        </Box>
      </Grid.Column>,
    ],
  },
};

export const BreakpointAndLayout: Story = {
  render: function Render() {
    return (
      <Main>
        <Section>
          <Grid>{Columns(1, 1)}</Grid>
          <Grid mobileSmall={6}>{Columns(2, 2)}</Grid>
          <Grid mobileSmall={4}>{Columns(3, 3)}</Grid>
          <Grid mobileSmall={3}>{Columns(4, 4)}</Grid>
          <Grid mobileSmall={2}>{Columns(6, 5)}</Grid>
          <Grid mobileSmall={1}>{Columns(12, 6)}</Grid>
        </Section>
      </Main>
    );
  },
};

export const DosAndDonts: Story = {
  name: "Do's and Don'ts",
  render: function Render({ ...args }) {
    const { breakpoint } = useStyles();
    const cardDirectionIsHorizontal = [
      "mobile",
      "smallMobile",
      "tablet",
      "laptop",
    ].includes(breakpoint);

    return (
      <Main>
        <Section>
          <Grid>
            <Grid.Column>
              <Heading size="lg" as="h1">
                DON'TS
              </Heading>
            </Grid.Column>
            <Grid.Column>
              <Paragraph>
                Test by resizing and inspecting the browser window to see the
                behavior.
              </Paragraph>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Callout
                title="DON'T: wrapping"
                status="error"
                description="The grid is not intended to be able to wrap the grid content to the next row. In that situation where a breakpoint is hit and the content won't fit inside the grid anymore, it should change the flex direction (row or column). The direction change can be done by using the `direction` prop on the `<Grid />` component or by using a <Stack /> component inside a `<Grid.Column />`. See below a bad example of the grid wrapping."
              />
            </Grid.Column>
          </Grid>
          <Grid tablet={8}>
            <Grid.Column>
              <Stack direction="row" wrap="wrap">
                <MockCard />
                <MockCard />
                <MockCard />
                <MockCard />
              </Stack>
            </Grid.Column>
          </Grid>
        </Section>
        <Section paddingTop="none">
          <Grid>
            <Grid.Column>
              <Callout
                title="DON'T: overrun or fall short on grid width"
                status="error"
                description="The grid can often be used with child components which do have a maximum and minimum width. A good example of such component is a card component. The card components should always fill the full width of the grid. They never should be overrunning the maximum width of the grid or falling short on filling the grid. If this is the case, then it's showing that you are using the grid in an unintended way. See below a bad example of the grid content not filling the grid."
              />
            </Grid.Column>
          </Grid>
          <Grid tablet={12}>
            <Grid.Column>
              <Stack direction="row">
                <MockCard />
                <MockCard />
              </Stack>
            </Grid.Column>
          </Grid>
        </Section>
        <Section paddingTop="none">
          <Grid>
            <Grid.Column>
              <Heading size="lg" as="h1">
                DO's
              </Heading>
            </Grid.Column>
            <Grid.Column>
              <Paragraph>
                Test by resizing and inspecting the browser window to see the
                behavior.
              </Paragraph>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Callout
                title="DO: change direction"
                status="success"
                description="The grid is not intended to be able to wrap the grid content to the next row. In that situation where a break point is hit and the content won't fit inside the grid anymore, then is should change the flex direction (row or column). See below a good example of the grid changing direction."
              />
            </Grid.Column>
          </Grid>
          <Grid tablet={8} laptop={7}>
            <Grid.Column>
              <Stack direction={cardDirectionIsHorizontal ? "column" : "row"}>
                <MockCard
                  direction={
                    cardDirectionIsHorizontal ? "horizontal" : "vertical"
                  }
                />
                <MockCard
                  direction={
                    cardDirectionIsHorizontal ? "horizontal" : "vertical"
                  }
                />
              </Stack>
            </Grid.Column>
            <Grid.Column>
              <Stack direction={cardDirectionIsHorizontal ? "column" : "row"}>
                <MockCard
                  direction={
                    cardDirectionIsHorizontal ? "horizontal" : "vertical"
                  }
                />
                <MockCard
                  direction={
                    cardDirectionIsHorizontal ? "horizontal" : "vertical"
                  }
                />
              </Stack>
            </Grid.Column>
          </Grid>
        </Section>
      </Main>
    );
  },
};
