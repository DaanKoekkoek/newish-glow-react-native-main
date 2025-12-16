import styles from "./Label.module.scss";
import { BaseText } from "_internals/Typography";
import { tokenClassNames } from "_utility";

interface LabelProps {
  children?: React.ReactNode;
  id?: string;
  testID?: string;
  className?: string;
}

export const Label = ({ children, id, testID, className }: LabelProps) => {
  return (
    <BaseText
      as="label"
      htmlFor={id}
      testID={testID}
      className={tokenClassNames(styles, "label", className)}
    >
      {children}
    </BaseText>
  );
};
