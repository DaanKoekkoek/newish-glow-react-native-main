import { glyphmap } from "@odido-portals/glow-icon/fonts";
import styles from "./Icon.module.scss";
import type { IconProps } from "./Icon.types";
import { GlowIcon } from ".";
import { tokenClassNames } from "_utility";

export const Icon = ({
  name,
  size = "default",
  className,
  maskClassName,
  testID = "icon",
  solid = false,
  palette,
  style,
}: IconProps) => {
  const icon = glyphmap[name as keyof typeof glyphmap];
  if (!icon) {
    console.warn(`Font icon "${String(name)}" not found in glyphmap`);
    return null;
  }

  if (palette) {
    return (
      <GlowIcon
        palette={palette}
        solid={solid}
        name={name}
        size={size}
        zIndex={1}
        maskClassName={maskClassName}
      />
    );
  }

  return (
    <span
      className={tokenClassNames(
        styles,
        "icon",
        styles[`icon-size-${size}`],
        {
          [styles.solid]: solid,
          [styles.outline]: !solid,
        },
        className,
      )}
      data-testid={testID}
      aria-hidden
      style={style}
      data-icon={name}
    >
      {String.fromCodePoint(icon)}
    </span>
  );
};
