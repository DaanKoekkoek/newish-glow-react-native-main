import { tokenClassNames } from "_utility";
import styles from "./Paragraph.module.scss";
import type { ParagraphProps } from "./Paragraph.types.js";

export const Paragraph = ({
  id,
  dataAttributes,
  children,
  as: Tag = "p",
  style,
  testID = "paragraph",
  className,
  size = "default",
  alignment,
}: ParagraphProps) => {
  if (!children) return null;

  return (
    <Tag
      id={id}
      className={tokenClassNames(
        styles,
        "paragraph",
        styles[`paragraph-size-${size}`],
        {
          [styles[`paragraph-align-${alignment}`]]: alignment,
        },
        className,
      )}
      style={style}
      data-testid={testID}
      {...dataAttributes}
    >
      {children}
    </Tag>
  );
};
