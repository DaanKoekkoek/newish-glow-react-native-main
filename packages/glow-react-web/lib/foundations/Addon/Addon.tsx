import styles from "./Addon.module.scss";
import type { AddonProps } from "./Addon.types";
import { addons, addonXsSm } from "./Addon.config";
import { useGenerateClassNames } from "_global-hooks";
import { tokenClassNames } from "_utility";

export const Addon = ({
  name,
  size = "default",
  state = "default",
  testID = "addon",
}: AddonProps) => {
  const sizeClass = useGenerateClassNames(styles, size, "addon-size");
  const AddonComponent = size === "default" ? addons[name] : addonXsSm[name];

  return (
    <AddonComponent
      aria-label={name}
      data-testid={testID}
      className={tokenClassNames(styles, "addons", sizeClass, {
        [styles["is-inactive"]]: state === "inactive",
      })}
    />
  );
};
