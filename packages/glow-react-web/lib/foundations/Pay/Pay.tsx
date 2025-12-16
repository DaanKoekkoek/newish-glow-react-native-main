import styles from "./Pay.module.scss";
import { PayServiceProps, PayServices, PayProps } from "./Pay.types";
import { Ideal } from "./assets/Ideal.tsx";
import { Idin } from "./assets/Idin.tsx";
import { tokenClassNames } from "_utility";

const services: Record<PayServices, PayServiceProps> = {
  iDEAL: Ideal,
  iDIN: Idin,
};

export const Pay = ({ service, ariaLabel, testID = "pay" }: PayProps) => {
  const ServiceComponent = services[service];
  const accessibilityLabel = ariaLabel ?? service;

  return (
    <ServiceComponent
      aria-label={accessibilityLabel}
      data-testid={testID}
      className={tokenClassNames(styles, "pay")}
    />
  );
};
