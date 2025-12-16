import React from "react";
import { Price, type PriceProps } from "components/Price";
import { Paragraph } from "foundations/Paragraph";
import styles from "./PriceContext.module.scss";
import { tokenClassNames } from "_utility";

export type PriceContextProps = {
  disclaimer?: string;
  description?: string;
  moreInfo?: React.ReactElement;
  testID?: string;
  size?: PriceProps["size"];
} & PriceProps;

export const PriceContext = ({
  disclaimer,
  description,
  moreInfo,
  testID = "price-context",
  size = "xl",
  ...props
}: PriceContextProps) => {
  return (
    <div
      className={tokenClassNames(styles, "price-context")}
      data-testid={testID}
    >
      <div className={styles["price-context-inline"]}>
        <Price {...props} size={size} />
        {moreInfo}
      </div>
      <Paragraph size="sm" className={styles["price-context-description"]}>
        {description}
      </Paragraph>
      <Paragraph size="xxs" className={styles["price-context-disclaimer"]}>
        {disclaimer}
      </Paragraph>
    </div>
  );
};
