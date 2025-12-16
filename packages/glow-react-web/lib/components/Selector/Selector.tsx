import { useMemo } from "react";
import type { SelectorProps } from "./Selector.types";
import styles from "./Selector.module.scss";
import { TextLink } from "components/TextLink";
import { Highlight } from "_internals/Highlight";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { Strong } from "foundations/Strong";
import { Divider } from "components/Divider";
import { BaseText } from "_internals/Typography";
import { SelectorContainer } from "_internals/Form/SelectorContainer";
import { formatStringWithTag, tokenClassNames } from "_utility";
import { Badge } from "components/Badge";
import { Price } from "components/Price";
import { DefaultList } from "components/DefaultList";

export const Selector = ({
  id,
  name,
  onChange,
  title,
  checked,
  state = "default",
  variant = "default",
  type = "radio",
  price,
  badge,
  promotion,
  secondaryAction,
  highlight,
  list,
  titleStrikethrough,
  description,
  testID = "selector",
  palette = "default",
  ...inputProps
}: SelectorProps): JSX.Element => {
  const isInactive = state === "inactive";
  const isCompact = variant === "compact";
  const isExtended = variant === "extended";

  const handleSelectChange = (id: string, checked?: boolean) => {
    if (isInactive) return;
    onChange?.(id, checked);
  };

  const formattedTitle = useMemo(() => {
    return formatStringWithTag(title, {
      className: styles["selector-highlighted-text"],
    });
  }, [title]);

  return (
    <SelectorContainer
      state={state}
      checked={checked}
      contentClassName={classNames(styles["selector-container"], {
        [styles["has-secondary-action"]]: secondaryAction,
      })}
      id={id}
      name={name}
      highlight={
        highlight ? (
          <Highlight variant={variant === "compact" ? "compact" : "default"}>
            {highlight}
          </Highlight>
        ) : null
      }
      palette={palette}
      type={type}
      className={tokenClassNames(styles, "selector")}
      onChange={(id, checked) => handleSelectChange(id, checked)}
      testID={testID}
      {...inputProps}
    >
      <div
        className={classNames(styles["selector-body"], {
          [styles["is-compact"]]: isCompact,
          [styles["is-extended"]]: isExtended,
          [styles["is-checkbox"]]: type === "checkbox",
          [styles["is-highlighted"]]: !!highlight,
          [styles["is-selected"]]: checked,
          [styles["is-disabled"]]: isInactive,
        })}
      >
        <div className={styles["selector-label-group"]}>
          {!!badge && !isCompact && (
            <div className={styles["badge-container"]}>
              <Badge {...badge} palette={palette} state={state} />
            </div>
          )}
          <div
            className={classNames(styles["selector-price-title"], {
              [styles["selector-price-title-extended"]]: isExtended,
            })}
          >
            <div
              className={classNames(styles["selector-title-price"], {
                [styles["selector-title-price-compact"]]:
                  isCompact && type === "radio",
              })}
            >
              <Strong
                className={classNames(
                  styles["selector-title"],
                  styles[`selector-title-palette-${palette}`],
                  {
                    [styles["is-disabled"]]: isInactive,
                    [styles["is-extended"]]: isExtended,
                    [styles["is-compact"]]: isCompact,
                  },
                )}
                size="default"
              >
                {!!titleStrikethrough && isExtended && (
                  <BaseText className={styles["title-strikethrough"]}>
                    {titleStrikethrough}
                  </BaseText>
                )}
                <span>{formattedTitle}</span>
                {!!promotion && !isCompact && (
                  <Paragraph
                    as="span"
                    size="sm"
                    className={classNames(styles["selector-promotion"], {
                      [styles["promotion-is-disabled"]]: isInactive,
                    })}
                  >
                    {promotion}
                  </Paragraph>
                )}
                {!!description && (!isCompact || !isExtended) && (
                  <Paragraph
                    as="span"
                    className={classNames(styles["selector-description"], {
                      [styles["description-is-disabled"]]: isInactive,
                    })}
                    size="sm"
                  >
                    {description}
                  </Paragraph>
                )}
              </Strong>
            </div>
            {!!price && !isCompact && (
              <Price
                {...price}
                className={styles["selector-price"]}
                state={state}
              />
            )}
          </div>
        </div>
        {isExtended && !!list && (
          <div className={styles["selector-list"]}>
            <DefaultList
              {...list}
              variant="iconColored"
              palette={palette}
              state={state}
            />
          </div>
        )}
        {variant === "extended" && secondaryAction && (
          <Divider prominence="subtle" className={styles["selector-divider"]} />
        )}
        {secondaryAction && !isCompact && (
          <div className={styles["selector-secondary-action"]}>
            <TextLink {...secondaryAction} inactive={isInactive} size="sm" />
          </div>
        )}
      </div>
    </SelectorContainer>
  );
};
