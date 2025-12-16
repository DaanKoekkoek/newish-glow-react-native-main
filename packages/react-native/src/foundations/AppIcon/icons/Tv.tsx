import { Path } from "react-native-svg";

import type { AppIconProps } from "../AppIcon.types";
import { GlowAppIcon } from "./GlowAppIcon";

export const Tv: React.FC<AppIconProps> = ({
  disabled,
  size,
}: AppIconProps) => {
  return (
    <GlowAppIcon disabled={disabled} size={size}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.5023 43.9287H12.4979C11.2712 43.9287 10.2756 42.9331 10.2756 41.7064V16.4442C10.2756 15.2176 11.2712 14.222 12.4979 14.222H51.5023C52.729 14.222 53.7245 15.2176 53.7245 16.4442V41.7064C53.7245 42.9331 52.729 43.9287 51.5023 43.9287ZM12.4979 41.7064H51.5023V16.4442H12.4979V41.7064ZM44.5156 47.5909H19.4845V49.8131H44.5156V47.5909ZM28.7645 23.182V34.9598L38.1868 29.0753L28.7645 23.182Z"
      />
    </GlowAppIcon>
  );
};
