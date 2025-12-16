import { Paragraph } from "foundations/Paragraph";
import React, { type MutableRefObject, type PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";
import { useStyles } from "react-native-unistyles";

import type { InputFieldProps, InputVariant } from "./Input.types";
import { InputContainerStyles } from "./InputContainer.styles";
import { InputHint } from "./InputHint";
import { InputLabel } from "./InputLabel";

type Props = Pick<
  InputFieldProps,
  "id" | "type" | "label" | "helperText" | "validated"
> & {
  testID?: string;
  variant: InputVariant;
  isHovered?: boolean;
  isFocused?: boolean;
  inputGroupRef?: MutableRefObject<View | null>;
  onPress?: () => void;
  suffix?: string;
  showHint?: boolean;
};

/**
 * Input container
 * This will make new input type design easy by encapsulating all the features
 * surrounding it
 *
 * @internal
 */
export const InputContainer: React.FC<PropsWithChildren<Props>> = ({
  id,
  label,
  variant,
  validated,
  helperText,
  isHovered,
  isFocused,
  children,
  testID,
  inputGroupRef,
  onPress,
  suffix,
  showHint,
}) => {
  const { styles } = useStyles(InputContainerStyles, {
    state: variant !== "default" ? variant : undefined,
  });

  return (
    <View style={styles.inputContainer}>
      {!!label && (
        <InputLabel
          id={id!}
          text={label.text}
          optional={label.optional}
          info={label?.info}
        />
      )}
      <View style={styles.inputGroupContainer}>
        <View
          testID={testID}
          ref={inputGroupRef}
          onPointerDown={onPress}
          style={StyleSheet.flatten([
            styles.inputGroup,
            !!isHovered && styles.hoverStyle(variant),
            !!isFocused && styles.activeStyle(variant),
          ])}
        >
          {children}
        </View>
        {suffix && <Paragraph size="sm">{suffix}</Paragraph>}
      </View>

      {showHint && (
        <InputHint
          isError={(validated && !validated.success) || false}
          text={validated?.success === false ? validated.message : helperText}
        />
      )}
    </View>
  );
};
