import styles from "./PhoneBrand.module.scss";
import type {
  PhoneBrandNameProps,
  PhoneBrandName,
  PhoneBrandProps,
} from "./PhoneBrand.types";

import { Alcatel } from "./assets/Alcatel.tsx";
import { Android } from "./assets/Android.tsx";
import { Apple } from "./assets/Apple.tsx";
import { Emporia } from "./assets/Emporia.tsx";
import { Fairphone } from "./assets/Fairphone.tsx";
import { Google } from "./assets/Google.tsx";
import { Motorola } from "./assets/Motorola.tsx";
import { Oppo } from "./assets/Oppo.tsx";
import { Samsung } from "./assets/Samsung.tsx";
import { Xiaomi } from "./assets/Xiaomi.tsx";
import { tokenClassNames } from "_utility";

const allPhoneBrands: Record<PhoneBrandName, PhoneBrandNameProps> = {
  Alcatel: Alcatel,
  Android: Android,
  Apple: Apple,
  Emporia: Emporia,
  Fairphone: Fairphone,
  Google: Google,
  Motorola: Motorola,
  Oppo: Oppo,
  Samsung: Samsung,
  Xiaomi: Xiaomi,
};

export const PhoneBrand = ({
  brand,
  state = "default",
  variant = "default",
  ariaLabel,
  testID = "phone-brand",
  className,
}: PhoneBrandProps) => {
  const PhoneBrandComponent = allPhoneBrands[brand];

  const accessibilityLabel = ariaLabel ?? brand;

  return (
    <PhoneBrandComponent
      className={tokenClassNames(styles, "phone-brand", {
        [styles["is-inverted"]]: variant === "inverted" && state !== "inactive",
        [styles[`phone-brand-${state}`]]: state && state !== "default",
        className,
      })}
      data-testid={testID}
      role="img"
      aria-label={accessibilityLabel}
    />
  );
};
