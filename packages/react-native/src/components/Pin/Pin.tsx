import { ensureExhaustive, mergeTestIds } from "_utility";
import React, { useEffect, useRef, useState } from "react";
import type {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputFocusEventData,
  TextInputChangeEventData,
} from "react-native";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type {
  PinCodeSequence,
  PinHelperMessageState,
  PinProps,
} from "./Pin.types";
import { PinHelperMessage } from "./PinHelperMessage";
import { NumberField } from "../NumberField/NumberField";

const EMPTY_SLOT = "";
const BACKSPACE_KEY = "Backspace";

const fillPinCode = (length: number, code: string[]) => {
  return Array.from({ length }, (_, i) => code[i] || EMPTY_SLOT);
};

export const Pin = ({
  length,
  onCompleted,
  loadingMessage,
  successMessage,
  errorMessage,
  state = "default",
  masked = false,
  code = [],
  testID,
}: PinProps) => {
  const [activeInput, setActiveInput] = useState(
    code.length ? code.length - 1 : 0,
  );

  const [pinCode, setPinCode] = useState<PinCodeSequence>(
    fillPinCode(length, code),
  );

  const focused = useRef(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (focused.current) {
      inputRef.current?.focus();
    }
  }, [activeInput]);

  const { styles } = useStyles(stylesheet);

  const pinTestID = mergeTestIds(testID, "pincode");
  const isDisabled = state === "disabled" || state === "loading";

  const fireOnComplete = (pinCode: PinCodeSequence) => {
    const fullfilled = pinCode.every((slot) => slot !== EMPTY_SLOT);

    if (fullfilled) {
      onCompleted?.(pinCode);
    }
  };

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (e.nativeEvent.inputType === "insertFromPaste") {
      const pastedText = e.nativeEvent.text.split("");

      const pin = fillPinCode(length, pastedText);

      setPinCode(pin);
      fireOnComplete(pin);
      setActiveInput(pastedText.length);
    }
  };

  const handleFocus = (
    _e: NativeSyntheticEvent<TextInputFocusEventData>,
    inputIndex: number,
  ) => {
    focused.current = true;
    setActiveInput(inputIndex);
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    inputIndex: number,
  ) => {
    const keyboardKey = e.nativeEvent.key.trim();

    if (keyboardKey === BACKSPACE_KEY) {
      setActiveInput((prev) => Math.max(prev - 1, 0));

      setPinCode((pin) => {
        const temp = [...pin];
        temp[inputIndex] = EMPTY_SLOT;
        return temp;
      });

      return;
    }

    setActiveInput((prev) => Math.min(prev + 1, length - 1));

    setPinCode((pin) => {
      const temp = [...pin];
      temp[inputIndex] = keyboardKey;
      fireOnComplete(temp);
      return temp;
    });
  };

  const getHelperMessageByState = (pinState: PinHelperMessageState) => {
    switch (pinState) {
      case "loading":
        return loadingMessage;
      case "success":
        return successMessage;
      case "error":
        return errorMessage;
      default:
        ensureExhaustive(pinState);
    }
  };

  return (
    <View testID={pinTestID} style={styles.wrapper}>
      <View style={styles.inputsContainer}>
        {Array.from({ length }).map((_, inputIndex) => {
          return (
            <NumberField
              min={0}
              max={9}
              masked={masked}
              onChange={handleChange}
              value={pinCode[inputIndex]}
              key={`pincode-${inputIndex}`}
              selectTextOnFocus={!isDisabled}
              testID={`pincode-${inputIndex}`}
              state={state === "loading" ? "disabled" : state}
              ref={inputIndex === activeInput ? inputRef : null}
              onFocus={(e) => handleFocus(e, inputIndex)}
              onKeyPress={(e) => handleKeyPress(e, inputIndex)}
            />
          );
        })}
      </View>
      {["error", "success", "loading"].includes(state) && (
        <PinHelperMessage
          state={state as PinHelperMessageState}
          helperMessage={
            getHelperMessageByState(state as PinHelperMessageState) ?? ""
          }
        />
      )}
    </View>
  );
};

const stylesheet = createStyleSheet(
  ({
    themes: {
      components: { input },
    },
  }) => ({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: input.gap.vertical.default,
    },
    inputsContainer: {
      minWidth: 300,
      width: "100%",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: input.gap.horizontal.sm,
    },
  }),
);
