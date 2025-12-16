import styles from "components/Modal/ModalCustomHeader.module.scss";

import type { ModalCustomHeaderProps } from "./Modal.types";
import { useContainsComponent } from "_global-hooks";
import { Visual } from "_internals/Assets";
import { Image } from "foundations/Image/Image.tsx";
import { tokenClassNames } from "_utility";

export const ModalCustomHeader = ({
  variant,
  verticalPadding = true,
  palette = "default",
  children,
  fixedWidth,
  ratio,
  testID = "modal-custom-header",
}: ModalCustomHeaderProps) => {
  const childContainsImage = useContainsComponent(children, Image);
  return (
    <Visual
      className={tokenClassNames(styles, "custom-header", {
        [styles[`background-${palette}`]]: variant === "default",
      })}
      noPadding={!verticalPadding ? "vertical" : undefined}
      testID={testID}
      type={childContainsImage ? "image" : "content"}
      palette={palette}
      background={variant}
      fill={[...(fixedWidth ? ["width"] : []), "height"]}
      ratio={ratio}
      renderType="background"
      gradient={{
        zoom: "vertical",
      }}
      {...children.props}
    >
      {children}
    </Visual>
  );
};
