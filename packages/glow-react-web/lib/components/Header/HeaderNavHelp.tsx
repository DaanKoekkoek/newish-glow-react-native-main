import type { ReactNode } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { Status } from "components/Status/Status";

export interface HeaderNavHelpProps {
  phoneNumber: string;
  isOpen: boolean;
  link: ReactNode;
  className?: string;
  testID?: string;
}

/**
 * HeaderNavHelp component displays contact information with status and a link
 */
export const HeaderNavHelp = ({
  phoneNumber,
  isOpen,
  link,
  className,
  testID = "header-nav-help",
}: HeaderNavHelpProps): JSX.Element => {
  return (
    <div
      className={classNames(styles["header-nav-help"], className)}
      data-testid={testID}
    >
      <div className={styles["header-nav-help-row"]}>
        <span className={styles["header-nav-help-phone"]}>{phoneNumber}</span>
        <Status
          type={isOpen ? "success" : "error"}
          statusText={isOpen ? "Open" : "Closed"}
          testID={`${testID}-status`}
        />
      </div>
      <div className={styles["header-nav-help-row"]}>{link}</div>
    </div>
  );
};
