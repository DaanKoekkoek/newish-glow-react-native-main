import type React from "react";
import { ComponentPropsWithoutRef } from "react";

/**
 * Represents the size of the TextLink.
 * @type {"xs" | "sm" | "default" | "lg" | "inherit"}
 */
export type TextLinkSize = "xs" | "sm" | "default" | "lg" | "inherit";

/**
 * Props for the TextLink.
 * @type TextLinkProps
 * @extends {Pick<React.AnchorHTMLAttributes<React.HTMLAttributeAnchorTarget>,"target"> }
 * @property {React.ReactNode} [children] - Content intended render Text and/or Icon. Can only accept multiple Text and/or Icon
 * @property {"a" | "button"} [as='a'] - Sets tag type of the `TextLink` component. Defaults to `a` but can be used when a `TextLink` styled button is needed as well.
 * @property {boolean} [ignoreStretched=false] - Ignores another stretch link by moving it one index up.
 * @property {boolean} [inverted={false}] - Sets the style of TextLink into inverted. Intended for darker backgrounds only
 * @property {TextLinkSize} [size='md'] - The TextLink size
 * @property {boolean} [stretched=false] - Stretches the link relative to its parent container
 * @property {React.CSSProperties} [textStyle] - Applies additional styling to the <Text /> within the TextLink.
 * @property {string} [textClassName] - Additional class name to apply to the text (optional)
 * @property {string} [ariaLabel] - Apply aria-label to the link in case the contents of the TextLink only contains an icon.
 */
export type TextLinkBaseProps = Pick<
  React.AnchorHTMLAttributes<React.HTMLAttributeAnchorTarget>,
  "target"
> & {
  children: React.ReactNode;
  as?: "a" | "button";
  ignoreStretched?: boolean;
  inverted?: boolean;
  size?: TextLinkSize;
  stretched?: boolean;
  textStyle?: React.CSSProperties;
  textClassName?: string;
  ariaLabel?: string;
  inactive?: boolean;
  testID?: string;
};

export type TextLinkAsAnchor = TextLinkBaseProps &
  ComponentPropsWithoutRef<"a"> & {
    as?: "a" | undefined;
    target?: "_self" | "_blank";
  };
export type TextLinkAsButton = TextLinkBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "disabled"> & {
    as?: "button" | undefined;
  };

export type TextLinkProps = TextLinkAsAnchor | TextLinkAsButton;
