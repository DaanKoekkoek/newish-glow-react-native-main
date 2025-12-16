import React from "react";
import styles from "./SummaryList.module.scss";
import {
  SummaryListProps,
  SummaryListItemProps,
  SummaryListActionProps,
} from "./SummaryList.types";
import {
  Status,
  Divider,
  ActionButtonIcon,
  Price,
  Button,
  DefaultList,
} from "components/index";
import { Addon, Paragraph, AttentionText, Heading } from "foundations/index";
import { BaseText } from "_internals/Typography";
import { Visual } from "_internals/Assets";
import { NumberInput } from "components/NumberInput";
import { tokenClassNames } from "_utility";
import classNames from "classnames";

export const SummaryList = ({
  children,
  testID = "summary-list",
  state = "default",
  endsWithDivider,
}: SummaryListProps) => {
  return (
    <ul
      data-testid={testID}
      className={tokenClassNames(styles, "summary-list")}
    >
      {React.Children.toArray(children).map((child, index) => (
        <li
          className={styles["summary-list-item"]}
          key={`${testID}-item-${index}`}
          data-testid={`${testID}-item-${index}`}
        >
          {React.isValidElement(child) && (
            <SummaryListItem {...child.props} state={state} />
          )}
          {(index < React.Children.count(children) - 1 || endsWithDivider) && (
            <Divider prominence="subtle" />
          )}
        </li>
      ))}
    </ul>
  );
};

export const SummaryListItem = ({
  children,
  image,
  heading,
  supportText,
  subheading,
  status,
  promotionText,
  list,
  actions,
  price,
  state = "default",
  testID = "summary-list-content",
}: SummaryListItemProps) => {
  return (
    <>
      <div
        data-testid={testID}
        className={classNames(styles["summary-list-item-wrapper"], {
          [styles["is-inactive"]]: state === "inactive",
        })}
      >
        {!!image &&
          (image.name ? (
            <Addon name={image.name} size="sm" state={state} />
          ) : (
            <Visual
              {...image}
              noPadding="all"
              resizeMode="contain"
              renderType="background"
              className={styles["summary-list-product-image"]}
            />
          ))}
        <div className={styles["summary-list-content"]}>
          {(!!heading || !!subheading) && (
            <div className={styles["summary-list-heading"]}>
              {!!subheading && <Paragraph size="sm">{subheading}</Paragraph>}
              {!!heading && (
                <Heading size="sm" as="h3">
                  {heading}
                </Heading>
              )}
              {!!supportText && (
                <Paragraph
                  className={styles["summary-list-support-text"]}
                  size="xs"
                >
                  {supportText}
                </Paragraph>
              )}
            </div>
          )}
          {!!status && state === "default" && <Status {...status} />}
          {!!promotionText && state === "default" && (
            <AttentionText>{promotionText}</AttentionText>
          )}
          {!!list && <DefaultList {...list} size="sm" state={state} />}
          {(!!actions || !!price) && (
            <div className={styles["summary-list-price-and-actions"]}>
              {!!actions && (
                <div className={styles["summary-list-actions"]}>{actions}</div>
              )}
              {!!price && <Price {...price} state={state} size="sm" />}
            </div>
          )}
        </div>
      </div>
      {!!children && (
        <div className={styles["summary-list-extra-content"]}>
          {React.isValidElement(children) ? (
            children
          ) : (
            <BaseText>{children}</BaseText>
          )}
        </div>
      )}
    </>
  );
};

export const SummaryListAction = ({
  icon,
  onClick = () => {},
  numberInput,
  ...props
}: SummaryListActionProps) =>
  icon && !numberInput ? (
    props.children ? (
      <Button
        {...props}
        icon={{ position: "left", name: icon }}
        prominence="secondary"
        size="sm"
        onClick={onClick}
      />
    ) : (
      <ActionButtonIcon
        {...props}
        onClick={onClick}
        icon={icon}
        inverted
        size="sm"
      />
    )
  ) : (
    <NumberInput {...numberInput} size="sm" />
  );
