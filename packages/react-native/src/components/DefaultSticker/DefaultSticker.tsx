import { Background } from "_internals/Background";
import { Image } from "foundations/Image";
import { Strong } from "foundations/Strong";
import { useStyles } from "react-native-unistyles";

import { DefaultStickerStyles } from "./DefaultSticker.styles";
import type { DefaultStickerProps } from "./DefaultSticker.types";

export const DefaultSticker: React.FC<DefaultStickerProps> = ({
  type = "default",
  variant = "default",
  palette = "default",
  text,
  image,
  glow,
}) => {
  const { styles } = useStyles(DefaultStickerStyles);

  return (
    <Background
      variant={variant}
      backgroundStyle={styles.background(variant, palette)}
      glow={glow}
    >
      {type === "image" ? (
        <Image
          type="foreground"
          src={image?.src}
          alt={image?.alt}
          resizeMode={image?.resizeMode}
          imageStyle={image?.imageStyle}
        />
      ) : (
        <Strong size="xs" style={styles.stickerText(variant, palette)}>
          {text}
        </Strong>
      )}
    </Background>
  );
};
