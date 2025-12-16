import styles from "./ActionButtonGroup.module.scss";
import { tokenClassNames } from "_utility";

export type ActionButtonGroupProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const ActionButtonGroup = ({ children }: ActionButtonGroupProps) => {
  return (
    <div className={tokenClassNames(styles, "action-button-group")}>
      {children}
    </div>
  );
};
