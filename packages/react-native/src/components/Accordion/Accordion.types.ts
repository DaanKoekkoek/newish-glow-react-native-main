import type { SwitchPalette } from "_theming/tokenLoader";

export interface AccordionProps {
  children: React.ReactNode;
  inverted?: boolean;
  testID?: string | undefined;
  palette?: SwitchPalette;
}

export interface AccordionStepProps {
  title: string;
  children: string | React.ReactElement;
  inverted?: boolean;
  index?: number;
  active?: boolean;
  activeHandler?: (id: number) => void;
  onPress?: () => void;
  testID?: string | undefined;
  palette?: SwitchPalette;
}
