import styles from "./AddonList.module.scss";
import type { AddonListHeaderProps, AddonListProps } from "./AddonList.types";
import { Visual } from "_internals/Assets";
import { Heading } from "foundations/Heading";
import { AddonListItem } from "./AddonListItem/AddonListItem";
import classNames from "classnames";
import { tokenClassNames } from "_utility";

const AddonListHeader = ({
  headerImage,
  headerText,
  palette,
}: AddonListHeaderProps) => {
  if (!headerImage && !headerText) return null;

  const {
    alt = "headerImage",
    ratio = "3/1",
    resizeMode = "cover",
    ...other
  } = headerImage || {};

  return (
    <div className={styles.header}>
      {headerImage ? (
        <div className={styles["image-container"]}>
          <Visual
            {...other}
            ratio={ratio}
            resizeMode={resizeMode}
            noPadding="all"
            renderType="background"
            alt={alt}
          />
        </div>
      ) : (
        <Visual
          className={styles["gradient-class"]}
          background="emphasised"
          alt={alt}
          noPadding="all"
          palette={palette}
        />
      )}
      <Heading
        as="h3"
        className={classNames(styles["heading-text"], {
          [styles["has-image"]]: headerImage,
          [styles["has-palette"]]: !headerImage,
        })}
      >
        {headerText}
      </Heading>
    </div>
  );
};

export const AddonList = ({
  headerImage,
  headerText,
  items,
  onListItemClick,
  palette = "default",
}: AddonListProps) => {
  if (items.length === 0) return null;

  return (
    <div className={tokenClassNames(styles, "addon-list")}>
      <AddonListHeader
        headerImage={headerImage}
        headerText={headerText}
        palette={palette}
      />
      <ul
        className={classNames(styles.list, {
          [styles["top-radius"]]: !!headerImage || !!headerText,
        })}
      >
        {items.map((item, index) => {
          return (
            <AddonListItem
              {...item}
              key={`${item.title}-${index}`}
              onClick={() => onListItemClick(index)}
            />
          );
        })}
      </ul>
    </div>
  );
};
