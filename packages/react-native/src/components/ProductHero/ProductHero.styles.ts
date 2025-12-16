import { createStyleSheet } from "react-native-unistyles";

const version = "v2";

export const ProductHeroStyles = createStyleSheet(
  ({
    themes: {
      components: {
        hero: {
          productHero: { [version]: productHero },
        },
      },
    },
  }) => ({
    gap: {
      gap: productHero.gap.default,
    },
    container: {
      maxWidth: productHero.size.maxWidth.default,
      minWidth: productHero.size.minWidth.default,
      backgroundColor: productHero.color.background.default,
      marginHorizontal: productHero.margin.horizontal,
    },
    status: {
      minWidth: productHero.size.minWidth.status,
    },
    alignCenter: {
      alignItems: "center",
    },
    image: {
      borderRadius: productHero.radius.default,
      overflow: "hidden",
      // TODO: add ratio token, for now Image is expecting 1/1 format token format has 1:1
    },
    wrapperPromo: {
      maxWidth: productHero.size.maxWidth.wrapper,
      width: "100%",
      paddingRight: productHero.padding.content.default.right,
      paddingBottom: productHero.padding.content.default.bottom,
      position: "absolute",
      bottom: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    promoPadding: {
      paddingRight: productHero.padding.content.promo.horizontal,
      paddingBottom: productHero.padding.content.promo.vertical,
    },
    wrapperDefault: {
      right: productHero.padding.content.promo.horizontal,
      left: productHero.padding.content.promo.horizontal,
      position: "absolute",
      top: 0,
      display: "flex",
      flexDirection: "column",
    },
    spacer: {
      maxWidth: productHero.size.maxWidth.default,
      minWidth: productHero.size.minWidth.default,
      aspectRatio: "2/1",
    },
    largeStickerContainer: {
      alignSelf: "auto",
      flexGrow: 1,
      maxWidth: productHero.size.maxWidth.wrapper,
    },
  }),
);
