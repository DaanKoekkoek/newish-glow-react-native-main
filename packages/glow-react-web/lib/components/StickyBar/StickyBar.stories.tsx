import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { StickyBar, StickyBarActionButton } from "./StickyBar";
import { Box, Button } from "components/index";
import { Main, Column, Grid, Section, Paragraph } from "foundations/index";

const MockPlaceholderComponent = () => (
  <div
    style={{
      borderWidth: 2,
      borderStyle: "dashed",
      padding: 16,
      height: "100%",
      width: "100%",
    }}
  >
    <Paragraph key="content">Replace me</Paragraph>
  </div>
);

const mockSection = (amount = 1) => {
  let i = 0;
  const boxes = [];

  while (i < amount) {
    boxes.push(
      <Section variant={i % 2 === 1 ? "default" : "subtle"} key={i}>
        <Grid>
          <Column>
            <Paragraph>Section contents</Paragraph>
          </Column>
        </Grid>
      </Section>,
    );
    i++;
  }

  return boxes;
};

const meta: Meta<typeof StickyBar> = {
  title: "DesignSystem/Components/Overlay/StickyBar",
  component: StickyBar,
  argTypes: {
    layout: {
      description: "Configures the layout of content within the stickybar.",
      options: [
        "default",
        "stacked",
        { mobileSmall: "stacked", laptop: "default" },
      ],
      control: {
        type: "select",
      },
    },
    children: {
      description: "Accepts `React.ReactNode`",
      control: false,
    },
    modal: {
      description:
        "Accepts `React.ReactElement`. Should contain a `<Modal />` component. You should pass in a  `<StickyBarActionButton />` component into the Modal's `trigger` property.",
    },
    callToAction: {
      description:
        "Accepts `React.ReactElement | React.ReactElement[]`. Should contain `<Button />` components.",
      control: false,
    },
    hideWhenVisibleRef: {
      description:
        "Hides the sticky-bar when ref is in viewport. Can be used to hide the sticky-bar shopping-cart when the `<ShoppingCart />` is visible.",
    },
  },
  args: {
    children: <MockPlaceholderComponent />,
    modal: {
      trigger: (
        <StickyBarActionButton
          ariaLabel="Open modal"
          position="bottom"
          onClick={() => {}}
        />
      ),
      title: "Stickybar modal title",
      children: "Contents of stickybar modal",
    },
    callToAction: (
      <Button
        icon={{ name: "arrow-right", position: "left" }}
        prominence="emphasised"
        key="trigger-1"
      >
        Label
      </Button>
    ),
  },
  decorators: [
    (Story, args) => (
      <Main>
        {mockSection(6)}
        <Story {...args} />
      </Main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Top: Story = {
  args: {
    position: "top",
  },
};

export const TwoButtons: Story = {
  args: {
    children: undefined,
    modal: undefined,
    callToAction: [
      <Button icon={{ name: "arrow-right", position: "left" }} key="trigger-1">
        Label
      </Button>,
      <Button
        icon={{ name: "arrow-right", position: "left" }}
        prominence="secondary"
        key="trigger-2"
      >
        Label
      </Button>,
    ],
  },
};

export const HideStickybarWhenRefIsVisible: Story = {
  render: (args) => {
    const divRef = useRef(null);
    return (
      <div style={{ minHeight: "120vh" }}>
        <Grid>
          <Column>
            <div ref={divRef}>
              <Box prominence="emphasised">
                <Paragraph>
                  Hides sticky bar when this is in viewport.
                </Paragraph>
              </Box>
            </div>
          </Column>
        </Grid>
        <StickyBar {...args} hideWhenVisibleRef={divRef} />
      </div>
    );
  },
};
