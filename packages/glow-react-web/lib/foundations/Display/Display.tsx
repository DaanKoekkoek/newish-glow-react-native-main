import { useMemo } from "react";
import type { DisplayProps } from "./Display.types";
import styles from "./Display.module.scss";
import {
  formatStringWithTag,
  getTextFromReactNode,
  tokenClassNames,
} from "_utility";

export const Display = ({
  alignment,
  color = "default",
  highlightClassName = styles["display-highlight"],
  size = "md",
  children,
  className,
  testID,
  as = "p",
  lang = "nl",
}: DisplayProps) => {
  const DisplayTag = as;
  const text = getTextFromReactNode(children);

  const formattedText = useMemo(() => {
    return formatStringWithTag(text, {
      className: highlightClassName,
    });
  }, [text, highlightClassName]);

  return (
    <DisplayTag
      lang={lang}
      className={tokenClassNames(
        styles,
        "display",
        styles[`display-size-${size}`],
        className,
        {
          [styles[`display-align-${alignment}`]]: alignment,
          [styles["is-inverted"]]: color === "inverted",
        },
      )}
      data-testid={testID}
    >
      {formattedText}
    </DisplayTag>
  );
};
