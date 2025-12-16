import React, { useMemo } from "react";
import classNames from "classnames";
import { SelectorLightProps } from "./SelectorLight.types";
import { SelectorContainer } from "_internals/Form/SelectorContainer";
import styles from "./SelectorLight.module.scss";
import { Icon } from "foundations/Icon";
import { Visual } from "_internals/Assets";
import { Highlight } from "_internals/Highlight";
import { BaseText } from "_internals/Typography";
import { useGenerateClassNames } from "_global-hooks";
import { formatStringWithTag, tokenClassNames } from "_utility";

export const SelectorLight = ({
  checked,
  name,
  image,
  icon,
  id,
  state,
  title,
  direction = "horizontal",
  highlight,
  onChange,
  type = "radio",
  palette = "default",
  testID = "selector-light",
  ...inputProps
}: SelectorLightProps) => {
  const directionClass = useGenerateClassNames(
    styles,
    direction,
    "is-direction",
  );

  const handleSelectChange = (id: string, checked?: boolean) => {
    if (state === "inactive") return;
    onChange?.(id, checked);
  };

  const formattedTitle = useMemo(() => {
    if (typeof title === "string") {
      return formatStringWithTag(title, {
        className: styles["selector-highlighted-text"],
      });
    }

    return title;
  }, [title]);

  return (
    <SelectorContainer
      state={state}
      checked={checked}
      highlight={
        highlight ? (
          <Highlight className={styles["selector-light-highlight"]}>
            {highlight}
          </Highlight>
        ) : null
      }
      contentClassName={styles["selector-light-content"]}
      type={type}
      name={name}
      palette={palette}
      className={tokenClassNames(
        styles,
        "selector-light",
        {
          [styles["is-checkbox"]]: type === "checkbox",
        },
        directionClass,
      )}
      id={id}
      onChange={(id, checked) => handleSelectChange(id, checked)}
      testID={testID}
      {...inputProps}
    >
      <>
        {image ? (
          <Visual
            ratio="4/3"
            {...image}
            pictureClassName={styles["selector-light-visual"]}
            noPadding="all"
            resizeMode="cover"
          />
        ) : icon ? (
          <Icon
            {...icon}
            size="xxl"
            palette={state !== "inactive" ? palette : undefined}
            className={styles["selector-light-icon"]}
            maskClassName={classNames(
              styles["selector-light-mask"],
              styles[palette],
            )}
            solid={state !== "inactive" ? true : undefined}
          />
        ) : null}
        {!!title &&
          (React.isValidElement(title) ? (
            title
          ) : (
            <BaseText
              className={classNames(
                styles["selector-light-title"],
                styles[`selector-light-title-palette-${palette}`],
                {
                  [styles["is-inactive"]]: state === "inactive",
                },
              )}
            >
              {formattedTitle}
            </BaseText>
          ))}
      </>
    </SelectorContainer>
  );
};
