import { Paragraph } from "foundations/Paragraph";
import styles from "./Status.module.scss";
import type { StatusProps } from "./Status.types";
import classNames from "classnames";
import { tokenClassNames } from "_utility";

export const Status = ({
  type = "success",
  statusText = "Status",
  testID = "",
}: StatusProps) => (
  <div data-testid={testID} className={tokenClassNames(styles, "status")}>
    <div
      data-testid={`${testID}-indicator`}
      className={classNames(styles["status-indicator"], styles[type])}
    />
    <Paragraph as="span" className={styles["status-text"]} size="sm">
      {statusText}
    </Paragraph>
  </div>
);
