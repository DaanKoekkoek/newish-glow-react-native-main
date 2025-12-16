import { AvatarProps } from "./Avatar.types";
import styles from "./Avatar.module.scss";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

export const Avatar = ({
  children,
  className,
  testID = "avatar",
  palette,
  size = "default",
}: AvatarProps) => {
  return (
    <div
      className={tokenClassNames(
        styles,
        "avatar",
        styles[`avatar-size-${size}`],
        {
          [styles[`avatar-palette-${palette}`]]: !!palette,
        },
        className,
      )}
      data-testid={testID}
    >
      <Paragraph size="sm" as="span">
        {children}
      </Paragraph>
    </div>
  );
};
