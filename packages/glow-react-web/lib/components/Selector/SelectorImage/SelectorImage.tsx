import { useMemo } from "react";
import type { SelectorImageProps } from "./SelectorImage.types";
import styles from "./SelectorImage.module.scss";
import { TextLink } from "components/TextLink";
import type React from "react";
import { Highlight } from "_internals/Highlight";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { Strong } from "foundations/Strong";
import { Visual } from "_internals/Assets";
import { SelectorContainer } from "_internals/Form/SelectorContainer";
import { formatStringWithTag, tokenClassNames } from "_utility";
import { Price } from "components/Price";
import { Badge } from "components/Badge";
import { DefaultList } from "components/DefaultList";

export const SelectorImage = ({
  id,
  onChange,
  title,
  checked,
  state = "default",
  variant = "vertical",
  image,
  type = "radio",
  price,
  badge,
  promotion,
  secondaryAction,
  highlight,
  list,
  description,
  palette = "default",
  testID = "selector-image",
  ...inputProps
}: SelectorImageProps): JSX.Element => {
  const isInactive = state === "inactive";

  const handleSelectChange = (id: string, checked?: boolean) => {
    if (isInactive) return;
    onChange?.(id, checked);
  };

  const formattedTitle = useMemo(() => {
    return formatStringWithTag(title, {
      className: styles["selector-image-highlighted-text"],
    });
  }, [title]);

  const labelGroupProps = {
    state: state,
    description: description,
    promotion: promotion,
    variant: variant,
    badge: badge,
    list: list,
    formattedTitle: formattedTitle,
    palette: palette,
  };

  const selectorPriceProps = {
    price: price,
    state: state,
    type: type,
  };

  return (
    <SelectorContainer
      checked={checked}
      state={state}
      highlight={
        highlight ? (
          <Highlight variant={variant === "horizontal" ? "compact" : "default"}>
            {highlight ?? ""}
          </Highlight>
        ) : null
      }
      palette={palette}
      type={type}
      className={tokenClassNames(styles, "selector-image")}
      id={id}
      onChange={(id, checked) => handleSelectChange(id, checked)}
      testID={testID}
      {...inputProps}
    >
      {variant === "vertical" ? (
        <div
          data-testid="image-selector"
          className={classNames(styles["selector-body"], {
            [styles["is-highlighted"]]: highlight,
            [styles["is-disabled"]]: isInactive,
            [styles["is-checkbox"]]: type === "checkbox",
          })}
        >
          <Visual
            pictureClassName={styles.image}
            className={classNames(styles["selector-image-visual"], {
              [styles["is-selected"]]: !!checked,
              [styles["is-highlighted"]]: highlight,
            })}
            renderType="foreground"
            noPadding="all"
            testID="selector-image"
            {...image}
          />
          <div className={styles["selector-content"]}>
            <SelectorLabelGroup {...labelGroupProps} />
            <SelectorSecondaryAction
              secondaryAction={secondaryAction}
              state={state}
            />
            <SelectorPrice {...selectorPriceProps} />
          </div>
        </div>
      ) : (
        <div
          data-testid="image-selector"
          className={classNames(styles["selector-body"], {
            [styles["is-highlighted"]]: highlight,
            [styles["is-selected"]]: !!checked,
            [styles["is-disabled"]]: isInactive,
          })}
        >
          <div className={styles["selector-content-horizontal"]}>
            <Visual
              className={styles["selector-image-visual"]}
              pictureClassName={styles["image-horizontal"]}
              renderType="foreground"
              noPadding="all"
              testID="selector-image"
              ratio={variant === "horizontal" ? "1/1" : "16/9"}
              {...image}
              resizeMode="cover"
            />
            <div className={styles["selector-horizontal-labels"]}>
              <SelectorLabelGroup {...labelGroupProps} />
              <SelectorSecondaryAction
                secondaryAction={secondaryAction}
                state={state}
              />
              <SelectorPrice {...selectorPriceProps} />
            </div>
          </div>
        </div>
      )}
    </SelectorContainer>
  );
};

const SelectorPrice = ({
  price,
  state,
  type,
}: Pick<SelectorImageProps, "price" | "state" | "type">) => {
  if (!price) {
    return null;
  }

  return (
    <div
      className={classNames(styles["price-content"], {
        [styles["is-checkbox"]]: type === "checkbox",
      })}
    >
      {price && <Price {...price} state={state} />}
    </div>
  );
};

const SelectorLabelGroup = ({
  state,
  description,
  promotion,
  variant,
  badge,
  list,
  formattedTitle,
  palette,
}: { formattedTitle: React.ReactNode | null } & Omit<
  SelectorImageProps,
  "image" | "title" | "id"
>) => (
  <div className={classNames(styles["selector-label-group"])}>
    <div className={styles["selector-title-content"]}>
      {variant === "horizontal" && !!badge ? (
        <div
          className={classNames(styles["badge-container"], {
            [styles["horizontal"]]: variant === "horizontal",
          })}
        >
          {badge && <Badge {...badge} palette={palette} state={state} />}
        </div>
      ) : null}
      <Strong
        className={classNames(
          styles["selector-title"],
          styles[`selector-title-palette-${palette}`],
          {
            [styles["is-disabled"]]: state === "inactive",
          },
        )}
        size="default"
      >
        <span>{formattedTitle}</span>
      </Strong>
      <Paragraph
        size="sm"
        className={classNames(styles["selector-promotion"], {
          [styles["promotion-is-disabled"]]: state === "inactive",
        })}
      >
        {promotion}
      </Paragraph>
    </div>
    <Paragraph
      className={classNames(styles["selector-description"], {
        [styles["description-is-disabled"]]: state === "inactive",
      })}
      size="sm"
    >
      {description}
    </Paragraph>
    {list && (
      <div className={styles["selector-list"]}>
        {list && (
          <DefaultList
            {...list}
            variant="iconColored"
            palette={palette}
            state={state}
          />
        )}
      </div>
    )}
  </div>
);

const SelectorSecondaryAction = ({
  secondaryAction,
  state,
}: Pick<SelectorImageProps, "secondaryAction" | "state">) => {
  if (!secondaryAction) {
    return null;
  }

  return (
    <div className={styles["selector-secondary-action"]}>
      <TextLink
        {...secondaryAction}
        inactive={state === "inactive"}
        as="button"
        size="sm"
      />
    </div>
  );
};
