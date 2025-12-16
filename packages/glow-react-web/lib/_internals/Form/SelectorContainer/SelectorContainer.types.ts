import type { PropsWithChildren } from "react";
import type { SelectorPropsBase } from "components/Selector";

export type SelectorContainerProps = PropsWithChildren<
  Omit<
    SelectorPropsBase,
    "highlight" | "title" | "secondaryAction" | "promotion"
  >
> & {
  highlight?: React.ReactElement | null;
  className?: string;
  contentClassName?: string;
};
