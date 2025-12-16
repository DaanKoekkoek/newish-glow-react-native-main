import type { Meta, StoryObj } from "@storybook/react";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import { Box } from "components/Box";
import { Paragraph } from "foundations/Paragraph";
import { Stack } from "foundations/Stack";
import { Button, type ButtonProps } from "./index";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";
import { BaseButtonProps } from "_internals/Button";

const fillOptions: ComplexOption<BaseButtonProps["fill"]>[] = [
  { label: "No fill", value: false },
  { label: "Fill", value: true },
  {
    label: "Fill mobile, reset on tablet",
    value: {
      mobileSmall: true,
      tablet: false,
    },
  },
];

const meta: Meta<typeof Button> = {
  title: "DesignSystem/Components/Button/Button",
  component: Button,
  argTypes: {
    onClick: {
      type: "function",
    },
    // Hide the complex icon object from controls
    icon: {
      table: { disable: true },
    },
    // Add separate controls for icon configuration
    showIcon: {
      control: { type: "boolean" },
      description: "Whether to show an icon in the button",
      table: { category: "Icon" },
    },
    iconName: {
      control: { type: "select" },
      options: Object.keys(IconsMap),
      description: "The name of the icon to display",
      table: { category: "Icon" },
      if: { arg: "showIcon", eq: true },
    },
    iconPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
      description: "Position of the icon relative to the button text",
      table: { category: "Icon" },
      if: { arg: "showIcon", eq: true },
    },
    prominence: {
      control: { type: "select" },
      options: ["default", "secondary", "emphasised"],
      description: "Sets the prominence of the button",
    },
    state: {
      options: ["default", "loading", "inactive"],
      control: { type: "select" },
      description:
        "Sets the state of the button. `loading` will show a spinner, `disabled` will disable the button.",
    },
    size: {
      options: ["default", "sm", "lg"],
      control: { type: "radio" },
      description: "Sets the size of the button.",
    },
    fill: {
      ...createComplexControl(fillOptions),
      description: "Applies a `flex-grow:1;` to the button if set to `true`.",
    },
    inverted: {
      options: [true, false],
      control: { type: "boolean" },
      description: "Applies inverted styling to the button if set to `true`.",
    },
    stretched: {
      description:
        "Applies an `::after` object that takes up space within the direct parent of `<Button />`. Makes the parent clickable.",
    },
    children: {
      description: "Accepts `string`. Renders a label within the `<Button />`.",
    },
  },
  args: {
    prominence: "default",
    children: "Button text",
    state: "default",
    size: undefined,
    inverted: false,
    showIcon: false,
    iconName: "arrow-right",
    iconPosition: "left",
    stretched: false,
    fill: false,
    "aria-label": "action-description",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Utility function to construct icon and filter props for Button stories
const useButtonProps = (
  args: StoryObj<typeof meta>["args"] & {
    showIcon?: boolean;
    iconName?: string;
    iconPosition?: "left" | "right" | undefined;
  },
) => {
  // Construct icon object from separate controls
  const icon = args.showIcon
    ? {
        name: args.iconName,
        position: args.iconPosition,
      }
    : undefined;

  // This is to avoid passing custom props to the DOM element
  // This is necessary because the Button component uses polymorphism
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showIcon, iconName, iconPosition, ...buttonProps } = args;

  return { icon, buttonProps };
};

export const Basic: Story = {
  args: {
    prominence: undefined,
    state: undefined,
  },
  render: (args) => {
    const { icon, buttonProps } = useButtonProps(args);
    return <Button {...buttonProps} icon={icon} />;
  },
};

export const WithStretched: Story = {
  args: {
    fill: true,
    stretched: true,
  },
  render: (args) => {
    const { icon, buttonProps } = useButtonProps(args);
    return (
      <Box prominence="color">
        <Stack>
          <Paragraph>
            The stretched prop makes the entire parent container of the button
            clickable, not just the button itself. This creates a larger
            interactive area while maintaining the button's visual appearance.
          </Paragraph>
          <Paragraph>
            Setting stretched={true} applies a ::after pseudo-element that
            expands the clickable area to fill the button's direct parent
            container.
          </Paragraph>
          <Button {...buttonProps} stretched={args.stretched} icon={icon}>
            Label
          </Button>
        </Stack>
      </Box>
    );
  },
};

export const WithAnchorLink: Story = {
  args: {
    as: "a",
    href: "#",
    onClick: undefined,
    children: "Anchor button",
    target: "_blank",
  },
  render: (args) => {
    const { icon, buttonProps } = useButtonProps(args);
    return <Button {...buttonProps} icon={icon} />;
  },
};

export const WithIconAndText: Story = {
  args: {
    showIcon: true,
    iconName: "arrow-left",
    iconPosition: "left",
    children: "Button text",
  },
  parameters: {
    controls: {
      exclude: [
        "prominence",
        "state",
        "inverted",
        "onClick",
        "fill",
        "stretched",
        "size",
        "aria-label",
      ],
    },
  },
  render: (args) => {
    const { icon, buttonProps } = useButtonProps(args);
    return (
      <Stack direction="column" gap="sm">
        <Stack direction="row" gap="sm">
          <Button {...buttonProps} size="sm" icon={icon} />
          <Button {...buttonProps} icon={icon} />
          <Button {...buttonProps} size="lg" icon={icon} />
        </Stack>
        <Stack direction="row" gap="sm">
          <Button
            {...buttonProps}
            prominence="emphasised"
            size="sm"
            icon={icon}
          />
          <Button {...buttonProps} prominence="emphasised" icon={icon} />
          <Button
            {...buttonProps}
            prominence="emphasised"
            size="lg"
            icon={icon}
          />
        </Stack>
        <Stack direction="row" gap="sm">
          <Button
            {...buttonProps}
            prominence="secondary"
            size="sm"
            icon={icon}
          />
          <Button {...buttonProps} prominence="secondary" icon={icon} />
          <Button
            {...buttonProps}
            prominence="secondary"
            size="lg"
            icon={icon}
          />
        </Stack>
      </Stack>
    );
  },
};

export const WithIconOnly: Story = {
  args: {
    showIcon: true,
    iconName: "arrow-left",
    iconPosition: "left",
    children: undefined,
  },
  parameters: {
    controls: {
      exclude: [
        "children",
        "state",
        "inverted",
        "onClick",
        "fill",
        "stretched",
        "size",
        "prominence",
        "aria-label",
        "iconPosition",
        "showIcon",
        "aria-label",
      ],
    },
  },
  render: (args) => {
    const { icon, buttonProps } = useButtonProps(args);
    return (
      <Stack direction="column" gap="sm">
        <Stack direction="row" gap="sm">
          <Button {...buttonProps} size="sm" icon={icon} />
          <Button {...buttonProps} icon={icon} />
          <Button {...buttonProps} size="lg" icon={icon} />
        </Stack>
        <Stack direction="row" gap="sm">
          <Button
            {...buttonProps}
            prominence="emphasised"
            size="sm"
            icon={icon}
          />
          <Button {...buttonProps} prominence="emphasised" icon={icon} />
          <Button
            {...buttonProps}
            prominence="emphasised"
            size="lg"
            icon={icon}
          />
        </Stack>
        <Stack direction="row" gap="sm">
          <Button
            {...buttonProps}
            prominence="secondary"
            size="sm"
            icon={icon}
          />
          <Button {...buttonProps} prominence="secondary" icon={icon} />
          <Button
            {...buttonProps}
            prominence="secondary"
            size="lg"
            icon={icon}
          />
        </Stack>
      </Stack>
    );
  },
};

export const WithLoading: Story = {
  args: {
    state: "loading",
    children: "Button text",
    showIcon: false,
  },
  parameters: {
    // Instead of disabling all controls, exclude specific ones
    controls: {
      exclude: [
        "prominence",
        "inverted",
        "onClick",
        "fill",
        "stretched",
        "size", // Since we're showing all sizes
        "showIcon", // No need to control icon visibility here
      ],
    },
  },
  render: (args) => {
    // Extract BOTH icon and buttonProps
    const { buttonProps } = useButtonProps(args);
    return (
      <Stack direction="column" gap="sm">
        <Stack direction="row" gap="sm">
          <Button {...buttonProps} key="01" size="sm" state={args.state} />
          <Button {...buttonProps} key="02" state={args.state} />
          <Button {...buttonProps} key="03" size="lg" state={args.state} />
        </Stack>
      </Stack>
    );
  },
};

export const _Variants: Story = {
  args: {
    icon: {
      name: "add",
    },
  },
  render: (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ref, key, ...buttonProps } = props;

    return renderCartesianVariants(
      (props: ButtonProps<React.ElementType>, idx: number) => {
        const { children, ...rest } = props;
        return (
          <Button {...rest}>
            {children} {idx}
          </Button>
        );
      },
      {
        ...buttonProps,
        prominence: ["default", "emphasised", "secondary"],
        size: ["sm", "default", "lg"],
        state: ["default", "loading", "inactive"],
      },
      {
        groupBy: [
          (props) => `State: ${props.state}`,
          (props) => `Size: ${props.size}`,
        ],
      },
    );
  },
};
