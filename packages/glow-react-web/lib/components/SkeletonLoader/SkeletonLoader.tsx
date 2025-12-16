import classNames from "classnames";
import styles from "./SkeletonLoader.module.scss";
import { SkeletonLoaderProps } from "./SkeletonLoader.types";
import { tokenClassNames } from "_utility";

export const SkeletonLoader = ({
  size = "default",
  testID,
}: SkeletonLoaderProps) => {
  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "skeleton-loader",
        styles[`skeleton-loader-size-${size}`],
      )}
    >
      <div className={classNames(styles["skeleton-loader-gradient"])} />
    </div>
  );
};
