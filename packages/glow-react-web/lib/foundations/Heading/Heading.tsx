import { useMemo } from "react";
import { HeadingProps } from "./Heading.types";
import styles from "./Heading.module.scss";
import {
  formatStringWithTag,
  getTextFromReactNode,
  tokenClassNames,
} from "_utility";

export const Heading = ({
  size = "xl",
  className,
  highlightClassName = styles["heading-highlight"],
  color,
  children,
  alignment = "left",
  as: Tag = "div",
  style,
  testID = "heading",
  lang = "nl",
}: HeadingProps) => {
  const text = getTextFromReactNode(children);

  const formattedText = useMemo(() => {
    return formatStringWithTag(text, {
      className: highlightClassName,
    });
  }, [text, highlightClassName]);

  return (
    <Tag
      lang={lang}
      className={tokenClassNames(
        styles,
        "heading",
        styles[`heading-size-${size}`],
        styles[`align-${alignment}`],
        {
          [styles[`heading-color-${color}`]]: !!color,
        },
        className,
      )}
      data-testid={testID}
      style={style}
    >
      {formattedText}
    </Tag>
  );
};
