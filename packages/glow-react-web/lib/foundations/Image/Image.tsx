import type { ImageProps } from "./Image.types";
import classNames from "classnames";
import ratios from "./styles/ratio.module.scss";
import { positionToClassName } from "foundations/Image/utils.ts";
import styles from "./styles/Image.module.scss";
import { breakpoints } from "_theming/breakpoints";
import { ImageBackground } from "./ImageBackground";
import { useGenerateClassNames } from "_global-hooks";

export const Image = ({
  alt = "",
  renderType = "background",
  position = "center",
  resizeMode = "contain",
  ratio = "16/9",
  testID = "image",
  loading = { type: "lazy" },
  localSrc,
  src,
  children,
  className,
  pictureClassName,
  sources,
}: ImageProps) => {
  const ratioClass = useGenerateClassNames(ratios, ratio, "ratio");

  if (!src && !sources && !localSrc) return null;

  const url = localSrc || src;

  if (renderType === "background") {
    const config = {
      src: url,
      alt,
      resizeMode,
      position,
      ratio,
      className,
      pictureClassName,
      testID,
    };

    return (
      <ImageBackground {...config} ratioClass={ratioClass}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <>
      <picture
        className={classNames(styles.picture, pictureClassName)}
        data-testid={`${testID}-picture`}
      >
        {!!sources &&
          sources.map(({ src, breakpoint }, index) => {
            const isLast = index === sources.length - 1;

            const mediaQuery = (() => {
              if (isLast) return undefined;
              if (typeof breakpoint === "string")
                return `(max-width: ${breakpoints[breakpoint]}px)`;
              if (typeof breakpoint === "number")
                return `(max-width: ${breakpoint}px)`;
              return undefined;
            })();

            return (
              <source
                key={index}
                data-testid={`${testID}-source`}
                srcSet={src}
                media={mediaQuery}
              />
            );
          })}
        <img
          src={url}
          alt={alt}
          style={{ objectFit: resizeMode }}
          className={classNames(
            styles.image,
            styles[positionToClassName(position)],
            ratioClass,
          )}
          data-testid={`${testID}-img`}
          loading={loading.type}
        />
      </picture>
      {children}
    </>
  );
};
