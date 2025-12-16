import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import styles from "./DefaultList.module.scss";
import classNames from "classnames";
import type {
  DefaultListProps,
  DefaultListItemProps,
} from "./DefaultList.types";
import React from "react";
import { tokenClassNames } from "_utility";

export const DefaultList = ({
  variant = "bullet",
  inverted = false,
  size = "default",
  state = "default",
  testID = "default-list",
  items,
  palette,
  className,
}: DefaultListProps) => {
  const Tag = variant === "numbered" ? "ol" : "ul";

  return (
    <Tag
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "default-list",
        styles[`default-list-size-${size}`],
        {
          [styles["default-list-inverted"]]: inverted,
        },
        className,
      )}
    >
      {items.map((item, index) => (
        <DefaultListItem
          testID={testID}
          key={`list-item-${index}`}
          item={item}
          variant={variant}
          state={state}
          palette={palette}
        />
      ))}
    </Tag>
  );
};

const DefaultListItem = ({
  item,
  variant,
  state,
  palette,
  testID,
}: {
  item: DefaultListItemProps;
  variant: DefaultListProps["variant"];
  state: DefaultListProps["state"];
  palette: DefaultListProps["palette"];
  testID: string;
}) => {
  if (!item.text) return null;

  return (
    <li
      data-testid={`${testID}-list-item`}
      className={classNames(styles[`list-variant-${variant}`], {
        [styles[`list-state-inactive`]]: state === "inactive",
      })}
    >
      {(variant === "icon" || variant === "iconColored") && (
        <DefaultListIcon
          item={item}
          variant={variant}
          palette={item.palette || palette}
        />
      )}
      <DefaultListText item={item} />
    </li>
  );
};

const DefaultListIcon = ({
  item,
  variant,
  palette,
}: {
  item: DefaultListItemProps;
  variant: DefaultListProps["variant"];
  palette: DefaultListProps["palette"];
}) => {
  return (
    <Icon
      className={classNames(
        styles["default-list-icon-root"],
        styles["default-list-icon"],
        {
          [styles[`default-list-icon-palette-${palette ?? "default"}`]]:
            variant === "iconColored",
        },
      )}
      name={item.icon ?? "checkmark"}
    />
  );
};

const DefaultListText = ({ item }: { item: DefaultListItemProps }) => {
  const textClasses = classNames(
    styles["default-list-text-root"],
    styles["default-list-text"],
  );

  if (React.isValidElement(item.text))
    return <div className={textClasses}>{item.text}</div>;

  return <Paragraph className={textClasses}>{item.text}</Paragraph>;
};
