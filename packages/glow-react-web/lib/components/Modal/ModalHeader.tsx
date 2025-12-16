import { ModalProps } from "./Modal.types.ts";
import { Heading } from "foundations/Heading";
import { Image } from "foundations/Image/Image.tsx";

interface ModalHeaderProps
  extends Pick<
    ModalProps,
    | "title"
    | "titleTag"
    | "customHeader"
    | "image"
    | "titleSize"
    | "headerRatio"
  > {}

import ratios from "foundations/Image/styles/ratio.module.scss";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { useGenerateClassNames } from "_global-hooks";

export const ModalHeader = ({
  title,
  titleSize = "lg",
  titleTag = "h3",
  customHeader,
  image,
  headerRatio = "3/1",
}: ModalHeaderProps) => {
  const headerRatioClass = useGenerateClassNames(ratios, headerRatio, "ratio");

  return (
    <header>
      {(!!customHeader || !!image) && (
        <div
          className={classNames(styles["header-background"], headerRatioClass)}
        >
          {customHeader ??
            (!!image && (
              <Image
                resizeMode="cover"
                {...image}
                loading={{ type: "eager" }}
              />
            ))}
        </div>
      )}
      <Heading
        size={titleSize}
        as={titleTag}
        className={classNames(styles.header, {
          [styles["header-right-offset"]]: !image,
        })}
      >
        {title}
      </Heading>
    </header>
  );
};
