import styles from "./Pin.module.scss";
import classNames from "classnames";

import { OTPInputContext } from "input-otp";
import { ComponentProps, useContext } from "react";
import { PinContext } from "./PinContext.ts";

type PinSlotProps = ComponentProps<"div"> & { index: number };

export function PinSlot({ index, ...props }: PinSlotProps) {
  const otpInputContext = useContext(OTPInputContext);
  const pinContext = useContext(PinContext);

  const { char, hasFakeCaret, isActive, placeholderChar } =
    otpInputContext?.slots[index] ?? {};
  const { masked, state } = pinContext ?? {};

  return (
    <div
      className={classNames(styles["slot-wrapper"], {
        [styles["slot-wrapper--active"]]: state !== "loading" && isActive,
        [styles["slot-wrapper--disabled"]]: state === "disabled",
        [styles["slot-wrapper--error"]]: state === "error",
        [styles["slot-wrapper--loading"]]: state === "loading",
        [styles["slot-wrapper--success"]]: state === "success",
      })}
      {...props}
    >
      <div className={styles["slot-char"]}>
        {masked && char ? "●" : (char ?? placeholderChar)}
      </div>
      {hasFakeCaret ? <FakeCaret /> : null}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className={styles["fake-caret-wrapper"]}>
      <div className={styles["fake-caret"]} />
    </div>
  );
}
