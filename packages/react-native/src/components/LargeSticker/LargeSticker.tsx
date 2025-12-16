import { odidoPalettes } from "@odido-portals/glow-tokens/odido/light/unistyles";
import { Background } from "_internals/Background";
import type {
  DefaultListItemProps,
  DefaultListProps,
} from "components/DefaultList";
import { DefaultList } from "components/DefaultList";
import { Price, type PriceProps } from "components/Price";
import { useThemeProviderContext } from "components/ThemeProvider";
import { Heading } from "foundations/Heading";
import React from "react";
import { useStyles } from "react-native-unistyles";

import { LargeStickerStyles } from "./LargeSticker.styles";
import type { LargeStickerProps } from "./LargeSticker.types";

export const LargeSticker = ({
  palette = "default",
  variant = "default",
  glow,
  price,
  list,
  ...props
}: LargeStickerProps) => {
  const type = props.type ?? "default";
  const backgroundVariant = variant === "default" ? "subtle" : variant;
  const { theme } = useThemeProviderContext();

  const defaultListInverted =
    odidoPalettes.components.sticker.defaultList[palette].inverted[theme] &&
    backgroundVariant === "subtle";

  const priceInverted =
    odidoPalettes.components.sticker.price[palette].inverted[theme] &&
    backgroundVariant === "subtle";

  const { styles } = useStyles(LargeStickerStyles);

  let containerStyle;
  let description;

  if (props.type === "default") {
    description = props.description;
  }

  if (props.type === "usp") {
    containerStyle = props.containerStyle;
  }

  return (
    <Background
      variant={variant}
      backgroundStyle={[styles.background(variant, palette), containerStyle]}
      glow={glow}
      brightness={theme}
    >
      <>
        {description && (
          <Heading style={styles.stickerText(variant, palette)} size="xs">
            {description}
          </Heading>
        )}
        {type === "default" && price && (
          <Price {...price.props} inverted={priceInverted} size="lg" />
        )}
        {type === "usp" && list && (
          <DefaultList
            {...list.props}
            variant="icon"
            color={defaultListInverted ? "inverted" : "default"}
            palette={palette}
          />
        )}
      </>
    </Background>
  );
};

const StickerPrice = (_props: PriceProps) => null;
StickerPrice.displayName = "LargeSticker.Price";
LargeSticker.Price = StickerPrice;

const StickerList = (_props: DefaultListProps) => null;
StickerPrice.displayName = "LargeSticker.List";
LargeSticker.List = StickerList;

const StickerItem = (_props: DefaultListItemProps) => null;
StickerPrice.displayName = "LargeSticker.ListItem";
LargeSticker.ListItem = StickerItem;
