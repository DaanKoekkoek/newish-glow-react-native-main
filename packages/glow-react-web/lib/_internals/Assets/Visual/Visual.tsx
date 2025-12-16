import classNames from "classnames";
import styles from "./Visual.module.scss";
import { GlowGradient } from "foundations/GlowGradient";
import { Image } from "foundations/Image";
import type { VisualProps } from "./Visual.types";
import ratios from "foundations/Image/styles/ratio.module.scss";
import { useGenerateClassNames } from "_global-hooks";
import { fillToCssClass } from "./utils";
import { tokenClassNames } from "_utility";

export const Visual = ({
  as: Tag = "div",
  children,
  fill,
  background = "none",
  visualRatio = "default",
  testID = "visual",
  type = "illustration",
  palette,
  noPadding = "none",
  pictureClassName,
  className,
  ratio = "16/9",
  alt,
  src,
  localSrc,
  position = "center",
  sources,
  loading,
  resizeMode,
  renderType = "foreground",
  gradient,
}: VisualProps) => {
  const fillClassNames = fillToCssClass(fill);
  const ratioClass = useGenerateClassNames(ratios, ratio, "ratio");
  const noPaddingClass = useGenerateClassNames(styles, noPadding, "no-padding");

  return (
    <Tag
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "visual",
        styles[`visual-ratio-${visualRatio}`],
        {
          [styles[`palette-${palette}`]]: background === "default",
        },
        fillClassNames,
        noPaddingClass,
        className,
      )}
    >
      {type === "content" ? (
        <Tag
          className={classNames(styles.children, fillClassNames, ratioClass)}
        >
          {children}
        </Tag>
      ) : (
        <Image
          src={src}
          localSrc={localSrc}
          sources={sources}
          loading={loading}
          resizeMode={resizeMode}
          position={position}
          alt={alt ?? ""}
          ratio={ratio}
          renderType={renderType}
          pictureClassName={pictureClassName}
        >
          {children}
        </Image>
      )}
      {palette &&
        background === "emphasised" &&
        (!!children || type === "illustration") && (
          <GlowGradient
            palette={palette}
            className={classNames(styles.glow)}
            zIndex={1}
            {...gradient}
          />
        )}
    </Tag>
  );
};
