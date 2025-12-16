import { useContainsComponent } from "_global-hooks";
import { GlowGradient } from "foundations/GlowGradient";
import { Image } from "foundations/Image";
import { View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { modalStyles } from "./Modal.styles";
import type { ModalCustomHeaderProps } from "./Modal.types";

const CustomHeader = ({
  variant,
  verticalPadding = true,
  glow = "Glow1",
  palette = "default",
  children,
  fixedWidth,
  ratio,
  testID = "modal-custom-header",
}: ModalCustomHeaderProps) => {
  const { styles } = useStyles(modalStyles, {
    ratio: fixedWidth ? ratio : undefined,
    fixedWidth,
  });

  const childContainsImage = useContainsComponent(children, Image);

  return (
    <View
      testID={testID}
      style={[
        styles.customHeader,
        styles.customHeaderHorizontalPadding,
        variant === "default" && styles.customHeaderBackground(palette),
        verticalPadding && styles.customHeaderVerticalPadding,
      ]}
    >
      {variant === "emphasised" && (
        <GlowGradient
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          renderAs="static"
          zIndex={0}
          type={glow}
        />
      )}
      <View
        style={[
          styles.customHeaderChild,
          fixedWidth && styles.dialogHeaderRatio,
        ]}
      >
        {childContainsImage ? (
          <Image
            {...children.props}
            ratio={ratio}
            imageStyle={styles.customHeaderChild}
            backgroundImageStyle={styles.customHeaderChild}
          />
        ) : (
          children
        )}
      </View>
    </View>
  );
};

CustomHeader.displayName = "Modal.CustomHeader";

export { CustomHeader };
