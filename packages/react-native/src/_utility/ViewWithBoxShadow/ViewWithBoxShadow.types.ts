import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type {
  BaseAnimationBuilder,
  LayoutAnimationFunction,
  AnimatedStyle,
} from "react-native-reanimated";

export type ShadowStylePresets =
  | "default"
  | "right"
  | "center"
  | "left"
  | "top"
  | "bottom";

export type ShadowStyle = {
  color: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  opacity?: number;
};

export interface BoxShadowProps {
  children?: ReactNode;
  shadowStylePreset?: ShadowStylePresets;
  testID?: string;
}

/**
 * This component is used to create an animated view with box shadow.
 * It uses `react-native-reanimated` to animate the view and `react-native-fast-shadow` to add shadow to the view.
 * It resolves the issue of box shadow not being compatible with web, ios and android.
 * @typedef {Object} BoxShadowProps
 * @property {React.ReactElement} [children] - The children to be wrapped around the animated view with box shadow.
 * @property {ShadowStylePresets} [shadowStylePreset] - The box shadow style properties defined via one of the common used presets.
 * @property {LayoutAnimationFunction | BaseAnimationBuilder} [layout] - The layout animation function or base animation builder to be used for the component.
 * @property {AnimatedStyle<StyleProp<ViewStyle>>} [style] - The style for the component, which can also contain animated styles.
 * @property {String} [testID] - The testID for the component.
 */

export type AnimatedViewWithBoxShadowProps = BoxShadowProps & {
  layout?:
    | typeof BaseAnimationBuilder
    | BaseAnimationBuilder
    | LayoutAnimationFunction;
  style?: AnimatedStyle<StyleProp<ViewStyle>>;
};

/**
 * This component is used to create a view with box shadow.
 * It uses `react-native-fast-shadow` to add shadow to the view.
 * It resolves the issue of box shadow not being compatible with web, ios and android.
 * @typedef {Object} BoxShadowProps
 * @property {React.ReactElement} [children] - The children to be wrapped around the animated view with box shadow.
 * @property {ShadowStylePresets} [shadowStylePreset] - The box shadow style properties defined via one of the common used presets.
 * @property {StyleProp<ViewStyle>} [style] - The style for the component.
 * @property {String} [testID] - The testID for the component.
 */

export type ViewWithBoxShadowProps = BoxShadowProps & {
  style?: StyleProp<ViewStyle>;
};
