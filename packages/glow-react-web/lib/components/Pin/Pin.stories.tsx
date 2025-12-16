import type { Meta, StoryObj } from "@storybook/react";

import { PinCode } from "./Pin";
import { PinSlot } from "./PinSlot";
import { Fragment, useCallback, useEffect, useState } from "react";
import type { PinProps } from "./Pin.types";
import { Divider } from "components/Divider";

const meta: Meta<typeof PinCode> = {
  args: {},
  argTypes: {
    maxLength: {
      type: { name: "number", required: true },
    },
  },
  component: PinCode,
  render: ({
    maxLength = 4,
    onCompleted: propOnCompleted,
    state: propState,
    children,
    ...props
  }) => {
    const [state, setState] = useState<PinProps["state"]>("default");

    useEffect(
      function updateStateFromProps() {
        setState(propState);
      },
      [propState],
    );

    const onCompleted = useCallback(
      (code: string) => {
        setState("loading");
        setTimeout(
          () => setState(Math.random() > 0.5 ? "success" : "error"),
          2500,
        );
        propOnCompleted?.(code);
      },
      [propOnCompleted],
    );

    return (
      <PinCode
        maxLength={maxLength}
        onCompleted={onCompleted}
        state={state}
        {...props}
      >
        {[...Array(maxLength).keys()].map((_, index) =>
          children ? (
            <Fragment key={`pinslot-${index}`}>
              <PinSlot index={index} />
              {index !== maxLength - 1 ? children : null}
            </Fragment>
          ) : (
            <PinSlot key={`pinslot-${index}`} index={index} />
          ),
        )}
      </PinCode>
    );
  },
  title: "DesignSystem/Components/Input/Pincode",
};

export default meta;

type Story = StoryObj<typeof PinCode>;

export const Default: Story = {
  args: {
    code: "",
    errorMessage: "Error message",
    loadingMessage: "Loading message",
    masked: false,
    maxLength: 4,
    onCompleted: () => {},
    state: "default",
    successMessage: "Succes message",
  },
  argTypes: {
    containerClassName: { table: { disable: true } },
    noScriptCSSFallback: { table: { disable: true } },
    pasteTransformer: { table: { disable: true } },
    pushPasswordManagerStrategy: { table: { disable: true } },
    textAlign: { table: { disable: true } },
  },
  name: "4-digit",
};

export const FiveDigit: Story = {
  args: {
    code: "",
    errorMessage: "Error message",
    loadingMessage: "Loading message",
    masked: false,
    maxLength: 5,
    onCompleted: () => {},
    state: "default",
    successMessage: "Succes message",
  },
  argTypes: {
    containerClassName: { table: { disable: true } },
    noScriptCSSFallback: { table: { disable: true } },
    pasteTransformer: { table: { disable: true } },
    pushPasswordManagerStrategy: { table: { disable: true } },
    textAlign: { table: { disable: true } },
  },
  name: "5-digit",
};

export const SixDigitWithDividers: Story = {
  args: {
    code: "",
    errorMessage: "Error message",
    loadingMessage: "Loading message",
    masked: false,
    maxLength: 6,
    onCompleted: () => {},
    state: "default",
    successMessage: "Succes message",
  },
  argTypes: {
    containerClassName: { table: { disable: true } },
    noScriptCSSFallback: { table: { disable: true } },
    pasteTransformer: { table: { disable: true } },
    pushPasswordManagerStrategy: { table: { disable: true } },
    textAlign: { table: { disable: true } },
  },
  name: "6-digit with dividers",
  render: ({
    maxLength = 4,
    onCompleted: propOnCompleted,
    state: propState,
    ...props
  }) => {
    const [state, setState] = useState<PinProps["state"]>("default");

    useEffect(
      function updateStateFromProps() {
        setState(propState);
      },
      [propState],
    );

    const onCompleted = useCallback(
      (code: string) => {
        setState("loading");
        setTimeout(
          () => setState(Math.random() > 0.5 ? "success" : "error"),
          2500,
        );
        propOnCompleted?.(code);
      },
      [propOnCompleted],
    );

    return (
      <PinCode
        maxLength={maxLength}
        onCompleted={onCompleted}
        state={state}
        {...props}
      >
        {[...Array(maxLength).keys()].map((_, index) => (
          <Fragment key={`pincode-slot-${index}`}>
            <PinSlot index={index} />
            {index !== maxLength - 1 ? (
              <div style={{ width: "50px" }}>
                <Divider />
              </div>
            ) : null}
          </Fragment>
        ))}
      </PinCode>
    );
  },
};
