import type { ListItemProps, ListProps } from "./List.types";
import styles from "./List.module.scss";
import classNames from "classnames";
import { Icon } from "foundations/Icon";
import { Divider } from "components/Divider";
import { BadgeStatus } from "components/Badge/BadgeStatus";
import { TextLink } from "components/TextLink";
import { Image } from "foundations/Image";
import { tokenClassNames } from "_utility";

const iconFontSize = {
  xs: "sm",
  sm: "sm",
  default: "default",
  lg: "md",
};

export const List = ({
  background = "default",
  palette = "default",
  testID = "list",
  children,
}: ListProps) => {
  return (
    <ul
      className={tokenClassNames(
        styles,
        "list",
        styles[`background-${background}`],
        {
          [styles[`palette-${palette}`]]: background === "default",
        },
      )}
      data-testid={testID}
    >
      {children}
    </ul>
  );
};

export const ListItem = ({
  leadingContent,
  iconRight,
  text,
  description1,
  description2,
  attention,
  testID = "list-item",
  trailingContent,
  detail,
  notification,
  clickable,
  palette = "default",
  onClick,
  href,
  action,
  bottomDivider = false,
}: ListItemProps) => {
  const listItemTextLinkProps = { clickable, testID, href, onClick };

  const renderLeadingContent = () => {
    if (!leadingContent) {
      return null;
    }

    if ("image" in leadingContent) {
      const { image, mediaContentSize = "default" } = leadingContent;
      return (
        <Image
          className={styles[`list-media-${mediaContentSize}`]}
          {...image}
          ratio="1/1"
          testID={`list-item-leading-content-${testID}`}
        />
      );
    }

    if ("mediaContentSize" in leadingContent) {
      const { icon, mediaContentSize = "default" } = leadingContent;

      return (
        <Icon
          className={classNames(
            styles[`list-media-icon-${mediaContentSize}`],
            styles[`list-media-icon-palette-${palette}`],
            styles[
              `list-media-icon-font-size-${iconFontSize[mediaContentSize]}`
            ],
          )}
          name={icon}
          aria-hidden="true"
          testID={`list-item-leading-content-${testID}`}
        />
      );
    }

    return (
      <Icon
        className={classNames(styles[`list-icon-left`])}
        name={leadingContent.icon}
        aria-hidden="true"
        testID={`list-item-leading-content-${testID}`}
      />
    );
  };

  return (
    <li className={styles["list-item"]} data-testid={testID}>
      <div className={styles.wrapper}>
        <span
          className={classNames(styles["list-item-content"], {
            [styles["list-item-content-center"]]:
              !description1 && !description2 && !attention,
          })}
        >
          {renderLeadingContent()}
          <div className={classNames(styles["list-item-text-wrapper"])}>
            <span className={styles["list-item-text"]}>{text}</span>
            {!!description1 && (
              <span className={styles["list-item-description"]}>
                {description1}
              </span>
            )}
            {!!description2 && (
              <span className={styles["list-item-description"]}>
                {description2}
              </span>
            )}
            {!!attention && (
              <span
                className={classNames(
                  styles["list-item-attention"],
                  styles[`attention-${attention.variant}`],
                )}
              >
                {attention.text}
              </span>
            )}
          </div>
        </span>

        {!!trailingContent && (
          <span className={styles["list-item-action"]}>{trailingContent}</span>
        )}
        {!!detail && (
          <ListItemTextLink {...listItemTextLinkProps}>
            <span className={styles["list-item-detail"]}>{detail}</span>
          </ListItemTextLink>
        )}
        {!!notification && (
          <ListItemTextLink {...listItemTextLinkProps}>
            <BadgeStatus count={notification} variant="default" />
          </ListItemTextLink>
        )}
        {!!clickable && (
          <ListItemTextLink {...listItemTextLinkProps}>
            <Icon
              className={styles["list-icon-right"]}
              name={iconRight ?? "chevron-right"}
              size="sm"
              testID={`list-icon-right-${testID}`}
            />
          </ListItemTextLink>
        )}
        {!!action && (
          <ListItemTextLink {...listItemTextLinkProps}>
            {action}
          </ListItemTextLink>
        )}
      </div>
      <Divider
        prominence="subtle"
        className={classNames(styles["list-divider"], {
          [styles["force-bottom-divider"]]: bottomDivider,
        })}
      />
    </li>
  );
};

const ListItemTextLink = ({
  clickable,
  children,
  testID,
  href,
  onClick,
}: {
  clickable?: boolean;
  children?: React.ReactNode;
  testID?: string;
  href: ListItemProps["href"];
  onClick: ListItemProps["onClick"];
}) => {
  return clickable ? (
    <TextLink
      as={onClick ? "button" : "a"}
      href={href}
      onClick={onClick}
      testID={`text-link-${testID}`}
      stretched
      className={styles["list-item-text-link"]}
    >
      {children}
    </TextLink>
  ) : (
    <div className={styles["list-item-non-clickable"]}>{children}</div>
  );
};
