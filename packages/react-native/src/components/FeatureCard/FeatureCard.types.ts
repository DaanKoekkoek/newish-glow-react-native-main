import type { OdidoPalette } from "_theming/tokenLoader";
import type { GlowGradientTypes } from "foundations/GlowGradient";
import type { ImageProps } from "foundations/Image";
import type { GestureResponderEvent, ImageStyle } from "react-native";

/**
 * Represents the content type of the Feature Card.
 * @type {"visual" | "backgroundImage" | "text"}
 */
export type FeatureCardContentType = "visual" | "backgroundImage" | "text";

/**
 * Represents the variant of the Feature Card.
 * @type {"default" | "compact"}
 */
export type FeatureCardVariant = "default" | "compact";

/**
 * Represents the color style of the Feature Card.
 * @type {"default" | "alternate"}
 */
export type FeatureCardStyle = "default" | "alternate";

/**
 * Props interface for the FeatureCard component.
 * @interface FeatureCardProps
 * @property {string} title - The title of the feature card.
 * @property {Function(): void} - Callback function to be executed when the feature card is pressed.
 * @property {FeatureCardContentType} [type="visual"] - The cardType of the feature card.
 * @property {FeatureCardVariant} [variant="default"] - The variant of the feature card.
 * @property {FeatureCardColor} [overlay="default"] - The overlay style of the feature card.
 * @property {string} [description] - The description of the feature card.
 * @property {ImageProps} [image] - The URL of an image for the feature card.
 * @property {Palette} [palette] - Palette color for the feature card.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface FeatureCardProps {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  type?: FeatureCardContentType;
  variant?: FeatureCardVariant;
  gradient?: GlowGradientTypes;
  style?: FeatureCardStyle;
  description?: string;
  image?: ImageProps;
  // Theme dependant properties
  palette?: OdidoPalette;
  testID?: string | undefined;
}

export interface FeatureCardContainerProps extends FeatureCardProps {
  visualAnimation: ImageStyle;
  isHovered: boolean;
}
