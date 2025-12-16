import { DefinitionListProps } from "./DefinitionList.types";
import styles from "./DefinitionList.module.scss";
import classNames from "classnames";
import { BaseText } from "_internals/Typography";
import { tokenClassNames } from "_utility";

export const DefinitionList = ({
  title,
  children,
  color = "default",
  className,
  testID = "definition-list",
}: DefinitionListProps) => {
  const textClassNames = classNames(styles["definition-list-text"], {
    [styles["inverted"]]: color === "inverted",
  });

  return (
    <dl
      className={tokenClassNames(styles, "definition-list", className)}
      data-testid={testID}
    >
      {title && (
        <BaseText
          as="dt"
          testID={`${testID}-title`}
          className={classNames(
            textClassNames,
            styles["definition-list-title"],
          )}
        >
          {title}
        </BaseText>
      )}

      {!!children && (
        <BaseText
          as="dd"
          testID={`${testID}-description`}
          className={textClassNames}
        >
          {children}
        </BaseText>
      )}
    </dl>
  );
};
