import styles from "./BaseText.module.scss";
import { tokenClassNames } from "_utility";

type BaseTextProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  variant?: "paragraph" | "heading" | "display";
  className?: string;
  testID?: string;
} & React.HTMLProps<HTMLElement>;

export const BaseText = ({
  children,
  as: Tag = "span",
  variant = "paragraph",
  className,
  testID,
  ...props
}: BaseTextProps) => {
  const classes = tokenClassNames(
    styles,
    "base-text",
    {
      [styles["base-paragraph"]]: variant === "paragraph",
      [styles["base-heading"]]: variant === "heading",
      [styles["base-display"]]: variant === "display",
    },
    className,
  );

  return (
    <Tag className={classes} data-testid={testID} {...props}>
      {children}
    </Tag>
  );
};
