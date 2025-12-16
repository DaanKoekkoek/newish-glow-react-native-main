import type { BrandName } from "components/ThemeProvider";
import styles from "./Logos.module.scss";
import type { LogosProps, Logo } from "./Logos.types";
import { Odido } from "./assets/Odido.tsx";
import { Ben } from "./assets/Ben.tsx";
import { Simpel } from "./assets/Simpel.tsx";
import { useGenerateClassNames } from "_global-hooks";
import { tokenClassNames } from "_utility";

const logos: Record<BrandName, Logo> = {
  odido: Odido,
  ben: Ben,
  simpel: Simpel,
  "sim-wallet": Odido,
};

export const Logos = ({
  brand = "odido",
  variant = "default",
  size = "default",
  testID = "logos",
  className,
}: LogosProps) => {
  const LogoComponent = logos[brand];

  const sizeClass = useGenerateClassNames(styles, size, "logo-size");

  return (
    <LogoComponent
      data-testid={testID}
      aria-label={brand}
      className={tokenClassNames(
        styles,
        "logos",
        sizeClass,
        {
          [styles["is-inverted"]]: variant === "inverted",
        },
        className,
      )}
    />
  );
};
